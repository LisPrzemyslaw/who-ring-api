import os

import redis.asyncio as redis
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from who_ring_api.database.database import Phone, get_db
from who_ring_api.dependencies.dependencies import create_verification_code
from who_ring_api.models.models import PhoneModel, PhoneNumber, PhoneVerification
from who_ring_api.sms_provider.sms_provider_factory import SmsProviderFactory

router = APIRouter(prefix="/api", tags=["api"])

redis_client = redis.Redis(host=os.getenv("REDIS_HOST"), port=int(os.getenv("REDIS_PORT")), decode_responses=True)
CODE_EXPIRATION_SECONDS = 300  # 5 minutes


@router.post("/send-code", response_model=PhoneNumber, status_code=status.HTTP_200_OK)
async def send_code(phone_number: PhoneNumber, db_session: Session = Depends(get_db)) -> PhoneNumber:
    """
    Send a verification code via SMS to a specified phone number. The code is randomly generated and sent using a SMS provider.
    If the phone number already exists in the database, a conflict error is raised. Otherwise, the code is saved in the redis cache.

    :param phone_number: pydentic model containing the phone number and name.
    :param db_session: A database session used to query and interact with the database.

    :return: The phone model containing the phone number and name.
    """
    if db_session.query(Phone).filter(Phone.phone_number == phone_number.phone_number).first():
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Phone number already exists.")

    sms_provider = SmsProviderFactory.create_sms_provider(SmsProviderFactory.DEFAULT_PROVIDER_NAME)
    verification_code = create_verification_code()
    await redis_client.setex(phone_number.phone_number, CODE_EXPIRATION_SECONDS, verification_code)

    succeed = sms_provider.send_sms(phone_number.phone_number, verification_code)
    if not succeed:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to send SMS")
    return phone_number


@router.post("/register-number", response_model=PhoneModel, status_code=status.HTTP_201_CREATED)
async def register_number(request_data: PhoneVerification, db_session: Session = Depends(get_db)) -> PhoneModel:
    """
    This endpoint registers a phone number and its associated name in the database.

    :param request_data: pydentic model containing the phone number and name.
    :param db_session: A database session used to query and interact with the database.

    :return: The registered phone model in a pydentic model.
    """
    if db_session.query(Phone).filter(Phone.phone_number == request_data.phone_number).first():
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Phone number already exists.")
    stored_code = await redis_client.get(request_data.phone_number)
    if not stored_code:
        raise HTTPException(status_code=400, detail="Code expired or not found.")
    if int(stored_code) != request_data.verification_code:
        raise HTTPException(status_code=400, detail=f"Invalid verification code.")

    await redis_client.delete(request_data.phone_number)

    phone = Phone(phone_number=request_data.phone_number, name=request_data.name)
    db_session.add(phone)
    db_session.commit()
    return PhoneModel(phone_number=str(phone.phone_number), name=str(phone.name))


@router.get("/get-number-name", response_model=PhoneModel, status_code=status.HTTP_200_OK)
async def get_number_name(phone_number: str, db_session: Session = Depends(get_db)) -> PhoneModel:
    """
    This endpoint retrieves the name associated with a given phone number from the database.

    :param phone_number: The phone number to look up. With a country code.
    :param db_session: A database session is used to query and interact with the database.

    :return: The pydentic model containing the phone number and associated name.
    """
    if not phone_number:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Phone number is required")
    try:
        PhoneNumber(phone_number=phone_number)  # Validate the phone number format
    except ValueError:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid phone number format")

    phone = db_session.query(Phone).filter(Phone.phone_number == phone_number).first()
    if not phone:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Phone number not found")
    return PhoneModel(phone_number=str(phone.phone_number), name=str(phone.name))

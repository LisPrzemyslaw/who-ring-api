import random

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from who_ring_api.database.database import Phone, get_db
from who_ring_api.models.models import PhoneModel
from who_ring_api.sms_provider.sms_provider_factory import SmsProviderFactory

router = APIRouter(prefix="/api", tags=["api"])


@router.post("/api/send-code")
async def send_code(phone_model: PhoneModel, db_session: Session = Depends(get_db)) -> None:
    """
    Send a verification code via SMS to a specified phone number. The code is randomly generated and sent using a SMS provider.
    If the phone number already exists in the database, a conflict error is raised. Otherwise, the code is saved in the redis cache.

    :param phone_model: pydentic model containing the phone number and name.
    :param db_session: A database session used to query and interact with the database.
    """
    if db_session.query(Phone).filter(Phone.phone_number == phone_model.phone_number).first():
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Phone number already exists.")

    sms_provider = SmsProviderFactory.create_sms_provider(SmsProviderFactory.DEFAULT_PROVIDER_NAME)
    verification_code = random.randint(100000, 999999)
    succeed = sms_provider.send_sms(phone_model.phone_number, verification_code)
    if not succeed:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to send SMS")
    # TODO add redis and so one


@router.post("/api/register-number", response_model=PhoneModel, status_code=status.HTTP_201_CREATED)
async def register_number(phone_model: PhoneModel, db_session: Session = Depends(get_db)) -> PhoneModel:
    """
    This endpoint registers a phone number and its associated name in the database.

    :param phone_model: pydentic model containing the phone number and name.
    :param db_session: A database session used to query and interact with the database.

    :return: The registered phone model in a pydentic model.
    """
    if db_session.query(Phone).filter(Phone.phone_number == phone_model.phone_number).first():
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Phone number already exists.")

    ...  # Validate the data by sms request

    phone = Phone(phone_number=phone_model.phone_number, name=phone_model.name)
    db_session.add(phone)
    db_session.commit()
    return phone_model


@router.get("/api/get-number-name")
async def get_number_name(number: str, db_session: Session = Depends(get_db)) -> PhoneModel:
    """
    This endpoint retrieves the name associated with a given phone number from the database.

    :param number: The phone number to look up.
    :param db_session: A database session used to query and interact with the database.

    :return: The pydentic model containing the phone number and associated name.
    """
    phone = db_session.query(Phone).filter(Phone.phone_number == number).first()
    if not phone:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Phone number not found")
    return PhoneModel(phone_number=str(phone.phone_number), name=str(phone.name))

import os
import random
import re

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, status, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel, field_validator
from who_ring_api.database.database import get_db, Phone
from who_ring_api.sms_provider.sms_provider_factory import SmsProviderFactory

load_dotenv()

class PhoneModel(BaseModel):
    phone_number: str
    name: str

    @field_validator('phone_number')
    @classmethod
    def validate_phone_number(cls, value: str) -> str:
        if not re.match(r'^\+?1?\d{9,15}$', value):
            raise ValueError('Invalid phone number')
        return value


app = FastAPI()


@app.get("/")
async def root():
    return {"message": "WhoRing API"}

@app.post("/api/send-code")
async def send_code(phone_model: PhoneModel, db_session: Session = Depends(get_db)):
    if db_session.query(Phone).filter(Phone.phone_number == phone_model.phone_number).first():
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Phone number already exists.")

    sms_provider = SmsProviderFactory.create_sms_provider(SmsProviderFactory.DEFAULT_PROVIDER_NAME)
    verification_code = random.randint(100000, 999999)
    succeed = sms_provider.send_sms(phone_model.phone_number, verification_code)
    if not succeed:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to send SMS")
    # TODO add redis and so one

@app.post("/api/register-number", response_model=PhoneModel, status_code=status.HTTP_201_CREATED)
async def register_number(phone_model: PhoneModel, db_session: Session = Depends(get_db)) -> PhoneModel:
    if db_session.query(Phone).filter(Phone.phone_number == phone_model.phone_number).first():
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Phone number already exists.")

    ...  # Validate the data by sms request

    phone = Phone(phone_number=phone_model.phone_number, name=phone_model.name)
    db_session.add(phone)
    db_session.commit()
    return phone_model


@app.get("/api/get-number-name")
async def get_number_name(number: str, db_session: Session = Depends(get_db)) -> PhoneModel:
    phone = db_session.query(Phone).filter(Phone.phone_number == number).first()
    if not phone:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Phone number not found")
    return PhoneModel(phone_number=str(phone.phone_number), name=str(phone.name))

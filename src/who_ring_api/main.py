import re

from fastapi import FastAPI, HTTPException, status, Depends
from sqlalchemy.orm import Session
from pydantic import BaseModel, field_validator
from who_ring_api.database.database import get_db, Phone


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

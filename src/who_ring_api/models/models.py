import re

from pydantic import BaseModel, field_validator


class PhoneModel(BaseModel):
    phone_number: str
    name: str

    @field_validator('phone_number')
    @classmethod
    def validate_phone_number(cls, value: str) -> str:
        """
        This function validated if the given phone number match to the phone regex.

        :param value: the phone number

        :return: valid phone number
        """
        if not re.match(r'^\+?1?\d{9,15}$', value):
            raise ValueError('Invalid phone number')
        return value


class PhoneNumber(BaseModel):
    phone_number: str

    @field_validator('phone_number')
    @classmethod
    def validate_phone_number(cls, value: str) -> str:
        """
        This function validated if the given phone number match to the phone regex.

        :param value: the phone number

        :return: valid phone number
        """
        value = value.strip()
        if not re.match(r'^\+?1?\d{9,15}$', value):
            raise ValueError('Invalid phone number')
        return value


class PhoneVerification(BaseModel):
    phone_number: str
    name: str
    verification_code: int

    @field_validator('phone_number')
    @classmethod
    def validate_phone_number(cls, value: str) -> str:
        """
        This function validated if the given phone number match to the phone regex.

        :param value: the phone number

        :return: valid phone number
        """
        if not re.match(r'^\+?1?\d{9,15}$', value):
            raise ValueError('Invalid phone number')
        return value

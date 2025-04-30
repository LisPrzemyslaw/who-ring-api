import os

from twilio.rest import Client

from who_ring_api.sms_provider.sms_provider_interface import SmsProviderInterface


class TwilioProvider(SmsProviderInterface):
    """Twilio SMS provider implementation."""
    _TWILIO_ACCOUNT_SID = "TWILIO_ACCOUNT_SID"
    _TWILIO_AUTH_TOKEN = "TWILIO_AUTH_TOKEN"
    _TWILIO_PHONE_NUMBER_KEY = "TWILIO_PHONE_NUMBER"

    def __init__(self):
        """Initialize the TwilioProvider with account SID, auth token, and sender number."""

        self.client = Client(os.getenv(TwilioProvider._TWILIO_ACCOUNT_SID), os.getenv(TwilioProvider._TWILIO_AUTH_TOKEN))
        self._twilio_number = os.getenv(TwilioProvider._TWILIO_PHONE_NUMBER_KEY)

    def send_sms(self, phone_number: str, verification_code: int) -> bool:
        """
        Send an SMS message to a given phone number.

        :param phone_number: The recipient's phone number.
        :param verification_code: The verification code to be sent.

        :return: Return True if the SMS was sent successfully, False otherwise.
        """
        message = self.client.messages.create(
            from_=self._twilio_number,
            body=f"{self.MESSAGE_BODY}{verification_code}",
            to=phone_number
        )
        return True if message.sid else False

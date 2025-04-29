from abc import ABC, abstractmethod


class SmsProviderInterface(ABC):
    """Interface for SMS provider classes."""
    MESSAGE_BODY = "WhoRing verification code: "

    @abstractmethod
    def send_sms(self, phone_number: str, verification_code: int) -> bool:
        """
        Send an SMS message to a given phone number.

        :param phone_number: The recipient's phone number.
        :param verification_code: The verification code to be sent.

        :return: Return True if the SMS was sent successfully, False otherwise.
        """
        pass

from who_ring_api.sms_provider.impl.twilio_provider import TwilioProvider
from who_ring_api.sms_provider.sms_provider_interface import SmsProviderInterface


class SmsProviderFactory:
    """Factory class to create SMS provider instances based on the provider name."""
    DEFAULT_PROVIDER_NAME = "TWILIO"
    TWILIO_PROVIDER = "TWILIO"

    _sms_providers = {TWILIO_PROVIDER: TwilioProvider}

    @staticmethod
    def create_sms_provider(provider_name: str) -> SmsProviderInterface:
        """
        Create an SMS provider instance based on the provider name.

        :param provider_name: The name of the SMS provider.

        :return: An instance of the specified SMS provider.
        """
        try:
            return SmsProviderFactory._sms_providers[provider_name]()
        except KeyError:
            raise ValueError(f"Unsupported SMS provider: {provider_name}")

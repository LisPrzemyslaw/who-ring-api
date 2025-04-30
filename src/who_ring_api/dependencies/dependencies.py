import random


def create_verification_code() -> int:
    """
    Generate a random 6-digit verification code.

    :return: A random 6-digit integer.
    """
    return random.randint(100000, 999999)

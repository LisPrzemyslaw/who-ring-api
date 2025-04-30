import os
from typing import Generator

from sqlalchemy import Column, String, create_engine
from sqlalchemy.orm import Session, declarative_base, sessionmaker

_Base = declarative_base()


class Phone(_Base):
    __tablename__ = "phone"

    phone_number = Column("phone_number", String, primary_key=True)
    name = Column("name", String)

    def __init__(self, phone_number: str, name: str) -> None:
        self.phone_number = phone_number
        self.name = name


_engine = create_engine(f"sqlite:///{os.path.join(os.path.dirname(os.path.realpath(__file__)), 'database.db')}")
_Base.metadata.create_all(bind=_engine, checkfirst=True)
_Session = sessionmaker(bind=_engine)


def get_db() -> Generator[Session, None, None]:
    """
    Provide a database session for use in database operations.
    This function yields a database session object created using SQLAlchemy's sessionmaker.
    The session is automatically closed after use, ensuring
    proper resource management.

    :return: A database session object.
    """
    db = _Session()
    try:
        yield db
    finally:
        db.close()

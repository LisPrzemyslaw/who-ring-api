import os

from sqlalchemy.orm import declarative_base, sessionmaker
from sqlalchemy import Column, String, create_engine

_Base = declarative_base()


class Phone(_Base):
    __tablename__ = "phone"

    phone_number = Column("phone_number", String, primary_key=True)
    name = Column("name", String)

    def __init__(self, phone_number: str, name: str) -> None:
        self.phone_number = phone_number
        self.name = name


_engine = create_engine(f"sqlite:///{os.path.join(os.path.dirname(os.path.realpath(__file__)), 'database.db')}")
_Base.metadata.create_all(bind=_engine)
_Session = sessionmaker(bind=_engine)

db_session = _Session()

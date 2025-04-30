import os

from dotenv import load_dotenv
from fastapi import FastAPI

from who_ring_api.routers import api

load_dotenv(os.path.join(os.path.dirname(__file__), "configuration", '.env'))

app = FastAPI()

app.include_router(api.router)


@app.get("/")
async def root() -> dict:
    """
    The entry endpoint with a default message.

    :return: Welcome message.
    """
    return {"message": "Welcome to the WhoRing! API docs are available at /docs."}

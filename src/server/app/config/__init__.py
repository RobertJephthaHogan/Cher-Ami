from typing import Optional
import os
from dotenv import load_dotenv
from beanie import init_beanie
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseSettings

from app.models.User import User
from app.models.Email import Email
from app.models.Contact import Contact
from app.models.ContactList import ContactList


# Load the environment variables
load_dotenv()

class Settings(BaseSettings):

    # database configurations
    DATABASE_URL: Optional[str] = os.getenv("MONGO_DETAILS")

    # JWT
    SECRET_KEY: str
    algorithm: str = "HS256"

    # On Start-up Configuration 
    should_run_startup_tests = 0

    # Config Class
    class Config:
        env_file = ".env"
        orm_mode = True


async def initiate_database():
    client = AsyncIOMotorClient(Settings().DATABASE_URL)
    await init_beanie(database=client.cher_ami,
                        document_models=[
                                            User,
                                            Email,
                                            Contact,
                                            ContactList
                                        ])

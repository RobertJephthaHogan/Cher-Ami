from typing import Any, Optional
from beanie import Document
from fastapi.security import HTTPBasicCredentials
from pydantic import BaseModel, EmailStr, Field


class User(Document):
    id: Optional[str] = Field(...)
    firstName: str = Field(...)
    lastName: str = Field(...)
    email: EmailStr = Field(...)
    password: str = Field(...)
    role: str = Field(...)

    class Settings:
        name = "User"

    class Config:
        schema_extra = {
            "example": {
                "id": "6276c8a63de1b5229336df5c",
                "firstName": "John",
                "lastName": "Doe",
                "email": "user@user.dev",
                "password": "password",
                "role": "user"
            }
        }


class UserSignIn(HTTPBasicCredentials):
    class Config:
        schema_extra = {
            "example": {
                "username": "user@user.dev",
                "password": "password"
            }
        }


class UserData(BaseModel):
    id: Optional[str] 
    firstName: str = Field(...)
    lastName: str = Field(...)
    email: EmailStr = Field(...)
    password: str = Field(...)
    role: str = Field(...)

    class Config:
        schema_extra = {
            "example": {
                "id": "6276c8a63de1b5229336df5c",
                "firstName": "John",
                "lastName": "Doe",
                "email": "user@user.dev",
                "password": "password",
                "role": "user"
            }
        }


class UpdateUserModel(BaseModel):
    id: Optional[str]
    firstName: Optional[str]
    lastName: Optional[str]
    email: Optional[EmailStr]
    password: Optional[str]
    role: Optional[str]

    class Config:
        schema_extra = {
            "example": {
                "id": "6276c8a63de1b5229336df5c",
                "firstName": "John",
                "lastName": "Doe",
                "email": "user@user.dev",
                "password": "password",
                "role": "user"
            }
        }


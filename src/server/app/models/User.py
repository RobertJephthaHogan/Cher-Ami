from typing import Any, Optional, Union
from beanie import Document
from fastapi.security import HTTPBasicCredentials
from pydantic import BaseModel, EmailStr, Field


class User(Document):
    id: Optional[str] = Field(...)
    firstName: str = Field(...)
    lastName: str = Field(...)
    sendFromEmail: Union[EmailStr, str] = Field(...)
    receiveToEmail: EmailStr = Field(...)
    sendFromPhone: str = Field(...)
    receiveToPhone: str = Field(...)
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
                "sendFromEmail": "john.sender@user.dev",
                "receiveToEmail": "John@user.dev",
                "sendFromPhone": "4041111111",
                "receiveToPhone": "4042222222",
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
    sendFromEmail: Union[EmailStr, str] = Field(...)
    receiveToEmail: EmailStr = Field(...)
    sendFromPhone: str = Field(...)
    receiveToPhone: str = Field(...)
    password: str = Field(...)
    role: str = Field(...)

    class Config:
        schema_extra = {
            "example": {
                "id": "6276c8a63de1b5229336df5c",
                "firstName": "John",
                "lastName": "Doe",
                "sendFromEmail": "john.sender@user.dev",
                "receiveToEmail": "John@user.dev",
                "sendFromPhone": "4041111111",
                "receiveToPhone": "4042222222",
                "password": "password",
                "role": "user"
            }
        }


class UpdateUserModel(BaseModel):
    id: Optional[str]
    firstName: Optional[str]
    lastName: Optional[str]
    sendFromEmail: Optional[Union[EmailStr, str]]
    receiveToEmail: Optional[EmailStr]
    sendFromPhone: Optional[str]
    receiveToPhone: Optional[str]
    password: Optional[str]
    role: Optional[str]

    class Config:
        schema_extra = {
            "example": {
                "id": "6276c8a63de1b5229336df5c",
                "firstName": "John",
                "lastName": "Doe",
                "sendFromEmail": "john.sender@user.dev",
                "receiveToEmail": "John@user.dev",
                "sendFromPhone": "4041111111",
                "receiveToPhone": "4042222222",
                "password": "password",
                "role": "user"
            }
        }


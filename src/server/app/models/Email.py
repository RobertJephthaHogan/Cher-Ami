import datetime
from typing import Optional, Any
from beanie import Document
from pydantic import BaseModel, EmailStr, Field


class Email(Document):
    id: Optional[str] = Field(...)
    emailSender: Optional[str] = Field(...)
    emailRecipient: Optional[str] = Field(...)
    body: Optional[str] = Field(...)
    createdByUserId: str = Field(...)
    time: datetime.datetime = Field(...)
    
    
    class Settings:
        name = "Email"

    class Config:
        schema_extra = {
            "example": {
                "id": "6382e2abc07256ef099af572",
                "emailSender": 'sender@gmail.com',
                "emailRecipient": 'recipient@gmail.com',
                "body": 'This is the email body!',
                "createdByUserId": "wwv45yw4gw45w76nr657eu",
                "time": "2022-12-22T16:09:23.443Z",
            }
        }


class UpdateEmailModel(BaseModel):
    id: Optional[str]
    emailSender: Optional[str] 
    emailRecipient: Optional[str] 
    body: Optional[str] 
    createdByUserId: Optional[str]
    time: Optional[datetime.datetime]

    class Config:
        schema_extra = {
            "example": {
                "id": "6382e2abc07256ef099af572",
                "emailSender": 'sender@gmail.com',
                "emailRecipient": 'recipient@gmail.com',
                "body": 'This is the email body!',
                "createdByUserId": "wwv45yw4gw45w76nr657eu",
                "time": "2022-12-22T16:09:23.443Z",
            }
        }


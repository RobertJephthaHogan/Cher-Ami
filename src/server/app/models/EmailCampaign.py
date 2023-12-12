import datetime
from typing import Dict, List, Optional, Any, Union
from beanie import Document
from pydantic import BaseModel, EmailStr, Field


class EmailCampaign(Document):
    id: Optional[str] = Field(...)
    title: str = Field(...)
    emailSubject: str = Field(...)
    sendFromEmail: EmailStr = Field(...)
    emailBody: str = Field(...)
    recipientContactLists: List[Any] = Field(...)
    frequency: Dict[Any, Any]
    status: Union[str, Dict[Any, Any]] = Field(...)
    creationTime: datetime.datetime = Field(...)
    createdByUserId: str = Field(...)
    
    
    class Settings:
        name = "EmailCampaign"

    class Config:
        schema_extra = {
            "example": {
                "id": "6382e2abc07256ef099af572",
                "title": "Marketing Email",
                "emailSubject": "Email Subject",
                "sendFromEmail": "myBusinessEmail@gmail.com",
                "emailBody": "This is a basic email body",
                "recipientContactLists": [],
                "frequency": {},
                "status": {
                    "title": 'sent'
                    },
                "creationTime": "2023-11-21T16:10:15-05:00",
                "createdByUserId": "wwv45yw4gw45w76nr657eu",
            }
        }


class UpdateEmailCampaignModel(BaseModel):
    id: Optional[str]
    title: Optional[str]
    emailSubject: Optional[str]
    sendFromEmail: Optional[EmailStr]
    emailBody: Optional[str]
    recipientContactLists: Optional[List[Any]]
    frequency: Optional[Dict[Any, Any]]
    status: Optional[Union[str, Dict[Any, Any]]]
    creationTime: Optional[datetime.datetime]
    createdByUserId: Optional[str]

    class Config:
        schema_extra = {
            "example": {
                "id": "6382e2abc07256ef099af572",
                "title": "Marketing Email",
                "emailSubject": "Email Subject",
                "sendFromEmail": "myBusinessEmail@gmail.com",
                "emailBody": "This is a basic email body",
                "recipientContactLists": [],
                "frequency": {},
                "status": {
                    "title": 'sent'
                    },
                "creationTime": "2023-11-21T16:10:15-05:00",
                "createdByUserId": "wwv45yw4gw45w76nr657eu",
            }
        }


import datetime
from typing import Optional, Any
from beanie import Document
from pydantic import BaseModel, Field


class Text(Document):
    id: Optional[str] = Field(...)
    textSender: Optional[str] = Field(...)
    textRecipient: Optional[str] = Field(...)
    body: Optional[str] = Field(...)
    createdByUserId: str = Field(...)
    time: datetime.datetime = Field(...)
    
    
    class Settings:
        name = "Text"

    class Config:
        schema_extra = {
            "example": {
                "id": "6382e2abc07256ef099af572",
                "textSender": '+15555555555',
                "textRecipient": '+15555555555',
                "body": 'This is the text body!',
                "createdByUserId": "wwv45yw4gw45w76nr657eu",
                "time": "2022-12-22T16:09:23.443Z",
            }
        }


class UpdateTextModel(BaseModel):
    id: Optional[str]
    textSender: Optional[str] 
    textRecipient: Optional[str] 
    body: Optional[str] 
    createdByUserId: Optional[str]
    time: Optional[datetime.datetime]

    class Config:
        schema_extra = {
            "example": {
                "id": "6382e2abc07256ef099af572",
                "textSender": '+15555555555',
                "textRecipient": '+15555555555',
                "body": 'This is the text body!',
                "createdByUserId": "wwv45yw4gw45w76nr657eu",
                "time": "2022-12-22T16:09:23.443Z",
            }
        }


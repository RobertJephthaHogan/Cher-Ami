import datetime
from typing import Optional, Any
from beanie import Document
from pydantic import BaseModel, Field


class ScheduledService(Document):
    id: Optional[str] = Field(...)
    action: Optional[str] = Field(...)
    createdByUserId: str = Field(...)
    target_id: str = Field(...)
    executed: bool = Field(...)
    time: datetime.datetime = Field(...)
    
    
    class Settings:
        name = "ScheduledService"

    class Config:
        schema_extra = {
            "example": {
                "id": "6382e2abc07256ef099af572",
                "action": 'send-scheduled-one-time-email',
                "createdByUserId": "wwv45yw4gw45w76nr657eu",
                "target_id": "123",
                "executed": False,
                "time": "2022-12-22T16:09:23.443Z",
            }
        }


class UpdateScheduledServiceModel(BaseModel):
    id: Optional[str]
    action: Optional[str] 
    createdByUserId: Optional[str]
    target_id: Optional[str]
    executed: Optional[bool]
    time: Optional[datetime.datetime]

    class Config:
        schema_extra = {
            "example": {
                "id": "6382e2abc07256ef099af572",
                "action": 'send-scheduled-one-time-email',
                "createdByUserId": "wwv45yw4gw45w76nr657eu",
                "target_id": "123",
                "executed": False,
                "time": "2022-12-22T16:09:23.443Z",
            }
        }


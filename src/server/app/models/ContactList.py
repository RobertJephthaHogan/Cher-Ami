import datetime
from typing import Optional, Any, Union
from fastapi import UploadFile
from beanie import Document
from pydantic import BaseModel, EmailStr, Field


class ContactList(Document):
    id: Optional[str] = Field(...)
    name: str = Field(...)
    file: Union[UploadFile, str] = None
    createdByUserId: str = Field(...)
    
    
    class Settings:
        name = "ContactList"

    class Config:
        schema_extra = {
            "example": {
                "id": "6382e2abc07256ef099af572",
                "name": "Customers",
                "file": "",
                "createdByUserId": "wwv45yw4gw45w76nr657eu",
            }
        }


class UpdateContactModel(BaseModel):
    id: Optional[str]
    name: Optional[str]
    file: Optional[Union[UploadFile, str]]
    createdByUserId: Optional[str]

    class Config:
        schema_extra = {
            "example": {
                "id": "6382e2abc07256ef099af572",
                "name": "Customers",
                "file": "",
                "createdByUserId": "wwv45yw4gw45w76nr657eu",
            }
        }


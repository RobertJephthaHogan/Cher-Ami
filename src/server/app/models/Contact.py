import datetime
from typing import Optional, Any
from beanie import Document
from pydantic import BaseModel, EmailStr, Field


class Contact(Document):
    id: Optional[str] = Field(...)
    firstName: str = Field(...)
    lastOrBusinessName: str = Field(...)
    email: EmailStr = Field(...)
    phone: str = Field(...)
    dob: str = Field(...)
    notes: str = Field(...)
    tags: list = Field(...)
    createdByUserId: str = Field(...)
    
    
    class Settings:
        name = "Contact"

    class Config:
        schema_extra = {
            "example": {
                "id": "6382e2abc07256ef099af572",
                "firstName": "John",
                "lastOrBusinessName": "Smith",
                "email": "john.smith@gmail.com",
                "phone": "4041111111",
                "dob": "2022-12-22T16:09:23.443Z",
                "notes": "note about this contact",
                "tags": ["Customer", "Client"],
                "createdByUserId": "wwv45yw4gw45w76nr657eu",
            }
        }


class UpdateContactModel(BaseModel):
    id: Optional[str]
    firstName: Optional[str]
    lastOrBusinessName: Optional[str]
    email: Optional[EmailStr]
    phone: Optional[str]
    dob: Optional[str]
    notes: Optional[str]
    tags: Optional[list]
    createdByUserId: Optional[str]

    class Config:
        schema_extra = {
            "example": {
                "id": "6382e2abc07256ef099af572",
                "firstName": "John",
                "lastOrBusinessName": "Smith",
                "email": "john.smith@gmail.com",
                "phone": "4041111111",
                "dob": "2022-12-22T16:09:23.443Z",
                "notes": "note about this contact",
                "tags": ["Customer", "Client"],
                "createdByUserId": "wwv45yw4gw45w76nr657eu",
            }
        }


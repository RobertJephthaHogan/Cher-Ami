from beanie import PydanticObjectId
from pydantic import ValidationError
from typing import List, Union
from bson import ObjectId


from app.models.Email import Email, UpdateEmailModel


email_collection = Email

class EmailOperations:

    async def add_email(new_email: Email) -> Email:
        new_email.id = str(ObjectId())
        email = await new_email.create()
        return email


    async def retrieve_all_emails() -> List[Email]:
        emails = await email_collection.all().to_list()
        return emails

    
    async def retrieve_emails_for_user(user_id) -> List[Email]:
        emails = await email_collection.find(Email.createdByUserId == user_id).to_list()
        return emails


    async def retrieve_email(id: Email) -> Email:
        email = await email_collection.get(str(id))
        if email:
            return email
        

    async def delete_email(id: PydanticObjectId) -> bool:
        try:
            email = await email_collection.get(str(id))
        except ValidationError as e:
            print(e.json())
        if email:
            await email.delete()
            return True


    async def update_email_data(id: PydanticObjectId, data: dict) -> Union[bool, Email]:
        des_body = {k: v for k, v in data.items() if v is not None}
        update_query = {"$set": {
            field: value for field, value in des_body.items()
        }}
        email = await email_collection.get(str(id))
        if email:
            await email.update(update_query)
            return email
        return False


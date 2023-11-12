from beanie import PydanticObjectId
from pydantic import ValidationError
from typing import List, Union
from bson import ObjectId


from app.models.Contact import Contact, UpdateContactModel


contact_collection = Contact

class ContactOperations:

    async def add_contact(new_contact: Contact) -> Contact:
        new_contact.id = str(ObjectId())
        contact = await new_contact.create()
        return contact


    async def retrieve_all_contacts() -> List[Contact]:
        contacts = await contact_collection.all().to_list()
        return contacts

    
    async def retrieve_contacts_for_user(user_id) -> List[Contact]:
        print('user_id', user_id)
        contacts = await contact_collection.find(Contact.createdByUserId == user_id).to_list()
        return contacts


    async def retrieve_contact(id: Contact) -> Contact:
        contact = await contact_collection.get(str(id))
        if contact:
            return contact
        

    async def delete_contact(id: PydanticObjectId) -> bool:
        try:
            contact = await contact_collection.get(str(id))
        except ValidationError as e:
            print(e.json())
        if contact:
            await contact.delete()
            return True


    async def update_contact_data(id: PydanticObjectId, data: dict) -> Union[bool, Contact]:
        des_body = {k: v for k, v in data.items() if v is not None}
        update_query = {"$set": {
            field: value for field, value in des_body.items()
        }}
        contact = await contact_collection.get(str(id))
        if contact:
            await contact.update(update_query)
            return contact
        return False


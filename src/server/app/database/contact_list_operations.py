from beanie import PydanticObjectId
from pydantic import ValidationError
from typing import List, Union
from bson import ObjectId


from app.models.ContactList import ContactList, UpdateContactListModel


contact_list_collection = ContactList

class ContactListOperations:

    async def add_contact_list(new_contact_list: ContactList) -> ContactList:
        new_contact_list.id = str(ObjectId())
        contact_list = await new_contact_list.create()
        return contact_list


    async def retrieve_all_contact_lists() -> List[ContactList]:
        contact_lists = await contact_list_collection.all().to_list()
        return contact_lists

    
    async def retrieve_contact_lists_for_user(user_id) -> List[ContactList]:
        contact_lists = await contact_list_collection.find(ContactList.createdByUserId == user_id).to_list()
        return contact_lists


    async def retrieve_contact_list(id: ContactList) -> ContactList:
        contact_list = await contact_list_collection.get(str(id))
        if contact_list:
            return contact_list
        

    async def delete_contact_list(id: PydanticObjectId) -> bool:
        try:
            contact_list = await contact_list_collection.get(str(id))
        except ValidationError as e:
            print(e.json())
        if contact_list:
            await contact_list.delete()
            return True


    async def update_contact_list_data(id: PydanticObjectId, data: dict) -> Union[bool, ContactList]:
        des_body = {k: v for k, v in data.items() if v is not None}
        update_query = {"$set": {
            field: value for field, value in des_body.items()
        }}
        contact_list = await contact_list_collection.get(str(id))
        if contact_list:
            await contact_list.update(update_query)
            return contact_list
        return False


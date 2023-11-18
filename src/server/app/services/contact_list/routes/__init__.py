import json
from fastapi import APIRouter, Body
from beanie import PydanticObjectId
from app.models.Response import Response
from app.database.contact_list_operations import ContactListOperations
from app.models.ContactList import ContactList, UpdateContactListModel
from app.models.Response import Response200, Response404


router = APIRouter()

@router.get("/single/{id}", response_description="Contact List data retrieved", response_model=Response)
async def get_contact_list_data(id: PydanticObjectId):
    contact_list = await ContactListOperations.retrieve_contact_list(id)
    if contact_list:
        return {
            "status_code": 200,
            "response_type": "success",
            "description": "Contact List data retrieved successfully",
            "data": contact_list
        }
    return {
        "status_code": 404,
        "response_type": "error",
        "description": "Contact List doesn't exist",
    }

@router.get("/user/{user_id}", response_description="Contact List data retrieved", response_model=Response)
async def get_contact_lists_for_user(user_id):
    contact_lists = await ContactListOperations.retrieve_contact_lists_for_user(user_id)
    schData = ContactList.schema()
    try:
        schData['properties'].pop('revision_id')
    except KeyError as ex:
        print('err', ex)
    dto = {
        "queryResult" : contact_lists,
        "schema": schData
    }
    if contact_lists:
        response = Response200()
        response.data = dto
        return json.loads(response.json())
    response = Response404()
    response.data = dto
    return json.loads(response.json())

@router.get("/get_all", response_description="Contact Lists data retrieved", response_model=Response)
async def get_contact_lists():
    contact_lists = await ContactListOperations.retrieve_all_contact_lists()
    if contact_lists:
        return {
            "status_code": 200,
            "response_type": "success",
            "description": "Contact Lists retrieved successfully",
            "data": contact_lists
        }
    return {
        "status_code": 404,
        "response_type": "error",
        "description": "No Contact Lists exist",
    }


@router.post("/new", response_description="Contact List data added into the database", response_model=Response)
async def add_contact_list_data(contact_list: ContactList = Body(...)):
    print('contact_list', contact_list)
    new_contact_list = await ContactListOperations.add_contact_list(contact_list)
    return {
        "status_code": 200,
        "response_type": "success",
        "description": "Contact List created successfully",
        "data": new_contact_list
    }


@router.delete("/{id}", response_description="Contact List data deleted from the database")
async def delete_contact_list_data(id: PydanticObjectId):
    deleted_contact_list = await ContactListOperations.delete_contact_list(id)
    if deleted_contact_list:
        return {
            "status_code": 200,
            "response_type": "success",
            "description": "Contact List with ID: {} removed".format(id),
            "data": deleted_contact_list
        }
    return {
        "status_code": 404,
        "response_type": "error",
        "description": "Contact List with id {0} doesn't exist".format(id),
        "data": False
    }


@router.put("/{id}", response_model=Response)
async def update_contact_list(id: PydanticObjectId, req: UpdateContactListModel = Body(...)):
    updated_contact_list = await ContactListOperations.update_contact_list_data(id, req.dict())
    if updated_contact_list:
        return {
            "status_code": 200,
            "response_type": "success",
            "description": "Contact List with ID: {} updated".format(id),
            "data": updated_contact_list
        }
    return {
        "status_code": 404,
        "response_type": "error",
        "description": "An error occurred. Contact List with ID: {} not found".format(id),
        "data": False
    }

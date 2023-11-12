import json
from fastapi import APIRouter, Body
from beanie import PydanticObjectId
from app.models.Response import Response
from app.database.contact_operations import ContactOperations
from app.models.Contact import Contact, UpdateContactModel
from app.models.Response import Response200, Response404


router = APIRouter()

@router.get("/single/{id}", response_description="Contact data retrieved", response_model=Response)
async def get_contact_data(id: PydanticObjectId):
    contact = await ContactOperations.retrieve_contact(id)
    if contact:
        return {
            "status_code": 200,
            "response_type": "success",
            "description": "Contact data retrieved successfully",
            "data": contact
        }
    return {
        "status_code": 404,
        "response_type": "error",
        "description": "Contact doesn't exist",
    }

@router.get("/user/{user_id}", response_description="Contact data retrieved", response_model=Response)
async def get_contacts_for_user(user_id):
    contacts = await ContactOperations.retrieve_contacts_for_user(user_id)
    schData = Contact.schema()
    try:
        schData['properties'].pop('revision_id')
    except KeyError as ex:
        print('err', ex)
    dto = {
        "queryResult" : contacts,
        "schema": schData
    }
    if contacts:
        response = Response200()
        response.data = dto
        return json.loads(response.json())
    response = Response404()
    response.data = dto
    return json.loads(response.json())

@router.get("/get_all", response_description="Contact data retrieved", response_model=Response)
async def get_contacts():
    contacts = await ContactOperations.retrieve_all_contacts()
    if contacts:
        return {
            "status_code": 200,
            "response_type": "success",
            "description": "Contacts retrieved successfully",
            "data": contacts
        }
    return {
        "status_code": 404,
        "response_type": "error",
        "description": "No Contacts exist",
    }


@router.post("/new", response_description="Contact data added into the database", response_model=Response)
async def add_contact_data(contact: Contact = Body(...)):
    new_contact = await ContactOperations.add_contact(contact)
    return {
        "status_code": 200,
        "response_type": "success",
        "description": "Contact created successfully",
        "data": new_contact
    }


@router.delete("/{id}", response_description="Contact data deleted from the database")
async def delete_contact_data(id: PydanticObjectId):
    deleted_contact = await ContactOperations.delete_contact(id)
    if deleted_contact:
        return {
            "status_code": 200,
            "response_type": "success",
            "description": "Contact with ID: {} removed".format(id),
            "data": deleted_contact
        }
    return {
        "status_code": 404,
        "response_type": "error",
        "description": "Contact with id {0} doesn't exist".format(id),
        "data": False
    }


@router.put("/{id}", response_model=Response)
async def update_contact(id: PydanticObjectId, req: UpdateContactModel = Body(...)):
    updated_contact = await ContactOperations.update_contact_data(id, req.dict())
    if updated_contact:
        return {
            "status_code": 200,
            "response_type": "success",
            "description": "Contact with ID: {} updated".format(id),
            "data": updated_contact
        }
    return {
        "status_code": 404,
        "response_type": "error",
        "description": "An error occurred. Contact with ID: {} not found".format(id),
        "data": False
    }

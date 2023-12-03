import json
from fastapi import APIRouter, Body
from beanie import PydanticObjectId
from app.models.Response import Response
from app.database.scheduled_service_operations import ScheduledServiceOperations
from app.models.ScheduledService import ScheduledService, UpdateScheduledServiceModel
from app.models.Response import Response200, Response404


router = APIRouter()

@router.get("/single/{id}", response_description="Scheduled Service data retrieved", response_model=Response)
async def get_scheduled_service_data(id: PydanticObjectId):
    scheduled_service = await ScheduledServiceOperations.retrieve_scheduled_service(id)
    if scheduled_service:
        return {
            "status_code": 200,
            "response_type": "success",
            "description": "Scheduled Service data retrieved successfully",
            "data": scheduled_service
        }
    return {
        "status_code": 404,
        "response_type": "error",
        "description": "Scheduled Service doesn't exist",
    }

@router.get("/user/{user_id}", response_description="Scheduled Service data retrieved", response_model=Response)
async def get_scheduled_services_for_user(user_id):
    scheduled_services = await ScheduledServiceOperations.retrieve_scheduled_services_for_user(user_id)
    schData = ScheduledService.schema()
    try:
        schData['properties'].pop('revision_id')
    except KeyError as ex:
        print('err', ex)
    dto = {
        "queryResult" : scheduled_services,
        "schema": schData
    }
    if scheduled_services:
        response = Response200()
        response.data = dto
        return json.loads(response.json())
    response = Response404()
    response.data = dto
    return json.loads(response.json())

@router.get("/get_all", response_description="Scheduled Service data retrieved", response_model=Response)
async def get_scheduled_services():
    scheduled_services = await ScheduledServiceOperations.retrieve_all_scheduled_services()
    if scheduled_services:
        return {
            "status_code": 200,
            "response_type": "success",
            "description": "Scheduled Services retrieved successfully",
            "data": scheduled_services
        }
    return {
        "status_code": 404,
        "response_type": "error",
        "description": "No Scheduled Services exist",
    }


@router.post("/new", response_description="Scheduled Service data added into the database", response_model=Response)
async def add_scheduled_service_data(scheduled_service: ScheduledService = Body(...)):
    new_scheduled_service = await ScheduledServiceOperations.add_scheduled_service(scheduled_service)
    return {
        "status_code": 200,
        "response_type": "success",
        "description": "Scheduled Service created successfully",
        "data": new_scheduled_service
    }


@router.delete("/{id}", response_description="Scheduled Service data deleted from the database")
async def delete_scheduled_service_data(id: PydanticObjectId):
    deleted_scheduled_service = await ScheduledServiceOperations.delete_scheduled_service(id)
    if deleted_scheduled_service:
        return {
            "status_code": 200,
            "response_type": "success",
            "description": "Scheduled Service with ID: {} removed".format(id),
            "data": deleted_scheduled_service
        }
    return {
        "status_code": 404,
        "response_type": "error",
        "description": "Scheduled Service with id {0} doesn't exist".format(id),
        "data": False
    }


@router.put("/{id}", response_model=Response)
async def update_scheduled_service(id: PydanticObjectId, req: UpdateScheduledServiceModel = Body(...)):
    updated_scheduled_service = await ScheduledServiceOperations.update_scheduled_service_data(id, req.dict())
    if updated_scheduled_service:
        return {
            "status_code": 200,
            "response_type": "success",
            "description": "Scheduled Service with ID: {} updated".format(id),
            "data": updated_scheduled_service
        }
    return {
        "status_code": 404,
        "response_type": "error",
        "description": "An error occurred. Scheduled Service with ID: {} not found".format(id),
        "data": False
    }

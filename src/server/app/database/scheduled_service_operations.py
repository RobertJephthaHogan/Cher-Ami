from beanie import PydanticObjectId
from pydantic import ValidationError
from typing import List, Union
from bson import ObjectId


from app.models.ScheduledService import ScheduledService, UpdateScheduledServiceModel


scheduled_service_collection = ScheduledService

class ScheduledServiceOperations:

    async def add_scheduled_service(new_scheduled_service: ScheduledService) -> ScheduledService:
        new_scheduled_service.id = str(ObjectId())
        scheduled_service = await new_scheduled_service.create()
        return scheduled_service


    async def retrieve_all_scheduled_services() -> List[ScheduledService]:
        scheduled_services = await scheduled_service_collection.all().to_list()
        return scheduled_services
    
    async def retrieve_unexecuted_scheduled_services() -> List[ScheduledService]:
        scheduled_services = await scheduled_service_collection.find({'executed': False}).to_list()
        return scheduled_services

    async def retrieve_scheduled_services_for_user(user_id) -> List[ScheduledService]:
        scheduled_services = await scheduled_service_collection.find(ScheduledService.createdByUserId == user_id).to_list()
        return scheduled_services


    async def retrieve_scheduled_service(id: ScheduledService) -> ScheduledService:
        scheduled_service = await scheduled_service_collection.get(str(id))
        if scheduled_service:
            return scheduled_service
        

    async def delete_scheduled_service(id: PydanticObjectId) -> bool:
        try:
            scheduled_service = await scheduled_service_collection.get(str(id))
        except ValidationError as e:
            print(e.json())
        if scheduled_service:
            await scheduled_service.delete()
            return True


    async def update_scheduled_service_data(id: PydanticObjectId, data: dict) -> Union[bool, ScheduledService]:
        des_body = {k: v for k, v in data.items() if v is not None}
        update_query = {"$set": {
            field: value for field, value in des_body.items()
        }}
        scheduled_service = await scheduled_service_collection.get(str(id))
        if scheduled_service:
            await scheduled_service.update(update_query)
            return scheduled_service
        return False


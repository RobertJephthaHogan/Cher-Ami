



from app.database.scheduled_service_operations import ScheduledServiceOperations


class Helpers:
    
    
    async def set_scheduled_service_executed(service_id):
        executed_service = await ScheduledServiceOperations.retrieve_scheduled_service(service_id)
        edited = executed_service.__dict__
        edited['executed'] = True
        edited['status']['title'] = 'executed'
        edited['status']['data'] = {}
        await ScheduledServiceOperations.update_scheduled_service_data(service_id, edited)
        
        
    async def set_scheduled_service_error(service_id, error_data):
        executed_service = ScheduledServiceOperations.retrieve_scheduled_service(service_id)
        edited = executed_service.__dict__
        edited['executed'] = False
        edited['status']['title'] = 'error'
        edited['status']['data'] = error_data
        await ScheduledServiceOperations.update_scheduled_service_data(edited.id, edited)
        
    
    
    
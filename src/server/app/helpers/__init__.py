



from app.database.scheduled_service_operations import ScheduledServiceOperations
from app.database.email_campaign_operations import EmailCampaignOperations


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
        
    async def set_email_campaign_error(campaign_id, error_data):
        db_campaign = await EmailCampaignOperations.retrieve_email_campaign(campaign_id)   
        edited = db_campaign.__dict__
        edited['status']['title'] = 'error'
        edited['status']['data'] = error_data
        await EmailCampaignOperations.update_email_campaign_data(campaign_id, edited)
    
    async def set_email_campaign_sent(campaign_id, status_data):
        db_campaign = await EmailCampaignOperations.retrieve_email_campaign(campaign_id)   
        edited = db_campaign.__dict__
        edited['status']['title'] = 'sent'
        edited['status']['data'] = status_data
        await EmailCampaignOperations.update_email_campaign_data(campaign_id, edited)
    
    async def set_email_campaign_active(campaign_id, first_iteration_results):
        db_campaign = await EmailCampaignOperations.retrieve_email_campaign(campaign_id)   
        edited = db_campaign.__dict__
        edited['status']['title'] = 'active'
        edited['status']['occurrence_results'] = [first_iteration_results]
        await EmailCampaignOperations.update_email_campaign_data(campaign_id, edited)
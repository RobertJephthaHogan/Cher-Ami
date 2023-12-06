



from datetime import datetime, timedelta, timezone
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
            
    def closest_weekday(weekdays):
        # Get the current day of the week (0 = Monday, 1 = Tuesday, ..., 6 = Sunday)
        current_day = datetime.now(timezone.utc).weekday()

        # Convert weekday names to their corresponding indices
        weekday_indices = {'monday': 0, 'tuesday': 1, 'wednesday': 2, 'thursday': 3, 'friday': 4, 'saturday': 5, 'sunday': 6}

        # Find the closest future occurrence of each weekday
        closest_dates = {}
        for weekday in weekdays:
            target_day = weekday_indices[weekday.lower()]
            days_until_target = (target_day - current_day + 7) % 7
            closest_dates[weekday] = datetime.now(timezone.utc) + timedelta(days=days_until_target)

        # Find the overall closest date
        closest_date = min(closest_dates.values())

        return closest_date
        
    
    
    
    
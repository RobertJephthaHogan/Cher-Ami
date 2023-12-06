from datetime import datetime, timedelta, timezone
from app.helpers import Helpers
from bson import ObjectId
from app.models.ScheduledService import ScheduledService
from app.database.scheduled_service_operations import ScheduledServiceOperations


class ServiceScheduler:
    
    
    async def schedule_next_campaign_occurrence(campaign_type, campaign_data):
        
        recurrence_data = campaign_data.frequency.get('recurrence')
        print('recurrence_data', recurrence_data)
        
        frequency_interval = recurrence_data.get('frequencyInterval')
        interval_send_days = recurrence_data.get('intervalSendDays')
        
        occurrence_data = {
            'id': str(ObjectId()),
            'createdByUserId': campaign_data.createdByUserId,
            'target_id': campaign_data.id,
            'executed': False,
            'status': {
                    'title': 'pending',
                    'data': {},
                    },
        }
        # Need to determine service time based on recurrence data
        # Need to determine action based on recurrence data
        
        # determine the next occurrence details based on recurrence data
        if frequency_interval == "daily":
            print('TODO: DAILY HANDLING')
            
        elif frequency_interval == "weekly":
            
            # Get the next upcoming date in the campaign series
            next_upcoming_date_string = Helpers.find_next_weekly_series_occurrence(interval_send_days) 
            
            # set send time from the campaign data
            send_time = recurrence_data.get('sendTime')
            
            # format the date and time so they can be combined
            date_obj = datetime.strptime(next_upcoming_date_string, '%Y-%m-%d')
            time_obj = datetime.fromisoformat(send_time)
            new_date = date_obj.date()
            new_time = time_obj.time()
            time_zone_info = time_obj.tzinfo
            
            # Combine send date and time to get datetime to send the next occurrence
            campaign_occurrence_datetime = datetime.combine(new_date, new_time, time_zone_info)
                        
            occurrence_data['time'] = campaign_occurrence_datetime
            
            
        elif frequency_interval == "monthly":
            print('TODO: MONTHLY HANDLING')
        
        elif frequency_interval == "yearly":
            print('TODO: YEARLY HANDLING')
        
        
        # then set service action based on campaign type        
        if campaign_type == 'email':
            # Add send-recurring-email-campaign as action
            occurrence_data['action'] = 'send-recurring-email-campaign'
            
        if campaign_type == 'text':
            pass
        
        if campaign_type == 'call':
            pass
        
        ss_instance = ScheduledService(**occurrence_data)
                
        await ScheduledServiceOperations.add_scheduled_service(ss_instance)
        

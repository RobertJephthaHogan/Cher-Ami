from datetime import datetime, timedelta, timezone
from app.helpers import Helpers
from bson import ObjectId


class ServiceScheduler:
    
    
    async def schedule_next_campaign_occurrence(campaign_type, campaign_data):
        
        recurrence_data = campaign_data.frequency.get('recurrence')
        print('recurrence_data', recurrence_data)
        
        frequency_interval = recurrence_data.get('frequencyInterval')
        interval_send_days = recurrence_data.get('intervalSendDays')
        
        print('frequency_interval', frequency_interval)
        print('interval_send_days', interval_send_days)
        
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
            
            
            next_upcoming = Helpers.closest_weekday(interval_send_days)
            print('next_upcoming', next_upcoming)
            
            
            print('TODO: WEEKLY HANDLING')
            
        elif frequency_interval == "monthly":
            print('TODO: MONTHLY HANDLING')
        
        elif frequency_interval == "yearly":
            print('TODO: YEARLY HANDLING')
        
        
        
        # then handle service creation based on campaign type
        print('campaign_type', campaign_type)
        

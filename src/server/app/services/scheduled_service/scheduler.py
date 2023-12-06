from datetime import datetime, timedelta, timezone
from app.helpers import Helpers
from bson import ObjectId


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
            
            
            next_upcoming_date_string = Helpers.find_next_weekly_series_occurrence(interval_send_days)
            print('next_upcoming_date_string', next_upcoming_date_string)
            
            send_time = recurrence_data.get('sendTime')
            print('send_time', send_time)
            
            date_obj = datetime.strptime(next_upcoming_date_string, '%Y-%m-%d')
            time_obj = datetime.fromisoformat(send_time)
            
            print('date_obj', date_obj)
            new_date = date_obj.date()

            new_time = time_obj.time()
            
            new_datetime = datetime.combine(new_date, new_time)
            print('new_datetime', new_datetime)
            
            print('TODO: WEEKLY HANDLING')
            
        elif frequency_interval == "monthly":
            print('TODO: MONTHLY HANDLING')
        
        elif frequency_interval == "yearly":
            print('TODO: YEARLY HANDLING')
        
        
        
        # then handle service creation based on campaign type
        print('campaign_type', campaign_type)
        

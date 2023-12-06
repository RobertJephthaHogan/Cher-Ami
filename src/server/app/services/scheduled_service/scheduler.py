from datetime import datetime


class ServiceScheduler:
    
    
    async def schedule_next_campaign_occurrence(campaign_data):
        recurrence_data = campaign_data.frequency.get('recurrence')
        print('recurrence_data', recurrence_data)
        
        frequency_interval = recurrence_data.get('frequencyInterval')
        interval_send_days = recurrence_data.get('intervalSendDays')
        
        current_time = datetime.now()
        print('current_time', current_time)
        
    
    
    
    
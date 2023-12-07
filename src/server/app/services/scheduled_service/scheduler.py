from datetime import datetime, timedelta, timezone
from app.helpers import Helpers
from bson import ObjectId
from app.models.ScheduledService import ScheduledService
from app.database.scheduled_service_operations import ScheduledServiceOperations


class ServiceScheduler:
    
    
    async def schedule_next_campaign_occurrence(campaign_type, campaign_data):
        
        recurrence_data = campaign_data.frequency.get('recurrence')
        print('recurrence_data', recurrence_data)
        
        end_date = recurrence_data['endDate']
        print('end_date', end_date)
        
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
            
            today = datetime.now().date()
            tomorrow = str(today + timedelta(days=1))
            
            # set send time from the campaign data
            send_time = recurrence_data.get('sendTime')
            
            # format the date and time so they can be combined
            date_obj = datetime.strptime(tomorrow, '%Y-%m-%d')
            time_obj = datetime.fromisoformat(send_time)
            new_date = date_obj.date()
            new_time = time_obj.time()
            time_zone_info = time_obj.tzinfo
            
            # Combine send date and time to get datetime to send the next occurrence
            campaign_occurrence_datetime = datetime.combine(new_date, new_time, time_zone_info)
            
            # determine if campaign should be ended if the next campaign time is after the end date
            end_date_as_date = datetime.strptime(end_date, "%Y-%m-%dT%H:%M:%S%z")
            should_end_campaign = campaign_occurrence_datetime > end_date_as_date
            
            if should_end_campaign:
                return {'status': 'should end campaign'}
            else:
                occurrence_data['time'] = campaign_occurrence_datetime
            
            
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
            
            # Get the next upcoming date in the campaign series
            next_upcoming_date_string = Helpers.find_next_monthly_series_occurrence(interval_send_days) 
            print('next_upcoming_date_string', next_upcoming_date_string)
            
            # set send time from the campaign data
            send_time = recurrence_data.get('sendTime')
            
            # format the date and time so they can be combined
            date_obj = datetime.strptime(str(next_upcoming_date_string), "%Y-%m-%d %H:%M:%S.%f")
            time_obj = datetime.fromisoformat(send_time)
            new_date = date_obj.date()
            new_time = time_obj.time()
            time_zone_info = time_obj.tzinfo
            
            # Combine send date and time to get datetime to send the next occurrence
            campaign_occurrence_datetime = datetime.combine(new_date, new_time, time_zone_info)
            occurrence_data['time'] = campaign_occurrence_datetime
            
        
        elif frequency_interval == "yearly":
            print('TODO: YEARLY HANDLING')
        
        
        # then set service action based on campaign type        
        if campaign_type == 'email':
            occurrence_data['action'] = 'send-recurring-email-campaign'
            
        if campaign_type == 'text':
            occurrence_data['action'] = 'send-recurring-text-campaign'
        
        if campaign_type == 'call':
            occurrence_data['action'] = 'send-recurring-call-campaign'
        
        ss_instance = ScheduledService(**occurrence_data)
                
        await ScheduledServiceOperations.add_scheduled_service(ss_instance)
        
        
        
    async def schedule_initial_campaign_occurrence(campaign_type, campaign_data):
        
        # Use start date of the campaign to anchor initial occurrence
        start_date = campaign_data.frequency['recurrence']['startDate']
        print('start_date', start_date)
        
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
            
            # set send time from the campaign data
            send_time = recurrence_data.get('sendTime')
            start_date_as_date = datetime.strptime(start_date, "%Y-%m-%dT%H:%M:%S%z")
            
            # format the date and time so they can be combined
            time_obj = datetime.fromisoformat(send_time)
            new_date = start_date_as_date.date()
            new_time = time_obj.time()
            time_zone_info = time_obj.tzinfo
            
            # Combine send date and time to get datetime to send the next occurrence
            campaign_occurrence_datetime = datetime.combine(new_date, new_time, time_zone_info)
            occurrence_data['time'] = campaign_occurrence_datetime
            
        elif frequency_interval == "weekly":
            
            start_date_as_date = datetime.strptime(start_date, "%Y-%m-%dT%H:%M:%S%z")

            # Get the next upcoming date in the campaign series
            next_upcoming_date_string = Helpers.find_initial_weekly_series_occurrence(start_date, interval_send_days) 
            
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
            
            start_date_as_date = datetime.strptime(start_date, "%Y-%m-%dT%H:%M:%S%z")
            
            # Get the next upcoming date in the campaign series
            initial_date_string = Helpers.find_initial_monthly_series_occurrence(start_date_as_date, interval_send_days) 
            
            # set send time from the campaign data
            send_time = recurrence_data.get('sendTime')
            
            # format the date and time so they can be combined
            date_obj = datetime.strptime(str(initial_date_string), "%Y-%m-%d %H:%M:%S%z")
            time_obj = datetime.fromisoformat(send_time)
            new_date = date_obj.date()
            new_time = time_obj.time()
            time_zone_info = time_obj.tzinfo
            
            # Combine send date and time to get datetime to send the next occurrence
            campaign_occurrence_datetime = datetime.combine(new_date, new_time, time_zone_info)
            occurrence_data['time'] = campaign_occurrence_datetime
        
        
        # then set service action based on campaign type        
        if campaign_type == 'email':
            occurrence_data['action'] = 'send-recurring-email-campaign'
            
        if campaign_type == 'text':
            occurrence_data['action'] = 'send-recurring-text-campaign'
        
        if campaign_type == 'call':
            occurrence_data['action'] = 'send-recurring-call-campaign'
        
        ss_instance = ScheduledService(**occurrence_data)
                
        await ScheduledServiceOperations.add_scheduled_service(ss_instance)
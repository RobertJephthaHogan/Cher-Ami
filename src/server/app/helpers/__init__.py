



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
        executed_service = await ScheduledServiceOperations.retrieve_scheduled_service(service_id)
        edited = executed_service.__dict__
        edited['executed'] = False
        edited['status']['title'] = 'error'
        edited['status']['data'] = error_data
        await ScheduledServiceOperations.update_scheduled_service_data(edited['id'], edited)
        
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
        
    async def add_results_to_email_campaign(email_campaign, occurrence_results):
        #TODO: RESUME HERE: ADD RESULTS TO EMAIL CAMPAIGN
        edited = email_campaign.__dict__
        edited['status']['title'] = 'active' # ensure campaign is now set to active
        existing_results = edited['status'].get('occurrence_results', [])
        existing_results.append(occurrence_results)
        edited['status']['occurrence_results'] = existing_results
        await EmailCampaignOperations.update_email_campaign_data(email_campaign.id, edited)
        
        
        
    async def set_email_campaign_scheduled(campaign_id):
        db_campaign = await EmailCampaignOperations.retrieve_email_campaign(campaign_id)   
        edited = db_campaign.__dict__
        edited['status']['title'] = 'scheduled'
        await EmailCampaignOperations.update_email_campaign_data(campaign_id, edited)
    
    async def set_campaign_complete(campaign_type, campaign_id):
        if campaign_type == 'email':
            db_campaign = await EmailCampaignOperations.retrieve_email_campaign(campaign_id)   
            edited = db_campaign.__dict__
            edited['status']['title'] = 'complete'
            await EmailCampaignOperations.update_email_campaign_data(campaign_id, edited)
            
        if campaign_type == 'text':
            #TODO: Update text campaign to complete when services are created
            pass
        
        if campaign_type == 'call':
            #TODO: Update text campaign to complete when services are created
            pass
        
            
    def find_next_weekly_series_occurrence(weekdays):
       
        current_date = datetime.now(timezone.utc)

        # Convert weekday names to their corresponding indices
        weekday_indices = {'monday': 0, 'tuesday': 1, 'wednesday': 2, 'thursday': 3, 'friday': 4, 'saturday': 5, 'sunday': 6}

        # Find the next occurrence of each weekday in the input array
        next_dates = []
        for weekday in weekdays:
            # Calculate the difference in days between the desired weekday and the current weekday
            days_until_next = (weekday_indices[weekday.lower()] - current_date.weekday() + 7) % 7

            # Calculate the date of the next occurrence
            next_date = current_date + timedelta(days=days_until_next)

            # Add the next date to the result list
            next_dates.append(next_date)

        # Generate dates for the next week for each weekday
        result_dates = []
        for next_date in next_dates:
            result_dates.append(next_date.strftime('%Y-%m-%d'))
            #next_date += timedelta(days=7)
            
        sorted_dates = sorted(result_dates, key=lambda x: datetime.strptime(x, '%Y-%m-%d'))

        # Get today's date
        today = datetime.now().date()

        # Filter out today's date and find the soonest upcoming date
        upcoming_dates = [date for date in sorted_dates if datetime.strptime(date, '%Y-%m-%d').date() > today]

        if upcoming_dates:
            return min(upcoming_dates) # return soonest upcoming date in series
        else:
            return None
        
    def find_initial_weekly_series_occurrence(start_date, weekdays):
        
        start_date_as_date = datetime.strptime(start_date, "%Y-%m-%dT%H:%M:%S%z")

        # Convert weekday names to their corresponding indices
        weekday_indices = {'monday': 0, 'tuesday': 1, 'wednesday': 2, 'thursday': 3, 'friday': 4, 'saturday': 5, 'sunday': 6}

        # Find the next occurrence of each weekday in the input array
        next_dates = []
        for weekday in weekdays:
            # Calculate the difference in days between the desired weekday and the current weekday
            days_until_next = (weekday_indices[weekday.lower()] - start_date_as_date.weekday() + 7) % 7

            # Calculate the date of the next occurrence
            next_date = start_date_as_date + timedelta(days=days_until_next)

            # Add the next date to the result list
            next_dates.append(next_date)

        # Generate dates for the next week for each weekday
        result_dates = []
        for next_date in next_dates:
            result_dates.append(next_date.strftime('%Y-%m-%d'))
            #next_date += timedelta(days=7)
            
        sorted_dates = sorted(result_dates, key=lambda x: datetime.strptime(x, '%Y-%m-%d'))

        # Get today's date
        today = datetime.now().date()

        # Filter out today's date and find the soonest upcoming date
        upcoming_dates = [date for date in sorted_dates if datetime.strptime(date, '%Y-%m-%d').date() > today]

        if upcoming_dates:
            return min(upcoming_dates) # return soonest upcoming date in series
        else:
            return None
        
        
    def find_next_monthly_series_occurrence(series_days):
        current_date = datetime.now()
        result_dates = []

        for number in series_days:
            target_date = current_date.replace(day=number)

            if target_date < current_date:
                # If the target date has already passed in the current month,
                # set it to the same day in the next month
                if current_date.month == 12:
                    target_date = target_date.replace(month=1, year=current_date.year + 1)
                else:
                    target_date = target_date.replace(month=current_date.month + 1)


            result_dates.append(target_date)

        return min(result_dates)
    
    def find_initial_monthly_series_occurrence(start_date, series_days):
        result_dates = []

        for number in series_days:
            target_date = start_date.replace(day=number)

            if target_date < start_date:
                # If the target date has already passed in the current month,
                # set it to the same day in the next month
                if start_date.month == 12:
                    target_date = target_date.replace(month=1, year=start_date.year + 1)
                else:
                    target_date = target_date.replace(month=start_date.month + 1)


            result_dates.append(target_date)

        return min(result_dates)
        
        
        
    
    
    
    
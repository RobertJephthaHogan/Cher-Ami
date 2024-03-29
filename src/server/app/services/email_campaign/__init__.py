from datetime import datetime, timezone
from bson import ObjectId
from app.database.email_campaign_operations import EmailCampaignOperations
from app.services.email import EmailService
from app.database.contact_list_operations import ContactListOperations
from app.database.user_operations import UserOperations
from app.database.scheduled_service_operations import ScheduledServiceOperations
from app.models.ScheduledService import ScheduledService
from app.helpers import Helpers
from app.services.scheduled_service.scheduler import ServiceScheduler






class EmailCampaignService:
    
    
    async def create_email_campaign(self, campaign_data):
        
        # Create the emailCampaign entry in db no matter what, then change status accordingly
        new_email_campaign = await EmailCampaignOperations.add_email_campaign(campaign_data)
                
        campaign_frequency_type = campaign_data.frequency.get('frequencyType')
        
        if campaign_frequency_type == 'oneTime':
            
            shouldSendInitial = campaign_data.frequency.get('sendOtInitial')
            
            if shouldSendInitial:
                # send the one time email campaign immediately
                try:
                    result = await self.dispatch_email_campaign(campaign_data)
                    # Once the Campaign is sent to recipients, set status to 'sent'
                    await Helpers.set_email_campaign_sent(campaign_data.id, result)
                except Exception as ex:
                    print('ex', ex)
                    # If an error happens while dispatching the email campaign, set status to 'error'
                    await Helpers.set_email_campaign_error(campaign_data.id, ex)
                
            
            if not shouldSendInitial:
                # Schedule the one time email campaign
                scheduled_campaign = await self.schedule_email_campaign(campaign_data)
            
            
        
        if campaign_frequency_type == 'recurring':
            
            shouldSendInitial = campaign_data.frequency['recurrence']['sendRecInitial']
            
            if shouldSendInitial:
                
                try:
                    # send the one time email campaign immediately
                    result = await self.dispatch_email_campaign(campaign_data)

                    # set the campaign status to 'active'
                    await Helpers.set_email_campaign_active(campaign_data.id, result)
                    
                    # schedule the next occurrence of the campaign
                    await ServiceScheduler.schedule_next_campaign_occurrence('email', campaign_data)
                    
                    
                except Exception as ex:
                    print('ex', ex)
                    # If an error happens while dispatching the email campaign, set status to 'error'
                    await Helpers.set_email_campaign_error(campaign_data.id, ex)
                
                # then schedule the next occurrence of the campaign
                
            
            if not shouldSendInitial:
                # schedule the first occurrence of the campaign after the start date
                try:
                    await ServiceScheduler.schedule_initial_campaign_occurrence('email', campaign_data)
                    
                    # set the campaign status to 'scheduled'
                    await Helpers.set_email_campaign_scheduled(campaign_data.id)
                except Exception as ex:
                    print('ex', ex)
                    # If an error happens while scheduling the initial the email campaign, set status to 'error'
                    await Helpers.set_email_campaign_error(campaign_data.id, ex)
                    
        
        return new_email_campaign
    
    
    async def schedule_email_campaign(self, campaign_data):

        service_time = datetime.fromisoformat(campaign_data.frequency.get('sendDate')).astimezone(timezone.utc)
        
        dto = {
            'id': str(ObjectId()),
            'action': 'send-scheduled-one-time-email-campaign',
            'createdByUserId': campaign_data.createdByUserId,
            'target_id': campaign_data.id,
            'executed': False,
            'status': {
                    'title': 'pending',
                    'data': {},
                    },
            'time': service_time
        }
                
        ss_instance = ScheduledService(**dto)
                
        scheduled_campaign = await ScheduledServiceOperations.add_scheduled_service(ss_instance)
        
        # update the campaign status to 'scheduled' once scheduled
        await Helpers.set_email_campaign_scheduled(campaign_data.id)
                
        return {}
    
    
    
    async def dispatch_email_campaign(self, campaign_data):
                
        # get all of the contactListIDs from the campaign_data
        contact_list_ids = campaign_data.recipientContactLists
        
        # pull the contact lists from the database
        contact_lists = []
        
        for cl_id in contact_list_ids:
            contact_list = await ContactListOperations.retrieve_contact_list(cl_id)
            contact_lists.append(contact_list)
                    
        # Aggregate all recipients into one list
        recipients = []
        
        for cl in contact_lists:
            new_contacts = cl.file
            recipients.extend(new_contacts)
        
                
        # send an email to each of the contacts in this list and record the response
                
        user_data = await UserOperations.retrieve_user(campaign_data.createdByUserId)        
        
        emailSender = campaign_data.sendFromEmail
        emailSubject = campaign_data.emailSubject
        emailPassword = None
        emailBody = campaign_data.emailBody
        createdByUserId = campaign_data.createdByUserId
        
        user_send_from_email_data = next((item for item in user_data.sendFromEmailAddresses if item["emailAddress"] == emailSender), None)
        emailPassword = user_send_from_email_data['emailAddressPassword']
        
        results = []
        
        for recipient in recipients:
            
            email_data = {
                #id: null,
                "emailSender": emailSender,
                "emailSubject": emailSubject,
                "emailRecipient": recipient['email'],
                "emailPassword": emailPassword,
                "body": emailBody,
                "createdByUserId": createdByUserId,
                "time": datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
            }
            
            result = await EmailService(**email_data).sendEmail()
            results.append(result)
            
        # store dispatch results in the campaigns status object
        def count_statuses(data_list):
            success_count = 0
            error_count = 0

            for item in data_list:
                status = item.get('status', None)
                if status == 'success':
                    success_count += 1
                elif status == 'error':
                    error_count += 1

            return {
                'successes': success_count, 
                'errors': error_count
            }
                
        status_data = {
            'info': count_statuses(results),
        }
        
        return status_data
    
    
    
    async def get_email_campaign_history(campaign_id):
        print('campaign_id', campaign_id)
        pass
    
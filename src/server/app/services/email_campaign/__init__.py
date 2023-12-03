from datetime import datetime
from app.database.email_campaign_operations import EmailCampaignOperations
from app.services.email import EmailService
from app.database.contact_list_operations import ContactListOperations
from app.database.user_operations import UserOperations






class EmailCampaignService:
    
    
    
    
    async def create_one_time_email_campaign(self, campaign_data):
        
        # Create the emailCampaign entry in db no matter what, then change status accordingly
        new_email_campaign = await EmailCampaignOperations.add_email_campaign(campaign_data)
        
        # After email campaign is created, Check if send initial is true
        shouldSendInitial = campaign_data.frequency.get('sendOtInitial')
        
        if shouldSendInitial:
            # send the one time email campaign immediately
            # send all the emails and store results in status object
            try:
                result = await self.dispatchEmailCampaign(campaign_data)
            except Exception as ex:
                # If an error happens while dispatching the email campaign, set status to 'error'
                db_campaign = await EmailCampaignOperations.retrieve_email_campaign(campaign_data.id)   
                edited = db_campaign.__dict__
                edited['status']['title'] = 'error'
                updated_campaign = await EmailCampaignOperations.update_email_campaign_data(campaign_data.id, edited)
            
            
        
        if not shouldSendInitial:
            print('Schedule the email to be sent')
            print('by adding an entry to the schedules services table')
            
            # Schedule the one time email campaign
            # then update the status data of the email campaign in the db
        
        
        
        return new_email_campaign
    
    
    
    
    async def dispatchEmailCampaign(self, campaign_data):
        
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
        emailPassword = 'None'
        emailBody = campaign_data.emailBody
        createdByUserId = campaign_data.createdByUserId
        
        user_send_from_email_data = next((item for item in user_data.sendFromEmailAddresses if item["emailAddress"] == emailSender), None)
        emailPassword = user_send_from_email_data['emailAddressPassword']
        
        results = []
        
        for recipient in recipients:
            
            email_data = {
                #id: null,
                "emailSender": emailSender,
                "emailRecipient": recipient['email'],
                "emailPassword": emailPassword,
                "body": emailBody,
                "createdByUserId": createdByUserId,
                "time": datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
            }
            
            result = EmailService(**email_data).sendEmail()
            results.append(result)
        
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
                
        statusData = {
            'info': count_statuses(results),
            'results': results
        }

        # Once the Campaign is sent to recipients, set status to 'sent'
        db_campaign = await EmailCampaignOperations.retrieve_email_campaign(campaign_data.id)   
        edited = db_campaign.__dict__
        edited['status']['title'] = 'sent'
        edited['status']['data'] = statusData
        updated_campaign = await EmailCampaignOperations.update_email_campaign_data(campaign_data.id, edited)

        print('results', results)        
        
        return {}
    
    
    
    pass
    
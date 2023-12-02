from app.database.email_campaign_operations import EmailCampaignOperations






class EmailCampaignService:
    
    
    
    
    async def create_one_time_email_campaign(campaign_data):
        
        # Create the emailCampaign entry in db no matter what, then change status accordingly
        new_email_campaign = await EmailCampaignOperations.add_email_campaign(campaign_data)
        
        # After email campaign is created, Check if send initial is true
        shouldSendInitial = campaign_data.frequency.get('sendOtInitial')
        
        if shouldSendInitial:
            print('Should Send Initial')
            # send the one time email campaign immediately
            # then update the status data of the email campaign in the db
            
        
        if not shouldSendInitial:
            print('Schedule the email to be sent')
            print('by adding an entry to the schedules services table')
            
            # Schedule the one time email campaign
            # then update the status data of the email campaign in the db
        
        
        
        return new_email_campaign
    
    
    
    pass
    
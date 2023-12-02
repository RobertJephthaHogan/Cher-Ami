from app.database.email_campaign_operations import EmailCampaignOperations






class EmailCampaignService:
    
    
    
    
    async def create_one_time_email_campaign(campaign_data):
        
        # Need to create the emailCampaign no matter what
        # after email campaign is created, start checking if send initial is true
        # send the one time email campaign, then update the status of the email campaign in the db
        
        print('campaign_data', campaign_data)
        
        new_email_campaign = await EmailCampaignOperations.add_email_campaign(campaign_data)
        
        return new_email_campaign
    
    
    
    pass
    
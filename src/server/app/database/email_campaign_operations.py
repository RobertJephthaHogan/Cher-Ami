from beanie import PydanticObjectId
from pydantic import ValidationError
from typing import List, Union
from bson import ObjectId


from app.models.EmailCampaign import EmailCampaign, UpdateEmailCampaignModel


email_campaign_collection = EmailCampaign

class EmailCampaignOperations:

    async def add_email_campaign(new_email_campaign: EmailCampaign) -> EmailCampaign:
        new_email_campaign.id = str(ObjectId())
        email_campaign = await new_email_campaign.create()
        return email_campaign


    async def retrieve_all_email_campaigns() -> List[EmailCampaign]:
        email_campaigns = await email_campaign_collection.all().to_list()
        return email_campaigns

    
    async def retrieve_email_campaigns_for_user(user_id) -> List[EmailCampaign]:
        print('user_id', user_id)
        email_campaigns = await email_campaign_collection.find(EmailCampaign.createdByUserId == user_id).to_list()
        return email_campaigns


    async def retrieve_email_campaign(id: EmailCampaign) -> EmailCampaign:
        email_campaign = await email_campaign_collection.get(str(id))
        if email_campaign:
            return email_campaign
        

    async def delete_email_campaign(id: PydanticObjectId) -> bool:
        try:
            email_campaign = await email_campaign_collection.get(str(id))
        except ValidationError as e:
            print(e.json())
        if email_campaign:
            await email_campaign.delete()
            return True


    async def update_email_campaign_data(id: PydanticObjectId, data: dict) -> Union[bool, EmailCampaign]:
        des_body = {k: v for k, v in data.items() if v is not None}
        update_query = {"$set": {
            field: value for field, value in des_body.items()
        }}
        email_campaign = await email_campaign_collection.get(str(id))
        if email_campaign:
            await email_campaign.update(update_query)
            return email_campaign
        return False


from beanie import PydanticObjectId
from pydantic import ValidationError
from typing import List, Union
from bson import ObjectId


from app.models.RecurringEmailCampaign import RecurringEmailCampaign, UpdateRecurringEmailCampaignModel


recurring_email_campaign_collection = RecurringEmailCampaign

class RecurringEmailCampaignOperations:

    async def add_recurring_email_campaign(new_email_campaign: RecurringEmailCampaign) -> RecurringEmailCampaign:
        new_email_campaign.id = str(ObjectId())
        email_campaign = await new_email_campaign.create()
        return email_campaign


    async def retrieve_all_recurring_email_campaigns() -> List[RecurringEmailCampaign]:
        email_campaigns = await recurring_email_campaign_collection.all().to_list()
        return email_campaigns

    
    async def retrieve_recurring_email_campaigns_for_user(user_id) -> List[RecurringEmailCampaign]:
        email_campaigns = await recurring_email_campaign_collection.find(RecurringEmailCampaign.createdByUserId == user_id).to_list()
        return email_campaigns


    async def retrieve_recurring_email_campaign(id: RecurringEmailCampaign) -> RecurringEmailCampaign:
        email_campaign = await recurring_email_campaign_collection.get(str(id))
        if email_campaign:
            return email_campaign
        

    async def delete_recurring_email_campaign(id: PydanticObjectId) -> bool:
        try:
            email_campaign = await recurring_email_campaign_collection.get(str(id))
        except ValidationError as e:
            print(e.json())
        if email_campaign:
            await email_campaign.delete()
            return True


    async def update_recurring_email_campaign_data(id: PydanticObjectId, data: dict) -> Union[bool, RecurringEmailCampaign]:
        des_body = {k: v for k, v in data.items() if v is not None}
        update_query = {"$set": {
            field: value for field, value in des_body.items()
        }}
        email_campaign = await recurring_email_campaign_collection.get(str(id))
        if email_campaign:
            await email_campaign.update(update_query)
            return email_campaign
        return False


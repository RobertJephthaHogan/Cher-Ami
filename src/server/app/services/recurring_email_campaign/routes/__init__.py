import json
from fastapi import APIRouter, Body
from beanie import PydanticObjectId
from app.models.Response import Response
from app.database.recurring_email_campaign_operations import RecurringEmailCampaignOperations
from app.models.RecurringEmailCampaign import RecurringEmailCampaign, UpdateRecurringEmailCampaignModel
from app.models.Response import Response200, Response404


router = APIRouter()

@router.get("/single/{id}", response_description="Recurring Email Campaign data retrieved", response_model=Response)
async def get_recurring_email_campaign_data(id: PydanticObjectId):
    email_campaign = await RecurringEmailCampaignOperations.retrieve_recurring_email_campaign(id)
    if email_campaign:
        return {
            "status_code": 200,
            "response_type": "success",
            "description": "Recurring Email Campaign data retrieved successfully",
            "data": email_campaign
        }
    return {
        "status_code": 404,
        "response_type": "error",
        "description": "Recurring Email Campaign doesn't exist",
    }

@router.get("/user/{user_id}", response_description="Recurring Email Campaign data retrieved", response_model=Response)
async def get_recurring_email_campaigns_for_user(user_id):
    email_campaigns = await RecurringEmailCampaignOperations.retrieve_recurring_email_campaigns_for_user(user_id)
    schData = RecurringEmailCampaign.schema()
    try:
        schData['properties'].pop('revision_id')
    except KeyError as ex:
        print('err', ex)
    dto = {
        "queryResult" : email_campaigns,
        "schema": schData
    }
    if email_campaigns:
        response = Response200()
        response.data = dto
        return json.loads(response.json())
    response = Response404()
    response.data = dto
    return json.loads(response.json())

@router.get("/get_all", response_description="Recurring Email Campaign data retrieved", response_model=Response)
async def get_recurring_email_campaigns():
    email_campaigns = await RecurringEmailCampaignOperations.retrieve_all_recurring_email_campaigns()
    if email_campaigns:
        return {
            "status_code": 200,
            "response_type": "success",
            "description": "Recurring Email Campaigns retrieved successfully",
            "data": email_campaigns
        }
    return {
        "status_code": 404,
        "response_type": "error",
        "description": "No Recurring Email Campaigns exist",
    }


@router.post("/new", response_description="Recurring Email Campaign data added into the database", response_model=Response)
async def add_recurring_email_campaign_data(email_campaign: RecurringEmailCampaign = Body(...)):
    new_email_campaign = await RecurringEmailCampaignOperations.add_recurring_email_campaign(email_campaign)
    return {
        "status_code": 200,
        "response_type": "success",
        "description": "Recurring Email Campaign created successfully",
        "data": new_email_campaign
    }


@router.delete("/{id}", response_description="Recurring Email Campaign data deleted from the database")
async def delete_recurring_email_campaign_data(id: PydanticObjectId):
    deleted_email_campaign = await RecurringEmailCampaignOperations.delete_recurring_email_campaign(id)
    if deleted_email_campaign:
        return {
            "status_code": 200,
            "response_type": "success",
            "description": "Recurring Email Campaign with ID: {} removed".format(id),
            "data": deleted_email_campaign
        }
    return {
        "status_code": 404,
        "response_type": "error",
        "description": "Recurring Email Campaign with id {0} doesn't exist".format(id),
        "data": False
    }


@router.put("/{id}", response_model=Response)
async def update_recurring_email_campaign(id: PydanticObjectId, req: UpdateRecurringEmailCampaignModel = Body(...)):
    updated_email_campaign = await RecurringEmailCampaignOperations.update_recurring_email_campaign_data(id, req.dict())
    if updated_email_campaign:
        return {
            "status_code": 200,
            "response_type": "success",
            "description": "Recurring Email Campaign with ID: {} updated".format(id),
            "data": updated_email_campaign
        }
    return {
        "status_code": 404,
        "response_type": "error",
        "description": "An error occurred. Recurring Email Campaign with ID: {} not found".format(id),
        "data": False
    }

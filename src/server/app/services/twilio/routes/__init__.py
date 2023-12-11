from fastapi import Body, APIRouter, HTTPException
from passlib.context import CryptContext
from beanie import PydanticObjectId
from app.models.Response import Response
import os
from twilio.rest import Client

router = APIRouter()

hash_helper = CryptContext(schemes=["bcrypt"])


class TwilioRouter:
    
    
    @router.get("/test", response_description="Test Twilio", response_model=Response)
    async def testEmail():
        
        account_sid = os.environ['TWILIO_ACCOUNT_SID']
        auth_token = os.environ['TWILIO_AUTH_TOKEN']
        client = Client(account_sid, auth_token)
        accounts = client.api.v2010.accounts.list(limit=20)
        sub_accounts = []

        for record in accounts:
            account = client.api.accounts(record.sid).fetch()
            sub_accounts.append(account.__dict__)
            
        return {
                "status_code": 200,
                "response_type": "success",
                "description": "Email sent successfully",
                "data": sub_accounts
            }
        
        
    @router.get("/get_all_sub_accounts", response_description="Getting All Twilio SubAccounts", response_model=Response)
    async def get_all_sub_accounts():
        
        # TODO: Integrate Twilio user account information into system User model
        # Then proceed to build this service out taking in the users id
        # and finding the matching twilio credentials in the db 
        
        account_sid = os.environ['TWILIO_ACCOUNT_SID']
        auth_token = os.environ['TWILIO_AUTH_TOKEN']
        client = Client(account_sid, auth_token)
        accounts = client.api.v2010.accounts.list(limit=20)
        sub_accounts = []

        for record in accounts:
            account = client.api.accounts(record.sid).fetch()
            sub_accounts.append(account.__dict__)
            
        return {
                "status_code": 200,
                "response_type": "success",
                "description": "Email sent successfully",
                "data": sub_accounts
            }
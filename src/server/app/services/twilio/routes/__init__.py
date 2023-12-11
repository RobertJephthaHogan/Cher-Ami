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
        
        print('Testing TWILIO')
        
        # Find your Account SID and Auth Token at twilio.com/console
        # and set the environment variables. See http://twil.io/secure
        account_sid = os.environ['TWILIO_ACCOUNT_SID']
        auth_token = os.environ['TWILIO_AUTH_TOKEN']
        client = Client(account_sid, auth_token)

        accounts = client.api.v2010.accounts.list(limit=20)
        
        sub_accounts = []

        for record in accounts:
            print(record.sid)
            account = client.api.accounts(record.sid).fetch()
            print('account', account.__dict__)
            sub_accounts.append(account.__dict__)

            
        return {
                "status_code": 200,
                "response_type": "success",
                "description": "Email sent successfully",
                "data": sub_accounts
            }
from fastapi import Body, APIRouter, HTTPException
from passlib.context import CryptContext
from beanie import PydanticObjectId
from app.models.Email import UpdateEmailModel, Email
from app.models.Response import Response
from app.database import DatabaseOperations
from .. import EmailService


router = APIRouter()

hash_helper = CryptContext(schemes=["bcrypt"])


class EmailRouter:
    
    
    @router.get("/test", response_description="Test sending and email", response_model=Response)
    async def testEmail():
        
        result = EmailService.testSendEmail()
        
        if not result:
            # If there are no errors, the dictionary should be empty
            return {
                "status_code": 200,
                "response_type": "success",
                "description": "Email sent successfully",
                "data": result
            }
        else:
            # result will contain error data if errors are present
            return {
                "status_code": 500,
                "response_type": "error",
                "description": "Email could not be sent",
                "data": result
            }
        
    
    @router.post("/send", response_model=Response)
    async def send_email(email: Email = Body(...)):
                        
        result = await EmailService(**vars(email)).sendEmail()
        
        # TODO: decrypt password once encryption implemented
        
        if not result:
            # If there are no errors, the dictionary should be empty
            return {
                "status_code": 200,
                "response_type": "success",
                "description": "Email sent successfully",
                "data": result
            }
        else:
            # result will contain error data if errors are present
            return {
                "status_code": 500,
                "response_type": "error",
                "description": "Email could not be sent",
                "data": result
            }
        
        return {
                "status_code": 200,
                "response_type": "success",
                "description": "Email sent successfully",
                "data": email
            }

    
    
    pass
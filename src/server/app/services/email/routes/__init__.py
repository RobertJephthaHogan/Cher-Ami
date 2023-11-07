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
        
        result = EmailService.sendEmail()
        print('result', result)
        
        if not result:
            print("Dictionary is empty.")
            return {
                "status_code": 200,
                "response_type": "success",
                "description": "Email sent successfully",
                "data": result
            }
        else:
            print("Dictionary is not empty.")
            return {
                "status_code": 500,
                "response_type": "error",
                "description": "Email could not be sent",
                "data": result
            }
        
    
    
    @router.post("/send", response_model=Response)
    async def send_email(email: Email = Body(...)):
        
        print('email', email)
        
        result = EmailService(**vars(email)).sendEmail()
        print('result', result)
        
        # email.password = hash_helper.encrypt(email.password)
        # new_email = await DatabaseOperations.EmailOperations.add_email(email)
        # print('new_email', new_email)
        # return new_email
        return {
                "status_code": 200,
                "response_type": "success",
                "description": "Email sent successfully",
                "data": email
            }

    
    
    pass
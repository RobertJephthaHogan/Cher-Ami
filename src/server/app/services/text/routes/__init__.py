from fastapi import Body, APIRouter, HTTPException
from passlib.context import CryptContext
from beanie import PydanticObjectId
from app.models.Text import UpdateTextModel, Text
from app.models.Response import Response
from app.database import DatabaseOperations
from .. import TextService


router = APIRouter()

hash_helper = CryptContext(schemes=["bcrypt"])


class TextRouter:
    
    
    @router.get("/test", response_description="Test sending text", response_model=Response)
    async def test_text():
        
        result = TextService().test_send_text()
        
        if not result:
            # If there are no errors, the dictionary should be empty
            return {
                "status_code": 200,
                "response_type": "success",
                "description": "Text sent successfully",
                "data": result
            }
        else:
            # result will contain error data if errors are present
            return {
                "status_code": 500,
                "response_type": "error",
                "description": "Text could not be sent",
                "data": result
            }
        
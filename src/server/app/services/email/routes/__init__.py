from fastapi import Body, APIRouter, HTTPException
from beanie import PydanticObjectId
from app.models.User import UpdateUserModel, User, UserData, UserSignIn
from app.models.Response import Response
from .. import EmailService


router = APIRouter()

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
        
        # user = await DatabaseOperations.UserOperations.retrieve_user(id)
        # if user:
        #     return {
        #         "status_code": 200,
        #         "response_type": "success",
        #         "description": "User data retrieved successfully",
        #         "data": user
        #     }
        # return {
        #     "status_code": 200,
        #     "response_type": "success",
        #     "description": "User doesn't exist",
        #     "data": {}
        # }

    
    
    # @router.post("/send", response_model=Response)
    # async def user_signup(user: User = Body(...)):
    #     user_exists = await User.find_one(User.email == user.email)
    #     if user_exists:
    #         raise HTTPException(
    #             status_code=409,
    #             detail="User with email supplied already exists"
    #         )
    #     user.password = hash_helper.encrypt(user.password)
    #     new_user = await DatabaseOperations.UserOperations.add_user(user)
    #     print('new_user', new_user)
    #     return new_user

    
    
    pass
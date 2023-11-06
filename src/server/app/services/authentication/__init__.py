from .jwt_bearer import JWTBearer, verify_jwt
from .jwt_handler import JWTHandler



class AuthenticationService:
    
    class JWTHandler(JWTHandler):
        pass

    class JWTBearer(JWTBearer):
        pass
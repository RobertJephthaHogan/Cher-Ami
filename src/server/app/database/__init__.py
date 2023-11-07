from .user_operations import UserOperations
from .email_operations import EmailOperations


class DatabaseOperations:

    class UserOperations(UserOperations):
        pass
    
    class EmailOperations(EmailOperations):
        pass
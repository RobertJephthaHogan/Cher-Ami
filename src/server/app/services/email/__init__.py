import os
from dotenv import load_dotenv

# Load the environment variables
load_dotenv()


class EmailService:
    
    
    def sendEmail():
        
        email_sender = 'contact.rjh.ventures@gmail.com'
        email_password = os.getenv("GMAIL_TFA_PASSWORD")
        email_receiver = 'robertjephthahogan@gmail.com'
        
        subject = 'This is the email subject'
        
        body = """
        This is the body of the email content. Modify this to see changes!
        """
        
        print("Sending Email")
    
    pass
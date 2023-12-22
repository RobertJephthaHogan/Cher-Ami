import os
from dotenv import load_dotenv
from twilio.rest import Client


# Load the environment variables
load_dotenv()

class TextService:
    
    def __init__(self, **kwargs):
        self.kwargs = kwargs
        
        
    def test_send_text(self):
        
        account_sid = os.environ['TWILIO_ACCOUNT_SID']
        auth_token = os.environ['TWILIO_AUTH_TOKEN']
        client = Client(account_sid, auth_token)

        message = client.messages \
                        .create(
                            body = "It worked.",
                            from_ = os.environ['TWILIO_SENDER_TEST_PHONE_NUMBER'],
                            to = os.environ['TWILIO_RECEIVER_TEST_PHONE_NUMBER'],
                        )

        print(message.sid)
        

        

    
    
    
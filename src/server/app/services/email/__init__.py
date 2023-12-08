import os
from dotenv import load_dotenv
from email.message import EmailMessage
import ssl
import smtplib
from bson import ObjectId
from app.database.email_operations import EmailOperations
from app.models.Email import Email



# Load the environment variables
load_dotenv()


class EmailService:
    
    def __init__(self, **kwargs):
        self.kwargs = kwargs

            
            
    def testSendEmail(self):
                
        email_sender = 'contact.rjh.ventures@gmail.com'
        email_password = os.getenv("GMAIL_TFA_PASSWORD")
        email_receiver = 'robertjephthahogan@gmail.com'
        
        subject = 'This is the email subject'
        
        body = """
        This is the body of the email content. It worked!
        """
        
        print("Sending Email")
        
        em = EmailMessage()
        em['From'] = email_sender
        em['To'] = email_receiver
        em['Subject'] = subject
        em.set_content(body)
        
        context = ssl.create_default_context()
        
        with smtplib.SMTP_SSL('smtp.gmail.com', 465, context=context) as smtp:
            try:
                smtp.login(email_sender, email_password)
                resp = smtp.sendmail(email_sender, email_receiver, em.as_string())
                return resp
            except Exception as e:
                print('error', e)
                return {'error': e}
            
            
    async def sendEmail(self):
                        
        email_sender = self.kwargs['emailSender']
        email_password = self.kwargs['emailPassword']
        email_receiver = self.kwargs['emailRecipient']
        created_by_user_id = self.kwargs['createdByUserId']
        subject = 'This is the email subject'
        body = self.kwargs['body']
        time = self.kwargs['time']
        
        # Create Email Message context
        em = EmailMessage()
        em['From'] = email_sender
        em['To'] = email_receiver
        em['Subject'] = subject
        em.set_content(body)
        
        context = ssl.create_default_context()
        
        
        db_dto = {
            'id': str(ObjectId()),
            'createdByUserId': created_by_user_id,
            'emailSender': email_sender,
            'emailRecipient': email_receiver,
            'body': body,
            'time': time
        }
        
        email_obj = Email(**db_dto)
        
        with smtplib.SMTP_SSL('smtp.gmail.com', 465, context=context) as smtp:
            try:
                smtp.login(email_sender, email_password)
                resp = smtp.sendmail(email_sender, email_receiver, em.as_string())
                try: 
                    await EmailOperations.add_email(email_obj)
                except Exception as e:
                    print('ex', e)
                return {
                    'status': 'success',
                    'data': resp
                }
            except Exception as e:
                print('error', e)
                return {
                    'status': 'error',
                    'data': e
                }
                       
    
    
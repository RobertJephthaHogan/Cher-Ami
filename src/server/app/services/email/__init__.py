import os
from dotenv import load_dotenv
from email.message import EmailMessage
import ssl
import smtplib

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
        
        em = EmailMessage()
        em['From'] = email_sender
        em['To'] = email_receiver
        em['Subject'] = subject
        em.set_content(body)
        
        context = ssl.create_default_context()
        
        with smtplib.SMTP_SSL('smtp.gmail.com', 465, context=context) as smtp:
            smtp.login(email_sender, email_password)
            smtp.sendmail(email_sender, email_receiver, em.as_string())
        
    
    pass
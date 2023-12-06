from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.services.scheduled_service import ScheduledServiceService
from .config import initiate_database

from app.services.user.routes import router as UserRouter
from app.services.email.routes import router as EmailRouter
from app.services.contact.routes import router as ContactRouter
from app.services.contact_list.routes import router as ContactListRouter
from app.services.email_campaign.routes import router as EmailCampaignRouter
from app.services.scheduled_service.routes import router as ScheduledServiceRouter

# Create the App
app = FastAPI()

# Apply CORS Middleware / Allow Origins
origins = [ 
           'http://localhost:3000',
           'http://localhost:3005',
           'https://cher-ami.roberthogan.io',
           'https://www.cher-ami.roberthogan.io' 
        ]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials= True,
    allow_methods=['*'],
    allow_headers=['*'],
)


# Start Up Events
@app.on_event("startup")
async def startup_event():
    print("Starting Server...")
    print("Initiating Database...")
    await initiate_database()
    print("Database Initiated")
    print("Starting Service Scheduler...")
    ScheduledServiceService().startScheduler()
    print("Service Scheduler Started")
    
@app.on_event("shutdown")
def shutdown_event():
    ScheduledServiceService().shutdownScheduler()

# Root Render
@app.get("/", tags=["Root"])
async def read_root():
    return {"message": "Hello Cher-Ami."}



# Add service routers to app router
app.include_router(UserRouter, tags=["User"], prefix="/user")
app.include_router(EmailRouter, tags=["Email"], prefix="/email")
app.include_router(ContactRouter, tags=["Contact"], prefix="/contact")
app.include_router(ContactListRouter, tags=["Contact List"], prefix="/contact_list")
app.include_router(EmailCampaignRouter, tags=["Email Campaign"], prefix="/email_campaign")
app.include_router(ScheduledServiceRouter, tags=["Scheduled Service"], prefix="/scheduled_service")

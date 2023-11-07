from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .config import initiate_database

from app.services.user.routes import router as UserRouter
from app.services.email.routes import router as EmailRouter


# Create the App
app = FastAPI()

# Apply CORS Middleware / Allow Origins
origins = [ 
           'http://localhost:3000',
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
    await initiate_database()
    print("Starting Server...")


# Root Render
@app.get("/", tags=["Root"])
async def read_root():
    return {"message": "Hello Cher-Ami."}




app.include_router(UserRouter, tags=["User"], prefix="/user")
app.include_router(EmailRouter, tags=["Email"], prefix="/email")
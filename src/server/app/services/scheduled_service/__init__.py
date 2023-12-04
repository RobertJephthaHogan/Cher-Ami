from fastapi import FastAPI, BackgroundTasks
from apscheduler.schedulers.asyncio  import AsyncIOScheduler
from datetime import datetime
from app.database.scheduled_service_operations import ScheduledServiceOperations


# Mock data
mocked_scheduled_services = [
    {"id": 1, "date_time": "2023-12-02 10:30:00", "action": "send_email"},
]


class ScheduledServiceService: # as agonizing as this class name is, I'll continue to follow the convention I have been 
    
    def startScheduler(self):
        scheduler = AsyncIOScheduler()
        scheduler.add_job(self.check_scheduled_tasks, "interval", seconds=10)  # Check every 10 seconds
        scheduler.start()
        
    def perform_scheduled_task(self, service_id: int, action: str):
        # Implement your scheduled task logic here
        print(f"Performing task for service {service_id}: {action} at {datetime.now()}")

    async def check_scheduled_tasks(self):
        
        current_time = datetime.now()
        
        scheduled_services = await ScheduledServiceOperations.retrieve_all_scheduled_services()
        
        print('scheduled_services', scheduled_services)
        
        for service in mocked_scheduled_services:
            task_time = datetime.strptime(service["date_time"], "%Y-%m-%d %H:%M:%S")
            if current_time >= task_time:
                self.perform_scheduled_task(service["id"], service["action"])
    
    def shutdownScheduler(self):
        scheduler = AsyncIOScheduler()
        scheduler.shutdown()
        
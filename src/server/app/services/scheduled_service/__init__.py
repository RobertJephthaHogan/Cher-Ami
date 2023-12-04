from fastapi import FastAPI, BackgroundTasks
from apscheduler.schedulers.background import BackgroundScheduler
from datetime import datetime
import time


# Mock data
scheduled_services = [
    {"id": 1, "date_time": "2023-12-02 10:30:00", "action": "send_email"},
]


class ScheduledServiceService: # as agonizing as this class name is, I'll continue to follow the convention I have been 
    
    def startScheduler(self):
        scheduler = BackgroundScheduler()
        scheduler.add_job(self.check_scheduled_tasks, "interval", seconds=10)  # Check every 10 seconds
        scheduler.start()
        
    def perform_scheduled_task(self, service_id: int, action: str):
        # Implement your scheduled task logic here
        print(f"Performing task for service {service_id}: {action} at {datetime.now()}")

    def check_scheduled_tasks(self):
        current_time = datetime.now()
        for service in scheduled_services:
            task_time = datetime.strptime(service["date_time"], "%Y-%m-%d %H:%M:%S")
            if current_time >= task_time:
                self.perform_scheduled_task(service["id"], service["action"])
    
    def shutdownScheduler(self):
        scheduler = BackgroundScheduler()
        scheduler.shutdown()
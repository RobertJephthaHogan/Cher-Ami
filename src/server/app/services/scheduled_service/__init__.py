from fastapi import FastAPI, BackgroundTasks
from apscheduler.schedulers.asyncio  import AsyncIOScheduler
from datetime import datetime, timezone
from app.database.scheduled_service_operations import ScheduledServiceOperations
from app.database.email_campaign_operations import EmailCampaignOperations
from app.services.email_campaign import EmailCampaignService




class ScheduledServiceService: # as agonizing as this class name is, I'll continue to follow the convention I have been 
    
    def startScheduler(self):
        scheduler = AsyncIOScheduler()
        scheduler.add_job(self.check_scheduled_tasks, "interval", seconds=10)  # Check every 10 seconds
        scheduler.start()
        
    async def perform_scheduled_task(self, service_id: int, action: str, target_id: str):
        
        print(f"Performing task for service {service_id}: {action} at {datetime.now()}")
        
        if action == 'send-scheduled-one-time-email-campaign':

            # get email campaign data from db using target_id
            ec_to_send = await EmailCampaignOperations.retrieve_email_campaign(target_id)
            
            # send the campaign
            try:
                c = await EmailCampaignService().dispatchEmailCampaign(ec_to_send)
                
                # after sending successfully, update the scheduled service to executed
                executed_service = await ScheduledServiceOperations.retrieve_scheduled_service(service_id)
                edited = executed_service.__dict__
                edited['executed'] = True
                edited['status']['title'] = 'executed'
                edited['status']['data'] = {}
                updated_service = await ScheduledServiceOperations.update_scheduled_service_data(service_id, edited)
                
            except Exception as ex:
                print('ex', ex)
                # If an error happens while dispatching the email campaign, set email campaign status to 'error'
                db_campaign = await EmailCampaignOperations.retrieve_email_campaign(ec_to_send.id)   
                edited = db_campaign.__dict__
                edited['status']['title'] = 'error'
                edited['status']['data'] = ex
                updated_campaign = await EmailCampaignOperations.update_email_campaign_data(ec_to_send.id, edited)
                
                # If an error happens while dispatching the scheduled email campaign, set scheduled service status to 'error'
                executed_service = ScheduledServiceOperations.retrieve_scheduled_service(service_id)
                edited = db_campaign.__dict__
                edited['executed'] = False
                edited['status'] = {
                    'title': 'error',
                    'data': ex,
                    },
                updated_service = await ScheduledServiceOperations.update_scheduled_service_data(edited.id, edited)
            
            
            
            
            pass    
        
        elif action == 'send-recurring-email-campaign':
            # TODO: Send recurring email campaign instance, 
            # Set executed to true for the executed scheduled service
            # schedule the next instance of the campaign if before the campaign end date
            pass

        else:
            return 'This should never fire'
        

    async def check_scheduled_tasks(self):
        
        current_time = datetime.now().astimezone(timezone.utc) # current time in utc
        
        scheduled_services = await ScheduledServiceOperations.retrieve_unexecuted_scheduled_services()
                
        for service in scheduled_services:
            task_time = service.time 
            
            # force utc compare
            current_time = current_time.replace(tzinfo=None)
            task_time = task_time.replace(tzinfo=None)
             
            is_past_task_time = current_time >= task_time         
               
            if is_past_task_time:
                await self.perform_scheduled_task(service.id, service.action, service.target_id)
        
        # Mock data
        # mocked_scheduled_services = [
        #     {"id": 1, "date_time": "2023-12-02 10:30:00", "action": "send_email"},
        # ]
                
        # for service in mocked_scheduled_services:
        #     task_time = datetime.strptime(service["date_time"], "%Y-%m-%d %H:%M:%S")
        #     if current_time >= task_time:
        #         self.perform_scheduled_task(service["id"], service["action"])
    
    def shutdownScheduler(self):
        scheduler = AsyncIOScheduler()
        scheduler.shutdown()
        
from fastapi import FastAPI, BackgroundTasks
from apscheduler.schedulers.asyncio  import AsyncIOScheduler
from datetime import datetime, timezone
from app.database.scheduled_service_operations import ScheduledServiceOperations
from app.database.email_campaign_operations import EmailCampaignOperations
from app.services.email_campaign import EmailCampaignService
from app.helpers import Helpers
from app.services.scheduled_service.scheduler import ServiceScheduler




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
                result = await EmailCampaignService().dispatchEmailCampaign(ec_to_send)
                # Once the Campaign is sent to recipients, set status to 'sent'
                await Helpers.set_email_campaign_sent(ec_to_send.id, result)
                # after sending successfully, update the scheduled service to executed
                await Helpers.set_scheduled_service_executed(service_id)
                
            except Exception as ex:
                print('ex', ex)
                # If an error happens while dispatching the email campaign, set email campaign status to 'error'
                await Helpers.set_email_campaign_error(target_id, ex)
                
                # If an error happens while dispatching the scheduled email campaign, set scheduled service status to 'error'
                await Helpers.set_scheduled_service_error(service_id, ex)
            
            
        
        elif action == 'send-recurring-email-campaign':
            # TODO: Send recurring email campaign instance, 
            
            # get email campaign data from db using target_id
            ec_to_send = await EmailCampaignOperations.retrieve_email_campaign(target_id)
             
            # send the campaign
            try:
                result = await EmailCampaignService().dispatchEmailCampaign(ec_to_send)
                
                # add the results to the existing email campaign
                await Helpers.add_results_to_email_campaign(ec_to_send, result)
                
                # after sending successfully, update the scheduled service to executed
                await Helpers.set_scheduled_service_executed(service_id)
                
                #TODO: THEN SCHEDULE THE NEXT OCCURRENCE IN THE CAMPAIGN
                await ServiceScheduler.schedule_next_campaign_occurrence('email', ec_to_send)
                
            except Exception as ex:
                print('ex', ex)
                # If an error happens while dispatching the email campaign, set email campaign status to 'error'
                await Helpers.set_email_campaign_error(target_id, ex)
                
                # If an error happens while dispatching the scheduled email campaign, set scheduled service status to 'error'
                await Helpers.set_scheduled_service_error(service_id, ex)
            

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
        
    
    def shutdownScheduler(self):
        scheduler = AsyncIOScheduler()
        scheduler.shutdown()
        
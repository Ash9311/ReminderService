const cron = require('node-cron');
const emailService = require('../services/email-service');
const sender = require('../config/emailConfig');
// 10 am every 5 minutes, we will check are there any pending emails which was expected to be sent by now and is pending

const setupJobs = () => {
    cron.schedule('*/5 * * * *',async () => {
        const response = await emailService.fetchPendingEmails();
        response.forEach((email) => {
            sender.sendBasicEmail({
                to: email.recepientmail,
                subject: email.service,
                text: email.content
            }, async(err,data) => {
                if(err){
                    console.log(err);
                }else{
                    console.log(data);
                    await emailService.updateTicket(email.id,{status:"SUCCESS"})
                }
            }
            );
        })
        console.log(response);
    })
}

module.exports = setupJobs;
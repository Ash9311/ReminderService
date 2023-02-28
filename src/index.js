const express = require('express');
const bodyParser = require('body-parser');
const {PORT} = require('./config/serverConfig')
//const { sendBasicEmail } = require('./services/email-service');

const jobs = require('./utils/job');
const cron = require('node-cron')
const TicketController = require('./controllers/ticket-controller')
const EmailService = require('./services/email-service')
const {subscribeMessage,createChannel} = require('./utils/messageQueue');
const {REMINDER_BINDING_KEY} = require('./config/serverConfig');

const setupAndStartServer = async () => {
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
   const channel = await createChannel();
   subscribeMessage(channel,EmailService.subscribeEvents,REMINDER_BINDING_KEY);
    app.post('/api/v1/tickets',TicketController.create)
    app.listen(PORT, ()=>{
        console.log(`server started at PORT ${PORT}`);
        jobs();
        // sendBasicEmail(
        //     'ashutoshmulky7@gmail.com',
        //     'ashmulky1@gmail.com',
        //     'hey sup, bro'
        // );

        cron.schedule('*/2 * * * *', () => {
            console.log('running a task every two minutes');
          });
    });
}

setupAndStartServer();
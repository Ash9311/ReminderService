const express = require('express');
const bodyParser = require('body-parser');
const {PORT} = require('./config/serverConfig')
//const { sendBasicEmail } = require('./services/email-service');
const cron = require('node-cron')
const setupAndStartServer = () => {
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.listen(PORT, ()=>{
        console.log(`server started at PORT ${PORT}`);

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
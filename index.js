const express = require('express')
const app = express();
const PlanService = require('./src/PlanService');
const planService = new PlanService();
const AddonService = require('./src/AddonService');
const addonService = new AddonService();
app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.get('/getPlan', (req, res) => {
    planService.invokePlan();
    res.send('Successly Processed the Plan Details,please check the test folder for further details');
})

app.get('/getAddon', (req, res) => {
    addonService.invokeAddon();
    res.send('Successly Processed the Addon Details,please check the test folder for further details');
})

app.listen(8000, () => {
    console.log('App listening on port 8000!')
});

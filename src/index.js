const express = require('express');
const cors = require('cors');
const https = require('https');
const http = require('http');
const fs = require('fs');
const axios = require('axios');

const app = express();

app.use(cors());
app.use(express.json());

const instance = axios.create({
    auth: {
        username: 'casilva03',
        password: 'Ca789456123*'
    }
});

app.get('/sap/purchase_requisition', (request, response) => {

    const getPurchaseRequisition = async () => {
        try {
            console.time('SAP PO Call API');
            const data = await instance.get('https://sappodev.hypera.com.br:57101/RESTAdapter/approval_center/sap/purchase_requisition?approver_username=carlos.s.silva&approval_status=0');
            console.timeEnd('SAP PO Call API');
            return data;

        } catch (error) {
            console.error(error)
        }
    }

    const data = getPurchaseRequisition().then(data => {
        return response.send(data.data);
    }).catch(error => {
        return response.status(400).send({ error: "Error" });
    });    

});

const httpServer = http.createServer(app);

httpServer.listen(3000, () => {
    console.log('HTTP Server running on port 3000');
});
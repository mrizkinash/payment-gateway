require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const path = require('path');
const midtransClient = require('midtrans-client');
const cheerio = require('cheerio');
const fs = require('fs');

const app = express();
const server = http.createServer(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/public')));

//Landing page
app.get('/', (req, res) => {
    res.redirect("/cc");
})
// Credit Card Page
app.get('/cc', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/html/creditCard.html'));
})
//CC Payment
app.post('/ccPay', (req, res) => {

    let cardNumber = req.body.ccNumber ? req.body.ccNumber : "4811111111111114";
    let exp_date = req.body.ccExp.split("/");
    let exp_month = parseInt(exp_date[0]) ? parseInt(exp_date[0]) : 2;
    let exp_year = parseInt(exp_date[1]) ? parseInt(exp_date[1]) : 2025;
    let cvv = req.body.ccCVV ? req.body.ccCVV : 123;
    let amount = parseInt(req.body.ccAmount) ? parseInt(req.body.ccAmount) : 10000;
    let token = req.body.ccToken;

    if (token) {
        let core = new midtransClient.CoreApi({
            isProduction: false, 
            serverKey: process.env.SERVERKEY,
            clientKey: process.env.CLIENTKEY,
        });

        let parameter = {
            "payment_type": "credit_card",
            "transaction_details": {
                "gross_amount": amount,
                "order_id": "cc-test-transaction-1",
            },
            "credit_card": {
                "token_id": token,
                "authentication": true,
            },
        };

        core.charge(parameter)
            .then((chargeResponse) => {
                console.log('chargeResponse: ');
                console.log(chargeResponse);
            });
    } else {
        console.log("Error obtaining token");
    }
    res.redirect('/');
})
// Virtual Account Page
app.get('/va', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/html/virtualAccount.html'));
})
// VA Payment
app.post('/vaPay', (req, res) => {
    let amount = parseInt(req.body.vaAmount) ? parseInt(req.body.vaAmount) : 10000;
    let bank = req.body.vaBank

    let core = new midtransClient.CoreApi({
        isProduction: false, 
        serverKey: process.env.SERVERKEY,
        clientKey: process.env.CLIENTKEY,
    });

    let parameter = {
        "payment_type": "bank_transfer",
        "transaction_details": {
            "gross_amount": amount,
            "order_id": "va-test-transaction-10",
        },
        "bank_transfer": {
            "bank": bank,
        },
    }

    core.charge(parameter)
        .then((chargeResponse) => {
            console.log('chargeResponse: ');
            console.log(chargeResponse);

            const buffer = fs.readFileSync(path.join(__dirname, '/public/html/virtualAccount.html'))
            const $ = cheerio.load(buffer);
            $('#vaNumber').text(`Virtual Account Number: ${chargeResponse.va_numbers[0].va_number}`);
            
            res.send($.root().html());
        });
    
    
})
// E-Wallet Page
app.get('/eWal', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/html/eWallet.html'));
})
// E-Wallet Payment
app.post('/eWalPay', (req, res) => {
    let amount = parseInt(req.body.vaAmount) ? parseInt(req.body.vaAmount) : 10000;

    let core = new midtransClient.CoreApi({
        isProduction: false, 
        serverKey: process.env.SERVERKEY,
        clientKey: process.env.CLIENTKEY,
    });

    let parameter = {
        "payment_type": "gopay",
        "transaction_details": {
            "gross_amount": amount,
            "order_id": "eWal-test-transaction-6",
        },
    }

    core.charge(parameter)
        .then((chargeResponse) => {
            console.log('chargeResponse: ');
            console.log(chargeResponse);

            const buffer = fs.readFileSync(path.join(__dirname, '/public/html/eWallet.html'))
            const $ = cheerio.load(buffer);
        
            $('#qrContainer').append(`<img src='${chargeResponse.actions[0].url}'>`);
            res.send($.root().html());
        });
})

const portNumber = process.env.PORT || 8000;
server.listen(portNumber, () => {
  console.log(`Server is Running on Port ${portNumber}`);
});

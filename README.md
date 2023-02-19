# Getting Started

## Prerequisites
* NodeJS
* Midtrans Account

## Installation
* Clone this repository
* Navigate to the cloned repository, open terminal and run ```npm install```
* Open your browser and login to your Midtrans account and look for your Client Key and Server Key in the Settings > Access Keys menu
* Create a .env file in the cloned repository with the variable ```CLIENTKEY=[Your Client Key]``` and ```SERVERKEY=[Your Server Key]``` (Recommended to use the Sandbox Environment Keys)
* Navigate to the cloned repository's public/html and enter your Client Key at the ```#midtrans-script's data-client-key```

## How to Run the Server
* Navigate to the cloned repository, open terminal and run ```npm start```
* Open your browser and go to address localhost:8000
* You should see the payment gateway page

## What it Can Do
### Credit Card Payment
By entering credit card information and the amount you need to pay, you can process (dummy) credit card payments. Must first press the "Confirm Card Data" Button before the "Process Transaction" button to get a successful transaction. Note that as of writing this, the app is not connected to a database thus causing the need to change the value of parameter.transaction_details.order_id in server.js every time you want to submit a payment (The same applies to the other payments too)

### Virtual Account Payment
By picking one of the available banks and the amount you need to pay, you can generate a virtual account number where you must transfer the money to complete your transaction

### E-Wallet (Gopay) Payment
By entering the amount you need to pay, you can generate a QR Code that you can scan to process the transaction using GoPay

## Rooms for Improvement
* Actually using a frontend framework such as React instead of raw HTML
* Connecting the app to a database to record transactions and keep track of the transaction ids (and removing the need of changing order_id every time)
* Validating and formatting of the input fields with something like AJAX, etc
* Use routers so backend app is less cluttery and easier to manage
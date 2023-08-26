import express from 'express';

const {
    MobileMoney,
    Config,
    getErrorMessageFromResponseCode
} = require("aberba/hubtel");
const app = express();



// Use your own account credentials
const secret = {
    clientId: "gsrkdvau",
    clientSecret: "xnrepyra",
    merchantAccountNumber: "0544828479"
};

const config = new Config({
    clientId: secret.clientId,
    clientSecret: secret.clientSecret,
    merchantAccountNumber: secret.merchantAccountNumber
});

const mobileMoney = new MobileMoney(config);

mobileMoney
    .receive({
        CustomerName: "Mary Doe",
        CustomerMsisdn: "05XXXXXXXX",
        CustomerEmail: "user@example.com",
        Channel: "mtn-gh",
        Amount: 7.55,
        PrimaryCallbackUrl: "https://example.com/payment_callback",
        Description: "A bowl of gari",
        ClientReference: "UniqueXXXXX21XX"
    })
    .then(responseJSON => {
        console.log(responseJSON);
        console.log(
            "Response message: ",
            getErrorMessageFromResponseCode(responseJSON.ResponseCode)
        );
    })
    .catch(err => console.log(err));

mobileMoney
    .send({
        RecipientName: "Adongo Samuel",
        RecipientMsisdn: "0503826189",
        CustomerEmail: "300ices@gmail.com.com",
        Channel: "vodafone-gh",
        Amount: 60.05,
        PrimaryCallbackUrl: "https://vercel.com/kelvinatta/savethedate-shop-api/api/callback",
        SecondaryCallbackUrl: "",
        Description: "Monthly rent payment",
        ClientReference: "65737a40-2aca-4c21-b6da-cd5a51973dcd"
    })
    .then(responseJSON => console.log(responseJSON))
    .catch(err => console.log(err));

    // Getting errors messages
console.log("Code 0000 message:", getErrorMessageFromResponseCode("0000"));

// Cool guys use fat arrows, async and await from ES6 ;)
const payUsualBills = async ClientReference => {
    const paymentData = {
        RecipientName: "Tax tax tax!!",
        RecipientMsisdn: "0503826189",
        CustomerEmail: "300ices@gmail.com",
        Channel: "vodafone-gh",
        Amount: 100000.01,
        PrimaryCallbackUrl: "https://vercel.com/kelvinatta/savethedate-shop-api/api/callback",
        SecondaryCallbackUrl: "",
        Description: "Monthly tax payment"
    };

    return await mobileMoney.send(Object.assign(paymentData, ClientReference)); // object destructuring in future
};

// may throw, wrap in try catch block to handle errors
//console.log(payUsualBills("UniqueXXXXX21XX"));

app.post('/api/hello', (req,res)=>{
    try{
   payUsualBills("65737a40-2aca-4c21-b6da-cd5a51973dcd")
    }
    catch (error) {
        console.error('Error :', error);
      }

});

app.get('/api/callback', (req,res)=>{
   
    res.json("Payment Successfull");

});

const port =  3000;
app.listen(port,() => {
    console.log('Server is running on port ${port}')
})

export default app;
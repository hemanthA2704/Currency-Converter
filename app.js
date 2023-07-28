const express = require("express");
const bodyParser =require("body-parser");
const request = require("request");
const app =express();

var currency = ["USD","AED","AFN","ALL","AMD","ANG","AOA","ARS","AUD","AWG","AZN","BAM","BBD","BDT","BGN","BHD","BIF","BMD","BND","BOB","BRL","BSD","BTN","BWP","BYN","BZD","CAD","CDF","CHF","CLP","CNY","COP","CRC","CUP","CVE","CZK","DJF","DKK","DOP","DZD","EGP","ERN","ETB","EUR","FJD","FKP","FOK","GBP","GEL","GGP","GHS","GIP","GMD","GNF","GTQ","GYD","HKD","HNL","HRK","HTG","HUF","IDR","ILS","IMP","INR","IQD","IRR","ISK","JEP","JMD","JOD","JPY","KES","KGS","KHR","KID","KMF","KRW","KWD","KYD","KZT","LAK","LBP","LKR","LRD","LSL","LYD","MAD","MDL","MGA","MKD","MMK","MNT","MOP","MRU","MUR","MVR","MWK","MXN","MYR","MZN","NAD","NGN","NIO","NOK","NPR","NZD","OMR","PAB","PEN","PGK","PHP","PKR","PLN","PYG","QAR","RON","RSD","RUB","RWF","SAR","SBD","SCR","SDG","SEK","SGD","SHP","SLE","SLL","SOS","SRD","SSP","STN","SYP","SZL","THB","TJS","TMT","TND","TOP","TRY","TTD","TVD","TWD","TZS","UAH","UGX","UYU","UZS","VES","VND","VUV","WST","XAF","XCD","XDR","XOF","XPF","YER","ZAR","ZMW","ZWL"];

app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended:true}));

app.use("/",express.static("public"));


app.get("/",function(req,res) {
    res.render("list",{curr : currency})
});

app.post("/",function(req,res) {
    if (req.body.wish === "yes") {
        res.redirect("/")
    }else {
        var amount = req.body.amount
        var curr1 = req.body.currency1;
        var curr2 = req.body.currency2;
        

        var baseUrl = `https://v6.exchangerate-api.com/v6/your-api-key/pair/${curr1}/${curr2}/${amount}`;
        
        request(baseUrl,function(error,response,body) {
            var body = JSON.parse(body)
            res.render("answer",{amount : amount,rate :body.conversion_result, curr1 : curr1 ,curr2:curr2});
    });}
})

app.listen(3000)
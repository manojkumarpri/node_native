var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var itemRouter = require('./routers/item');
var userRouter = require('./routers/user');
var cartRouter = require('./routers/cart');
var adRouter=require('./routers/adminProvider');
var providerRouter = require('./routers/provider');
var orderFoodRouter = require('./routers/orderFood');
var orderRouter = require('./routers/order');
var offerRouter = require('./routers/offer');
var Offer = require('./models/offermodel');
var request = require('request');


var CronJob = require('cron').CronJob;


// for stripe paymet=nt
// const stripe = require("stripe")("sk_test_3BxulZfBpq9vnV8GaD8A2pcQ");
// app.use(require("body-parser").text());

var cors = require('cors');

var app = express();

var port =process.env.PORT || 3001;
var HOST_NAME = 'localhost';
var DATABASE_NAME = 'react_food';

var mongoose = require('mongoose'); 



var uri = 'mongodb://vicky:vickymaha123@ds051883.mlab.com:51883/react_food';

var options = {
  
  "server" : {
    "socketOptions" : {
      "keepAlive" : 300000,
      "connectTimeoutMS" : 30000
    }
  },
  "replset" : {
    "socketOptions" : {
      "keepAlive" : 300000,
      "connectTimeoutMS" : 30000
    }
  }
}

mongoose.connect(uri, options);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));




db.once('open', () =>{
 console.log('connected to database');   
                  
});

// const job=new CronJob('*/15 * * * * *', function() {
//   console.log('Special deals cleared on every 24 hours');
//   // Offer.deleteMany({})
//   require('dns').lookup(require('os').hostname(), function (error, address) {
//         /* Assemble API URL (yours might be a little different) */
//         ownAPI = "http://" + "localhost" + ":" + port + "/api/deleteOfffers";

//         console.log(ownAPI);/* Request from your own API */   
//         request.get(ownAPI, function (error, response, body) {
//     if (!error && response.statusCode == 200) {
//         console.log(body); // body is either 'true' or 'false'
//     }
// });
//         });

// }, null, true, 'Asia/Kolkata');
// job.start( );

app.use(cors()); 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/api', itemRouter);
app.use('/api', userRouter);
app.use('/api', cartRouter);
app.use('/api', orderFoodRouter);
app.use('/api', providerRouter);
app.use('/api', orderRouter);
app.use('/api', adRouter);
app.use('/api', offerRouter);


// for stripe payment
// app.post("/charge", async (req, res) => {
//   try {
//     let {status} = await stripe.charges.create({
//       amount: 2000,
//       currency: "usd",
//       description: "An example charge",
//       source: req.body
//     });

//     res.json({status});
//   } catch (err) {
//     res.status(500).end();
//   }
// });


app.listen(port, function () {
	// console.log("Database connected");
  console.log('Listening on port ' + port);
});

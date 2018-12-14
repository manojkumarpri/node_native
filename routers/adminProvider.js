var express = require('express');
var Provider =require('../models/provider');
var Item=require('../models/item');
var Order=require('../models/order');
var User=require('../models/users');

var adRouter=express.Router();

var nodemailer = require('nodemailer');

var smtpConfig = {
  host: 'smtp.mail.com',
  port: 587,
  secure: false, // use SSL
  auth: {
      user: 'narivefood@fastservice.com',
      pass: 'Shine@123'
  }
};



var transporter = nodemailer.createTransport(smtpConfig);

var mailOptions = {
  from: 'narivefood@fastservice.com',
  to: 'emergencymail1818@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};


adRouter
.route('/modifyFoodToProvider/:providerId')
.put(function (request,response){
    console.log("put /addFoodToProvider/:providerId");

    var providerId=request.params.providerId;
    console.log(providerId);

    var food=request.body;

  
     Provider.findOne({ provider_id:providerId }, function (error, provider) {

   if (error) {
  response.status(500).send(error);
  return;
}
//console.log(provider);

if(provider.food_id.includes(food.food_id))
{
    //console.log(provider);
    var index=provider.food_id.indexOf(food.food_id);
    //console.log(index);
    
    provider.quantity[index]=food.quantity;
    provider.available[index]=food.available;
    provider.price[index]=food.price;

    provider.markModified('quantity');
    provider.markModified('available');
    provider.markModified('price');
    // delete provider["__v"];
    // delete provider["updatedAt"];
    // delete provider["createdAt"];
    // delete provider["_id"];
    console.log(provider);
    provider.save(function (err) {
  if (err) return handleError(err);
  // saved!
}); 
    response.json(provider);
    return;
}
else {
  console.log('pushing new one');
  provider.food_id.push(food.food_id);

  provider.quantity.push(food.quantity);
  provider.available.push(food.available);
  provider.price.push(food.price);


  provider.markModified('food_id');
  provider.markModified('quantity');
  provider.markModified('available');
  provider.markModified('price');

  console.log(provider);
    provider.save(
      function (err) {
        if (err) 
        console.log(err);

        // saved!
      } 
    );
    response.json(provider);
    return;

}


});
});

adRouter.route('/sendMail').get(function (request,response){


  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  response.json('mail executed')

})


adRouter.route('/count').get(function (request,response){

var total={"totalOrderDeliverd":0,"totalOrderDispatched":0,"totalOrderCancelled":0,"todayOrderDeliverd":0,"todayOrderDispatched":0,"todayOrderCancelled":0,
"totalUsers":0,"activeUsers":0,"todayCollections":0,"paidForProviders":0,"profit":0,"loss":0,"totalProviders":0,"activeProviders":0}
  
  Order.count({order_status: 'delivered'}, function(err, orderDeliverd) {
           console.log('Total delivered order count is ' + orderDeliverd);
           total.totalOrderDeliverd=orderDeliverd;
           //response.json({ totalOrderDeliverd:orderDeliverd });

             Order.count({order_status: 'dispatched'}, function(err, orderDispatched) {
           console.log('Total dispatched order count is ' + orderDispatched);
           total.totalOrderDispatched=orderDispatched;
          // response.json({ totalOrderDispatched:orderDispatched });

              Order.count({order_status: 'cancelled'}, function(err, orderCancelled) {
           console.log('Total cancelled order count is ' + orderCancelled);
           total.totalOrderCancelled=orderCancelled;
           //response.json({ totalOrderCancelled:orderCancelled });

            Order.find({order_status: "delivered"}, function(err, delivered) {
           //console.log('Today delivered order count is ' + delivered);
           // var updatedAt=delivered.updatedAt;
           // for (var i=0;i<delivered.length;i++){
           //    var 
           // }
           // total.todayOrderDeliverd=delivered;
           //response.json({ orderDeliverd:delivered });
           const d=(new Date()).setHours(0,0,0,0);

           Order.count({updatedAt:{ $gte :d } ,order_status: "dispatched"}, function(err, dispatched) {
           console.log('Today dispatched ordered count is ' + dispatched);
           total.todayOrderDispatched=dispatched;
          Order.count({updatedAt : { $gte : d },order_status: "cancelled"}, function(err, cancelled) {
         console.log('Today cancelled order count is ' + cancelled);
         total.todayOrderCancelled=cancelled;
         //response.json({ orderCancelled:cancelled });
         User.count({}, function(err, user) {
         console.log('Total user count is ' + user);
         total.totalUsers=user;
         //response.json({totalUsers:total.totalUsers});
         Order.count({updatedAt : { $gte : d }}, function(err, order) {
         console.log('Active user count is ' + order);
         total.activeUsers=order;
         //response.json({ activeUsers:order });
    
     Order.find({updatedAt : { $gte : d }}, function(err, order) {
      var total1=0;
      for(var i=0;i<order.length;i++){
          total1+=order[i].total_price
      }
         console.log('today collection is ' + total1);
         total.todayCollections=total1;
         total.paidForProviders=(((total1)*(75))/(100));
         total.profit=total.todayCollections-total.paidForProviders;

         if(total.profit>0) {
            total.loss=0;

         } else {
          total.loss=total.paidForProviders-total.profit;
          if(!total.loss) {
            total.loss=0
          }
          if(!total.profit || !tota.todayCollections || !total.paidForProviders) {
            total.profit=0;
            total.paidForProviders=0;
            total.todayCollections=0;
          }
         }
         //response.json({ todayCollections:total,paidForProviders:total.paidForProviders, profit:total.profit, loss:total.loss});
           Provider.count({}, function(err, totalProviders) {
           console.log('Total provider count is ' + totalProviders);
           total.totalProviders=totalProviders;
           //response.json({  totalProviders:totalProviders });
         Provider.count({isActive: true}, function(err, activeProviders) {
           console.log('Active provider count is ' + activeProviders);
           total.activeProviders=activeProviders;
           console.log(total);
           response.json({ total});
                            });
                          });
                       });

                     });
                  });
                });
              });
            });
          });
        });
      });





    
//     sync(response.json(total));
//     // Order.count({updatedAt : { $gte : new Date.now() }}, function(err, usedProviders) {
//     //        console.log('Count is ' + usedProviders.length);
//     //        totalProviders=activeProviders.length;
//     //        //response.json({ count: a });
//     //   });

 });


 adRouter.route('/providerSignIn').post(function (request,response){

console.log(request.body);
var pro=request.body;


Provider.findOne({ provider_id:pro.provider_id,provider_mobile_number:pro.provider_mobile_number }, function (error, provider) {

  if (error) {
 response.status(500).send(error);
 return;
}
response.json(provider)
})


// response.json(request.body);
  
})


 // console.log(Provider.count({}));


 //  response.json('mail executed')






module.exports = adRouter; 
var express = require('express');
var Order = require('../models/order');
var orderRouter = express.Router();
var nodemailer = require('nodemailer');

// nodemailer

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
  subject: 'Food order delivery-reg',
  text: 'That was easy!'
};

//get and post data
orderRouter
  .route('/order')
  .post(function (request, response) {

    console.log('POST /order');

    var order = new Order(request.body);
    console.log(order);
      // response.setHeader('Access-Control-Allow-Origin','*');
      // response.setHeader("Access-Control-Allow-Methods",
      //   "GET, POST, PUT, DELETE, OPTIONS, HEAD");
    order.save();
   
    response.status(201).send(order);

    // nodemailer
      mailOptions.to=order.user_email;
      // for(var i=0;i<order.food_id.length;i++){
      //   mailOptions.text="Your order placed successfully. You will receive your order soon.Your order details are,"+"/r/n Food: "+order.food_name[i]+" /r/nQuantity is: "+order.quantity[i]+"/r/nTotal amount is "+order.total_price+" /r/nYour invoice number is: "+order.invoice_number+" /r/nHave a healthy food!!!... Order again!!!...";
      // }
      mailOptions.text="your order placed successfully"+"/r/n total_price is: "
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent to: ' +mailOptions.to );
        }
      });

  })
  .get(function (request, response) {

    console.log('GET /order');

    Order.find(function (error, order) {

      if (error) {
        response.status(500).send(error);
        return;
      }

      console.log(order);
      response.json(order);
    });
  });

orderRouter
  .route('/orders/:orderId')
  .get(function (request, response) {

    console.log('GET /Orders by/:orderId');

    var orderId = request.params.orderId;


    Order.findOne({order_id:orderId }, function (error, order) {

      if (error) {
        response.status(500).send(error);
        return;
      }
      //console.log(provider.filter(a=>((a.food_id.includes(parseInt(foodId))))));
      console.log(order);
      response.json(order);

    });
  })
  .put(function (request, response) {

    console.log('PUT /orders/:orderId');

    var orderId = request.params.orderId;

    Order.findOne({ order_id: orderId }, function (error, order) {

      if (error) {
        response.status(500).send(error);
        return;
      }

      if (order) {
        order.delivery_address = request.body.delivery_address;
        order.food_id = request.body.food_id;
        order.food_name = request.body.food_name;
        order.food_image = request.body.food_image;
        order.user_id = request.body.user_id;
        order.food_id = request.body.food_id;
        order.price = request.body.price;
        order.provider_mobile_number = request.body.provider_mobile_number;
        order.provider_id = request.body.provider_id;
        order.quantity = request.body.quantity;
        order.user_mobile_number = request.body.user_mobile_number;
        order.order_status = request.body.order_status;
        order.payment_option = request.body.payment_option;
        order.invoice_number = request.body.invoice_number;
        order.total_price = request.body.total_price;
        order.delivered_on = request.body.delivered_on;
        order.user_email = request.body.user_email;
        order.indexOf = request.body.indexOf;
        order.save();

        response.json(order);
        return;
      }

      response.status(404).json({
        message: 'Item with id ' + itemId + ' was not found.'
      });
    });
  })
  .patch(function (request, response) {

    console.log('PATCH /order/:orderId');

    var orderId = request.params.orderId;

    Order.findOne({ order_id: orderId }, function (error, order) {
      
      if (error) {
        response.status(500).send(error);
        return;
      }

      if (Order) {

        for (var property in request.body) {
          if (request.body.hasOwnProperty(property)) {
            if (typeof order[property] !== 'undefined') {
              order[property] = request.body[property];
            }
          }
        }


        order.save();

        response.json(order);
        return;
      }

      response.status(404).json({
        message: 'Order with id ' + orderId + ' was not found.'
      });
    });
  })
  .delete(function (request, response) {

    console.log('DELETE /order/:orderId');

    var orderId = request.params.orderId;

    Order.findOne({ order_id: orderId }, function (error, order) {
      
      if (error) {
        response.status(500).send(error);
        return;
      }

      if (order) {
        order.remove(function (error) {

          if (error) {
            response.status(500).send(error);
            return;
          }

          response.status(200).json({
            'message': 'Order with id ' + orderId + ' was removed.'
          });
        });
      } else {
        response.status(404).json({
          message: 'Order with id ' + orderId + ' was not found.'
        });
      }
    });
  });

// orders get by user id
orderRouter
  .route('/ordersBy/:userId')
  .get(function (request, response) {

    console.log('GET /Orders by/:userId');

    var userId = request.params.userId;


    Order.find({user_id:userId }, function (error, order) {

      if (error) {
        response.status(500).send(error);
        return;
      }
      //console.log(provider.filter(a=>((a.food_id.includes(parseInt(foodId))))));
      console.log(order);
      response.json(order);

    });
  })

// change delivery address by user_id
orderRouter
  .route('/changeDeliveryAddress/:userId')
    .put(function (request, response) {

    console.log('PUT /orders/:userId');

    var userId = request.params.userId;

    Order.findOne({ user_id: userId }, function (error, order) {

      if (error) {
        response.status(500).send(error);
        return;
      }

      if (order) {
        order.delivery_address = request.body.delivery_address;
        order.save();

        response.json(order);
        return;
      }

      response.status(404).json({
        message: 'User with id ' + userId + ' was not found.'
      });
    });
  })

// change order_staus by order_id
orderRouter
 .route('/orderStatus')
  .put(function (request, response) {

    console.log('POST /changeOrderStatus');

    var orderId = request.params.orderId;
    //console.log(order);//order_status with order_id
    //order.save();
   var ids = request.body.order_id;
   var order_status=request.body.order_status;
    var bulk = Order.collection.initializeUnorderedBulkOp();
   //var bulk=[];
   for (var j=0;j<ids.length;j++){
        Order.findOne({order_id:ids[j]}, function(error,order){
        if(order){
            //console.log(order[0].delivery_address="nallur");
            //order.save();
            //bulk=order;
            //console.log(bulk.length);
            order.order_status=order_status;
            //console.log(order.order_status);
            order.save();
          }
          if(error){
            console.log(error);
          }
        });
      }
       response.json("Successfully changed the order status of the entered orders");
       return;
    // console.log("hello");
    //     for (var i = 0; i < ids.length; i++) {
    //           var id = ids[i];
    //           console.log(id);
    //           console.log(bulk);
    //           bulk.find({
    //             'order_id': id

    //           })
    //           .updateOne({
    //             $set: {
    //               'order_status': order_status
    //             }
    //           });
    //           console.log(order_status);
    //       }
    //        //order.save();
    //     response.json("success");
        


    //     Order.updateMany({}, function (error, order) {
    //       console.log(order);
    //   if (error) {
    //     response.status(500).send(error);
    //     return;
    //   }

    //   // if (order) {
    //   //   console.log("in 1");
    //   //   for( var j=0;j<orderId.length;j++) {
    //   //     console.log("in 2 ",order);
    //   //     for(var i=0;i<order.length;i++) {
    //   //       console.log("in 3");
    //   //       if(order[i].order_id == orderId[j]) {
    //   //           order[i].order_status=order_status;
    //   //           order.save();
    //   //           }
    //   //         }        
    //   //       }  
    //   //     }

    //   response.status(404).json({
    //     message: 'User with id ' + userId + ' was not found.'
    //   });
    // });

    //response.status(201).send(order);

  })
module.exports = orderRouter;
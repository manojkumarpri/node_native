var express = require('express');
var Item = require('../models/item');
var Cart = require('../models/cart');
var Users = require('../models/users');


var orderFoodRouter = express.Router();

//get and post data
orderFoodRouter
  .route('/orderFood')
  .post(function (request, response) {

    console.log('POST /Orders');

    var orders = request.body;
    
    var food_id=orders.food_id;
    var quantity=orders.quantity;
    var user_id=orders.user_id;
    var provider_id=orders.provider_id;
    console.log(food_id +' '+quantity );

// update food quantity
    Item.findOne({ id: food_id }, function (error, items) {

      if (error) {
        response.status(500).send(error);
        return;
      }

      if (items) {
          Users.findOne({ fid:user_id }, function (err, users){
              if(err) {
                response.status(500).send(err);
                return;
              }
               if (users) {

                items.available=items.available-quantity;
                var orderobj={"food_name":"","food_img":"","category":"","price":"","provider_address":"","provider_id":"","provider_name":"",
                                "rating":"","lat":"","lon":"","zoom":"","tax":"","user_id":"","mobile_number":"","status":"","quantity":"","delivery_address":""}
                
                orderobj.food_name = items.name;
                orderobj.food_image = items.img;
                orderobj.category = items.category;
                orderobj.provider_address = items.provider_address;
                orderobj.provider_name = items.provider_name;
                orderobj.provider_id = provider_id;
                orderobj.rating = items.rating;
                orderobj.lat = items.lat;
                orderobj.lon = items.lon;
                orderobj.zoom = items.zoom;
                orderobj.price = items.price;
                orderobj.tax = items.tax;
                orderobj.quantity = quantity;
                orderobj.user_id = user_id;
                orderobj.mobile_number = users.mobile_number;
                orderobj.status = "booked";
                orderobj.delivery_address = users.address;

                items.save();
                // response.setHeader('Access-Control-Allow-Origin','*');
                console.log("Items: " +items);
                response.json(orderobj);
                var orderfinal=Cart(orderobj);
                console.log("Cart: " +orderfinal);
                orderfinal.save();
                 return;
                  }

                response.status(404).json({
                message: 'user with id ' + user_id + ' was not found.'
            });

          });
        }
      //         response.status(404).json({
      //         message: 'Food with id ' + food_id + ' was not found.'
      // });

    });

    // response.status(201).send(orders);
  })
  .get(function (request, response) {

    console.log('GET /cart');

    Cart.find(function (error, cart) {

      if (error) {
        response.status(500).send(error);
        return;
      }

      console.log(cart);
  
      response.json(cart);
    });
  });

//get and put data by id
orderFoodRouter
  .route('/cart/:cartId')

  .get(function (request, response) {

    console.log('GET /cart/:cartId');

    var cartId = request.params.cartId;

    Cart.findOne({ order_id: cartId }, function (error, cart) {

      if (error) {
        response.status(500).send(error);
        return;
      }

      console.log(cart);
      response.setHeader('Access-Control-Allow-Origin','*');

      response.json(cart);

    });
  })

  .put(function (request, response) {

    console.log('PUT /cart/:cartId');

    var cartId = request.params.cartId;

    Cart.findOne({ id: cartId }, function (error, cart) {

      if (error) {
        response.status(500).send(error);
        return;
      }

      if (cart) {
        cart.delivery_address = request.body.delivery_address;
        
        cart.save();
        response.setHeader('Access-Control-Allow-Origin','*');

        response.json(cart);
        return;
      }

      response.status(404).json({
        message: 'Cart with id ' + cartId + ' was not found.'
      });
    });
  })
  .patch(function (request, response) {

    console.log('PATCH /cart/:cartId');

    var cartId = request.params.cartId;

    Cart.findOne({ id: cartId }, function (error, cart) {
      
      if (error) {
        response.status(500).send(error);
        return;
      }

      if (cart) {

        for (var property in request.body) {
          if (request.body.hasOwnProperty(property)) {
            if (typeof cart[property] !== 'undefined') {
              cart[property] = request.body[property];
            }
          }
        }

        // if (request.body.name) {
        //   item.name = request.body.name;
        // }

        // if (request.body.description) {
        //   item.description = request.body.description;
        // }

        // if (request.body.quantity) {
        //   item.quantity = request.body.quantity;
        // }

        cart.save();
         res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
         res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
         res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
         res.setHeader('Access-Control-Allow-Credentials', true);
         response.setHeader('Access-Control-Allow-Origin','*');
        response.json(users);
        return;
      }

      response.status(404).json({
        message: 'User with id ' + userId + ' was not found.'
      });
    });
  })
  .delete(function (request, response) {

    console.log('DELETE /cart/:cartId');

    var cartId = request.params.cartId;

    Cart.findOne({ id: cartId }, function (error, cart) {
      
      if (error) {
        response.status(500).send(error);
        return;
      }

      if (cart) {
        cart.remove(function (error) {

          if (error) {
            response.status(500).send(error);
            return;
          }

          response.status(200).json({
            'message': 'Cart with id ' + cartId + ' was removed.'
          });
        });
      } else {
        response.status(404).json({
          message: 'Cart with id ' + cartId + ' was not found.'
        });
      }
    });
  });

//change delivery_address by Id
orderFoodRouter
  .route('/cart/changeaddress/:orderId')
  .put(function (request, response) {

    console.log('Change delivery_address of order');

    var orderId = request.params.orderId;

    Cart.findOne({ order_id: orderId }, function (error, cart) {

      if (error) {
        response.status(500).send(error);
        return;
      }

      if (cart) {
        cart.delivery_address = request.body.delivery_address;

        cart.save();
        console.log(cart.delivery_address);
 
         response.setHeader('Access-Control-Allow-Origin','*');
         response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
         
         
        response.json(cart);
        return;
      }

      response.status(404).json({
        message: 'Order with id ' + orderId + ' was not found.'
      });
    });
  })

  //get all users orders
  orderFoodRouter
  .route('/cart/allorders/:id')
  .get(function (request, response) {

    console.log('GET /cart/allorders/:id');

    var userId = request.params.id;

    Cart.find({ user_id: userId }, function (error, user) {

      if (error) {
        response.status(500).send(error);
        return;
      }

      console.log(user);
      response.setHeader('Access-Control-Allow-Origin','*');

      response.json(user);

    });
  })

module.exports = orderFoodRouter;
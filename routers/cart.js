var express = require('express');
var Cart = require('../models/cart');


var cartRouter = express.Router();

//get and post data
cartRouter
  .route('/cart')
  .post(function (request, response) {

    console.log('POST /cart');

    var cart = new Cart(request.body);
        cart.save();
   

    response.status(201).send(cart);
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
cartRouter
  .route('/cart/:cartId')
  .get(function (request, response) {

    console.log('GET /cart/:cartId');

    var cartId = request.params.cartId;

    Cart.findOne({ user_id: cartId }, function (error, cart) {

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

    Cart.findOne({ user_id: cartId }, function (error, cart) {

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
cartRouter
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
  cartRouter
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

module.exports = cartRouter;
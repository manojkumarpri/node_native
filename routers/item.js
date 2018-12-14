var express = require('express');
var Item = require('../models/item');


var itemRouter = express.Router();

itemRouter
  .route('/items')
  .post(function (request, response) {

    console.log('POST /items');

    var item = new Item(request.body);

    item.save();
    response.setHeader('Access-Control-Allow-Origin','*');
    response.status(201).send(item);
  })
  .get(function (request, response) {

    console.log('GET /items');

    Item.find(function (error, items) {

      if (error) {
        response.status(500).send(error);
        return;
      }

      console.log(items);
      response.setHeader('Access-Control-Allow-Origin','*');
      response.json(items);
    });
  });

itemRouter
  .route('/items/:itemId')
  .get(function (request, response) {

    console.log('GET /items/:itemId');

    var itemId = request.params.itemId;

    Item.findOne({ food_id: itemId }, function (error, item) {

      if (error) {
        response.status(500).send(error);
        return;
      }

      console.log(item);

      response.json(item);

    });
  })
  .put(function (request, response) {

    console.log('PUT /items/:itemId');

    var itemId = request.params.itemId;

    Item.findOne({ food_id: itemId }, function (error, item) {

      if (error) {
        response.status(500).send(error);
        return;
      }

      if (item) {
        item.food_name = request.body.food_name;
        item.food_image = request.body.food_image;
        item.price = request.body.price;
        item.category = request.body.category;
        item.breakfast = request.body.breakfast;
        item.lunch = request.body.lunch;
        item.dinner = request.body.dinner;     
        
        item.save();

        response.json(item);
        return;
      }

      response.status(404).json({
        message: 'Item with id ' + itemId + ' was not found.'
      });
    });
  })
  .patch(function (request, response) {

    console.log('PATCH /items/:itemId');

    var itemId = request.params.itemId;

    Item.findOne({ food_id: itemId }, function (error, item) {
      
      if (error) {
        response.status(500).send(error);
        return;
      }

      if (item) {

        for (var property in request.body) {
          if (request.body.hasOwnProperty(property)) {
            if (typeof item[property] !== 'undefined') {
              item[property] = request.body[property];
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

        item.save();

        response.json(item);
        return;
      }

      response.status(404).json({
        message: 'Item with id ' + itemId + ' was not found.'
      });
    });
  })
  .delete(function (request, response) {

    console.log('DELETE /items/:itemId');

    var itemId = request.params.itemId;

    Item.findOne({ food_id: itemId }, function (error, item) {
      
      if (error) {
        response.status(500).send(error);
        return;
      }

      if (item) {
        item.remove(function (error) {

          if (error) {
            response.status(500).send(error);
            return;
          }

          response.status(200).json({
            'message': 'Item with id ' + itemId + ' was removed.'
          });
        });
      } else {
        response.status(404).json({
          message: 'Item with id ' + itemId + ' was not found.'
        });
      }
    });
  });

//update food quantity
itemRouter
  .route('/items/updatequantity/:foodId')
  .put(function (request, response) {

    console.log('Update available of items');

    var foodId = request.params.foodId;

    Item.findOne({ id: foodId }, function (error, item) {

      if (error) {
        response.status(500).send(error);
        return;
      }

      if (item) {
        item.available = request.body.available;

        item.save();
        console.log(item.available);
 
          response.setHeader('Access-Control-Allow-Origin','*');
         response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
         
         
        response.json(item);
        return;
      }

      response.status(404).json({
        message: 'Item with id ' + itemId + ' was not found.'
      });
    });
  })

module.exports = itemRouter;
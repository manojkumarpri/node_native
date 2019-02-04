var express = require('express');
var Offer = require('../models/offermodel');


var offerRouter = express.Router();

offerRouter
  .route('/offers')
  .post(function (request, response) {

    console.log('POST /offers');
if(request.body.food_id == null) {
  console.log("it can not be empty",request.body);
} else {
    var offer = new Offer(request.body);

    offer.save();
     //console.log(offer);
     console.log("hai")
    response.setHeader('Access-Control-Allow-Origin','*');
    response.status(201).send(offer);
  }
  })
  .get(function (request, response) {

    console.log('GET /offers');

    Offer.find(function (error, offers) {

      if (error) {
        response.status(500).send(error);
        return;
      }

      console.log(offers);
      response.setHeader('Access-Control-Allow-Origin','*');
      response.json(offers);
    });
  });

offerRouter
  .route('/offers/:foodId')
  .get(function (request, response) {

    console.log('GET /offers/:foodId');

    var foodId = request.params.foodId;

    Offer.findOne({ food_id: offerId }, function (error, offer) {

      if (error) {
        response.status(500).send(error);
        return;
      }

      console.log(offer);

      response.json(offer);

    });
  })
  .put(function (request, response) {

    console.log('PUT /offers/:foodId');

    var foodId = request.params.foodId;

    Offer.findOne({ food_id: foodId }, function (error, offer) {

      if (error) {
        response.status(500).send(error);
        return;
      }

      if (offer) {
        offer.food_name = request.body.food_name;
        offer.food_image = request.body.food_image;
        offer.original_price = request.body.original_price;
        offer.deal_price = request.body.deal_price;
        offer.category = request.body.food_type;
        offer.provider_id = request.body.provider_id;
        offer.provider_mobile_number = request.body.provider_mobile_number;
        offer.provider_address = request.body.provider_address;   
        offer.lat = request.body.lat;     
        offer.lon = request.body.lon;
        offer.zoom = request.body.zoom;   
        offer.quantity = request.body.quantity;  
        offer.available = request.body.available;
        offer.provider_address = request.body.provider_address;   
        offer.food_id = request.body.food_id;    
        
        offer.save();

        response.json(offer);
        return;
      }

      response.status(404).json({
        message: 'Item with id ' + foodId + ' was not found.'
      });
    });
  })
  .patch(function (request, response) {

    console.log('PATCH /offers/:foodId');

    var foodId = request.params.foodId;

    Offer.findOne({ food_id: foodId }, function (error, offer) {
      
      if (error) {
        response.status(500).send(error);
        return;
      }

      if (offer) {

        for (var property in request.body) {
          if (request.body.hasOwnProperty(property)) {
            if (typeof offer[property] !== 'undefined') {
              food[property] = request.body[property];
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

        offer.save();

        response.json(offer);
        return;
      }

      response.status(404).json({
        message: 'Offer with id ' + foodId + ' was not found.'
      });
    });
  })
  .delete(function (request, response) {

    console.log('DELETE /offers/:foodId');

    var foodId = request.params.foodId;

    Offer.findOne({ food_id: foodId }, function (error, offer) {
      
      if (error) {
        response.status(500).send(error);
        return;
      }

      if (offer) {
        offer.remove(function (error) {

          if (error) {
            response.status(500).send(error);
            return;
          }

          response.status(200).json({
            'message': 'Offer with id ' + foodId + ' was removed.'
          });
        });
      } else {
        response.status(404).json({
          message: 'Offer with id ' + foodId + ' was not found.'
        });
      }
    });
  });

//update food quantity
offerRouter
  .route('/offers/updatequantity/:providerId')
  .put(function (request, response) {

    console.log('Update available of offer items by provider id');

    var providerId = request.params.providerId;
   // console.log(request.params.providerId)
   // console.log(request.body.available)
    Offer.findOne({ provider_id: providerId }, function (error, offer) {

      if (error) {
        response.status(500).send(error);
        return;
      }

      if (offer) {
        offer.available = request.body.available;

        offer.save();
        console.log(offer.available);
 
          response.setHeader('Access-Control-Allow-Origin','*');
         response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
         
         
        response.json(offer);
        return;
      }

      response.status(404).json({
        message: 'Offer with id ' + providerId + ' was not found.'
      });
    });
  })

  offerRouter
  .route('/deleteOffers')
    .get(function (request, response) {

    console.log('GET /deleteOffers');

    Offer.deleteMany({}, function (error, offers) {

      if (error) {
        response.status(500).send(error);
        return;
      }

      console.log(offers);
      response.setHeader('Access-Control-Allow-Origin','*');
      response.json(offers);
    });
  });

module.exports = offerRouter;
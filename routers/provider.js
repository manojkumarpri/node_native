var express = require('express');
var Provider = require('../models/provider');



var providerRouter = express.Router();

//get and post data
providerRouter
  .route('/provider')
  .post(function (request, response) {

    console.log('POST /provider');

    var provider = new Provider(request.body);
    console.log(provider);
      // response.setHeader('Access-Control-Allow-Origin','*');
      // response.setHeader("Access-Control-Allow-Methods",
      //   "GET, POST, PUT, DELETE, OPTIONS, HEAD");
    provider.save();
   

    response.status(201).send(provider);
  })
  .get(function (request, response) {

    console.log('GET /provider');

    Provider.find(function (error, provider) {

      if (error) {
        response.status(500).send(error);
        return;
      }

      console.log(provider);
      // response.setHeader('Access-Control-Allow-Origin','*');
      // response.setHeader("Access-Control-Allow-Methods",
      //   "GET, POST, PUT, DELETE, OPTIONS, HEAD");
      response.json(provider);
    });
  });

// get by id of food in provider
providerRouter
  .route('/provider/:foodId')
  .get(function (request, response) {

    console.log('GET /Providers by/:foodId');

    var foodId = request.params.foodId;


    Provider.find({ }, function (error, provider) {

      if (error) {
        response.status(500).send(error);
        return;
      }
      //console.log(provider.filter(a=>((a.food_id.includes(parseInt(foodId))))));

      provider=(provider.filter(a=>((a.food_id.includes(parseInt(foodId))))));
      var provider1=[];
      var t;

      provider.map(m=>{let a=m;
        
      
        console.log(a);
        provider1.push(Object.assign({},a._doc,{indexOf:m.food_id.indexOf(parseInt(foodId))}));
      

    });
      //console.log(provider1);
      response.json(provider1);

    });
  })
  // put by id for all data update of food in provider
  .put(function (request, response) {

    console.log('PUT /food/:foodId');

    var foodId = request.params.foodId;

    Provider.findOne({ }, function (error, item) {

      if (error) {
        response.status(500).send(error);
        return;
      }

      if (item) {


      item=(item.filter(i=>((i.food_id.includes(parseInt(foodId))))));
     
  
        item.food_id = request.body.food_id;
        item.provider_name = request.body.provider_name;
        item.provider_id = request.body.provider_id;

         item.provider_address = request.body.provider_address;
        item.lat = request.body.lat;
        item.lon = request.body.lon;

         item.zoom = request.body.zoom;
        item.price = request.body.price;
        item.tax = request.body.tax;

        item.today_status = request.body.today_status;
        item.provider_mobile_number = request.body.provider_mobile_number;
        item.available = request.body.available;

         item.quantity = request.body.quantity;
        item.isActive = request.body.isActive;
        item.rating = request.body.rating;
        item.rating_count = request.body.rating_count;
        
        item.save();
        console.log(item);
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

    Provider.findOne({ food_id: itemId }, function (error, item) {
      
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

  // delete by id for all data of food in provider
  .delete(function (request, response) {

    console.log('DELETE /items/:itemId');

    var itemId = request.params.itemId;

    Provider.findOne({ }, function (error, item) {
      
      if (error) {
        response.status(500).send(error);
        return;
      }

      if (item) {
        item=(item.filter(i=>((i.food_id.includes(parseInt(itemId))))));
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

// more by provider by pass provider id
providerRouter
  .route('/providerlist/:providerId')
  .get(function (request, response) {

    console.log('GET /Providers by/:providerId');

    var providerId = request.params.providerId;


    Provider.findOne({provider_id:providerId }, function (error, provider) {

      if (error) {
        response.status(500).send(error);
        return;
      }
  
      //console.log(provider1);
      response.json(provider);

    });
  })


// update available and ratings in food list of provider
providerRouter
 .route('/foodUpdate/:providerId')
 .put(function (request, response) {

    console.log('PUT /foodUpdate/:foodId');

    var providerId = request.params.providerId;
    var available = request.body.available;
    var rating = request.body.rating;
    var foodId = request.body.food_id;

    Provider.findOne({provider_id:providerId }, function (error, item) {

      if (error) {
        response.status(500).send(error);
        return;
      }

      if (item) {
                //item=(item.filter(i=>((i.food_id.includes(parseInt(itemId))))));
            
        for(var i=0;i<item.food_id.length;i++) {
               //console.log("db available " +item.available[i]);
          
          if(item.food_id[i] === foodId) {
            item.available[i] = available;
            //item.rating[i] = rating;
            //console.log(item.rating[i]);
               //console.log("db rating " +item.rating[i]);
             //console.log("db rating_count " +item.rating_count[i]);
            item.rating[i]=(item.rating[i]*item.rating_count[i]);
            item.rating_count[i]+=1;
            item.rating[i]=(item.rating[i]+rating)/item.rating_count[i];
            item.rating[i]=Number((item.rating[i]).toFixed(1));
             //console.log("db available1 " +item.available[i]);
             //console.log("db rating1 " +item.rating[i]);
             //console.log("db rating_count1 " +item.rating_count[i]);
            // console.log("3 " +item.available[i]);
            // console.log("4 " +item.rating[i]);
            item.markModified('rating');
            item.markModified('rating_count');
            item.markModified('available');
            item.save();
            response.json(item);
          }
        }
        //console.log(item.price);
        // console.log(available);
        // console.log(rating);
        // item.available[0]=available;
        // item.rating[0]=rating;


        //item.save();
          //console.log(item);
        //response.json(item);
        return;
      }

      response.status(404).json({
        message: 'Item with id ' + itemId + ' was not found.'
      });
    });
  })

providerRouter
 .route('/deleteProvider/:providerId')
  .delete(function (request, response) {

    console.log('DELETE /provider/:providerId');

    var providerId = request.params.providerId;

    Provider.findOne({provider_id:providerId }, function (error, provider) {
      
      if (error) {
        response.status(500).send(error);
        return;
      }

      if (provider) {
       provider.remove(function (error) {

          if (error) {
            response.status(500).send(error);
            return;
          }

          response.status(200).json({
            'message': 'Provider with id ' + providerId + ' was removed.'
          });
        });
      } else {
        response.status(404).json({
          message: 'Provider with id ' + providerId + ' was not found.'
        });
      }
    });
  });


// update provider details update by provider_id
providerRouter
 .route('/updateProvider/:providerId')
  .put(function (request, response) {

    console.log('PUT /updateProvider/:providerId');

    var providerId = request.params.providerId;

    Provider.findOne({provider_id:providerId }, function (error, provider) {

      if (error) {
        response.status(500).send(error);
        return;
      }

      if (provider) {

console.log(request.body.food_id.length)
         for(var i=0;i<request.body.food_id.length;i++) {
             if(provider.food_id[i] === request.body.food_id[i]){
                  provider.available[i] = request.body.available[i];
                  provider.quantity[i] = request.body.quantity[i];
                  
                  provider.rating[i] = request.body.rating[i];
                  provider.rating_count[i] = request.body.rating_count[i];
              }
        }
        provider.provider_name = request.body.provider_name;
        provider.provider_id = providerId;
        provider.provider_address = request.body.provider_address;
        provider.lat = request.body.lat;
        provider.lon = request.body.lon;
        provider.zoom = request.body.zoom;
        provider.today_status = request.body.today_status;
        provider.provider_mobile_number = request.body.provider_mobile_number;
        provider.tax = request.body.tax;
        provider.price = request.body.price;
        provider.isActive = request.body.isActive;
  
        provider.markModified('available');
        provider.markModified('quantity');
        provider.markModified('rating');
        provider.markModified('rating_count');

        provider.save();
        console.log(provider);
        response.json(provider);
        return;
      }

      response.status(404).json({
        message: 'Item with id ' + providerId + ' was not found.'
      });
    });
  })

module.exports = providerRouter;
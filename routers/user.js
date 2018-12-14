var express = require('express');
var User = require('../models/users');


var userRouter = express.Router();

//get and post data
userRouter
  .route('/users')
  .post(function (request, response) {

    console.log('POST /users');

    var user = new User(request.body);
      // response.setHeader('Access-Control-Allow-Origin','*');
      // response.setHeader("Access-Control-Allow-Methods",
      //   "GET, POST, PUT, DELETE, OPTIONS, HEAD");
    user.save();
   

    response.status(201).send(user);
  })
  .get(function (request, response) {

    console.log('GET /users');

    User.find(function (error, users) {

      if (error) {
        response.status(500).send(error);
        return;
      }

      console.log(users);
      // response.setHeader('Access-Control-Allow-Origin','*');
      // response.setHeader("Access-Control-Allow-Methods",
      //   "GET, POST, PUT, DELETE, OPTIONS, HEAD");
      response.json(users);
    });
  });

//get and put data by id
userRouter
  .route('/users/:userId')
  .get(function (request, response) {

    console.log('GET /users/:userId');

    var userId = request.params.userId;

    User.findOne({ user_id: userId }, function (error, users) {

      if (error) {
        response.status(500).send(error);
        return;
      }

      console.log(users);
      response.setHeader('Access-Control-Allow-Origin','*');

      response.json(users);

    });
  })
  .put(function (request, response) {

    console.log('PUT /users/:userId');

    var userId = request.params.userId;

    User.findOne({ user_id: userId }, function (error, users) {

      if (error) {
        response.status(500).send(error);
        return;
      }

      if (users) {
        users.username = request.body.username;
        users.email = request.body.email;
        users.mobile_number = request.body.mobile_number;
        users.address = request.body.address;
        users.password = request.body.password;
        users.security_question = request.body.security_question;
        users.security_answer = request.body.security_answer;
        
        users.save();
        response.setHeader('Access-Control-Allow-Origin','*');
        console.log(users);
        response.json(users);
        return;
      }

      response.status(404).json({
        message: 'User with id ' + userId + ' was not found.'
      });
    });
  })
  .patch(function (request, response) {

    console.log('PATCH /users/:userId');

    var userId = request.params.userId;

    User.findOne({ user_id: userId }, function (error, users) {
      
      if (error) {
        response.status(500).send(error);
        return;
      }

      if (users) {

        for (var property in request.body) {
          if (request.body.hasOwnProperty(property)) {
            if (typeof users[property] !== 'undefined') {
              users[property] = request.body[property];
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

        users.save();
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

    console.log('DELETE /users/:userId');

    var userId = request.params.userId;

    User.findOne({ user_id: userId }, function (error, users) {
      
      if (error) {
        response.status(500).send(error);
        return;
      }

      if (users) {
        users.remove(function (error) {

          if (error) {
            response.status(500).send(error);
            return;
          }

          response.status(200).json({
            'message': 'User with id ' + userId + ' was removed.'
          });
        });
      } else {
        response.status(404).json({
          message: 'User with id ' + userId + ' was not found.'
        });
      }
    });
  });

//update password by Id
userRouter
  .route('/users/updatepassword/:userId')
  .put(function (request, response) {

    console.log('Update password of user');

    var userId = request.params.userId;

    User.findOne({ user_id: userId }, function (error, users) {

      if (error) {
        response.status(500).send(error);
        return;
      }

      if (users) {
        users.password = request.body.password;

        users.save();
        console.log(users.password);
 
          response.setHeader('Access-Control-Allow-Origin','*');
         response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
         
         
        response.json(users);
        return;
      }

      response.status(404).json({
        message: 'User with id ' + userId + ' was not found.'
      });
    });
  })
  //update user_image by Id
userRouter
  .route('/users/updateimage/:userId')
  .put(function (request, response) {

    console.log('Update image of user');

    var userId = request.params.userId;

    User.findOne({ user_id: userId }, function (error, users) {

      if (error) {
        response.status(500).send(error);
        return;
      }

      if (users) {
        users.user_image = request.body.user_image;

        users.save();
        console.log(users.user_image);
 
         //  response.setHeader('Access-Control-Allow-Origin','*');
         // response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
         
         
        response.json(users);
        return;
      }

      response.status(404).json({
        message: 'User with id ' + userId + ' was not found.'
      });
    });
  })
module.exports = userRouter;
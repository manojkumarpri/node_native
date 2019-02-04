var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var offerSchema = new Schema({

  food_id:{
    type: Number,
    required: true
  },
  food_name: {
    type: String,
    required: true
    
  },
  food_image : {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
   food_type: {
    type: String,
    required: true
  },
  available: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  original_price: {
    type: Number,
    required: true
  },
 deal_price: {
  type: Number,
  required: true
  
 },
 provider_id: {
  type: Number,
  required: true
 },
 provider_name: {
  type: String,
  required: true
 },
 provider_mobile_number: {
  type: Number,
  required: true
 },
 provider_address: {
  type: String,
  required: true
 },
 lat: {
  type: Number,
  required: true
 },
 lon: {
  type: Number,
  required: true
 },
 zoom: {
  type: Number,
  required: true
 },
 gstin: {
  type: String,
  required: true
 }



}, { timestamps: true, collection: 'offer',usePushEach: true });


module.exports = mongoose.model('offer', offerSchema);
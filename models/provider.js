var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var AutoIncrement = require('mongoose-sequence') (mongoose);
var providerSchema = new Schema({

  food_id:{
    type: Array,
    
    required: true
  },
  provider_name: {
    type: String,
    required: true,
    default: "manoj"
  },
  provider_id: {
    type: Number,
    unique: true,
    required: false
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
    required: true,
    default: 15
  },
 price: {
    type: Array,
    required: true
  },
  tax: {
  	type: Number,
  	required: true,
    default: 5
  },
  today_status: {
    type: Boolean,
    required: true,
    default: true
  },
 provider_mobile_number: {
    type: Number,
    required: true
  },
  available: {
    type: Array,
    required: true
  },
  quantity: {
  	type: Array,
  	required: true
  },
 isActive: {
    type: Boolean,
    required: true,
    default: true
  },
  rating: {
    type: Array,
    required: false
  },
  rating_count: {
    type: Array,
    required: false
  }


}, {timestamps:true, collection: 'supplier' ,usePushEach: true});

providerSchema.plugin(AutoIncrement, {inc_field: 'provider_id'});
module.exports = mongoose.model('supplier', providerSchema);
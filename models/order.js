var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

var orderSchema = new Schema({
	
  order_id:{
    type: Number,
    unique: true,
    required: false
  },
  food_id:{
    type: Array,
    unique: true,
    required: true
  },
  food_name: {
    type: Array,
    required: true,
    default: "Soru"
  },  
  food_image: {
    type: Array,
    required: true,
    default: "NTS"
  },
  user_id: {
    type: Number,
    required: true
  },
  price: {
    type: Array,
    required:true
  },
  provider_mobile_number: {
    type: Array,
    required: true
  },
  delivery_address: {
    type: String,
    required: true
  },
  provider_id: {
    type: Array,
    required: true
  },
  quantity: {
    type: Array,
    required: true
  },
  user_mobile_number: {
    type: Number,
    required: true
  },
  order_status: {
    type: String,
    required: true,
    default: "orderd"
  },
  payment_option: {
    type: String,
    required: false
  },
  invoice_number: {
    type: Number,
    required: false
  },
  delivered_on: {
    type: String,
    required: false
  },
  total_price: {
    type: Number,
    required: false
  },
  user_email :{
    type:String,
    required:true
  },
  indexOf: {
    type: Array,
    required:true
  },
  

}, { timestamps:true,collections: 'order',usePushEach: true});

orderSchema.plugin(AutoIncrement, {inc_field: 'order_id'});
module.exports = mongoose.model('order', orderSchema);
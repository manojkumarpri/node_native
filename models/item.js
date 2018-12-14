var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

var itemSchema = new Schema({

  food_id:{
    type: Number,
    unique: true,
    required: false
  },
  food_name: {
    type: String,
    required: true,
    default: "Soru"
  },
  food_image : {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true
  },
  breakfast: {
    type: Boolean,
    required: true
  },
  lunch: {
    type: Boolean,
    required: true
  },
  dinner: {
    type: Boolean,
    required: true
  },
  price: {
    type: Number,
    required: true,
    default: 50
  }


}, { timestamps: true, collection: 'foods',usePushEach: true });

itemSchema.plugin(AutoIncrement, {inc_field: 'food_id'});
module.exports = mongoose.model('foods', itemSchema);
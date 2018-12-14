var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);
var userSchema = new Schema({
  user_id: {
    type: Number,
    unique: true,
    required: false
  },
  username: {
    type: String,
    required: true
    
  },
  mobile_number: {
      type: Number,
      required: true
      
  },
  email: {
    type: String,
    required: true
    
  },
  address: {
    type: String,
    required: true
    
  },
  password: {
    type: String,
    required: true
 
  },
  security_question: {
    type: String,
    required: true
  
  },
  security_answer: {
    type: String,
    required: true
    
  },
  user_image:{
    type:String,
    required:false,
    default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog"
  }
}, { timestamps:true,collection: 'Users',usePushEach: true });

userSchema.plugin(AutoIncrement, {inc_field: 'user_id'});
module.exports = mongoose.model('Users', userSchema);

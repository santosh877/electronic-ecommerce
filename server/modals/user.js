const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const userSchema =  new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true,
        index: true, //this is added to clear the database when it is reqires , by this we can clear the database efficiently
    },
    role: {
      type: String,
      default: 'Subscriber'
    },
    cart: {
        type: Array,
        default: []
    },
    address: String,
   // wishlist: [{type: ObjectId, ref: "Product" }]
   //if timestamps is true then created date and updated date will be auto populated automatically
}, {timestamps: true});

module.exports = mongoose.model('User', userSchema);
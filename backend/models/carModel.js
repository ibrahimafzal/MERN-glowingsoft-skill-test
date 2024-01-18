const mongoose = require('mongoose');

// Declare the Schema of the Mongo model
var carSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    condition: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    docs: {
        type: String
    },
    pics: [],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: "users"
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    }
});

//Export the model
module.exports = mongoose.model('cars', carSchema);
// same instance of mongoose is required...if mongoose is used at multiple places....this is done automatically by express
const mongoose = require('mongoose');

// Schema for data storage
const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String, 
        required: true
    }
});

// define/name the collection/model of the above schema in the database
const Contact = mongoose.model('Contact', contactSchema)

// export the collection in order to use it
module.exports = Contact;


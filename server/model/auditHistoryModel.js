const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name : {type: String, required:true},
    time : {type: Date, required:true},
    operation: {type: String, required:true}
})

module.exports = mongoose.model('Auditdb',schema);
const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    userId : {type : mongoose.Schema.Types.ObjectId,ref: "Userdb"},
    time : {type: Date, required:true},
    operation: {type: String, required:true}
})

module.exports = mongoose.model('Auditdb',schema);
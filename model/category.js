const mongoose = require('mongoose')
const adminUser = new mongoose.Schema({
    title:String,
    icon:String
},{versionKey:false,timestamps:{createdAt:'create_time',updatedAt:'update_time'}})

module.exports = mongoose.model('adminUser',adminUser)
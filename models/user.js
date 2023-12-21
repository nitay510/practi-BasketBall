const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
      },
      cityOfLiving:{
        type: String,
        required: false,
      },
      age:{
        type:String,
        required: false,
      },
  username: {
    type: String,
    required: true,
    unique: true
  }
})

const Users = mongoose.model('Users', userSchema)

module.exports = Users
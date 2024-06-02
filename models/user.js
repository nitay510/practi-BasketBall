const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  club: {
    type: String,
    required: false,
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  isCoach: {
    type: Boolean,
    required: true,
  }
})

const Users = mongoose.model('User', userSchema)

module.exports = Users

'use strict'
/**
 * Module Dependencies
 */
const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

let actorSchema = new Schema({
  actorId: {
    type: String,
    default: '',
    index: true
  },
  actorName: {
    type: String,
    default: '',
    require: true
  },
  actorSex: {
    type: String,
    default: '',
    require: true
  },
  credits: {
    type: Array,
    default: [],
  },
  actorDOB: {
    type: Date,
    default: ''
  },
  actorBio: {
    type: String,
    default: ''
  },
  createdOn: {
    type:Date,
    default:""
  }


})


mongoose.model('Actor', actorSchema);
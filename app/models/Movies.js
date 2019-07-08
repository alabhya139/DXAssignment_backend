'use strict'
/**
 * Module Dependencies
 */
const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

let moviesSchema = new Schema({
  movieId: {
    type: String,
    default: '',
    index: true
  },
  movieName: {
    type: String,
    default: '',
    require: true
  },
  yearOfRelease: {
    type: String,
    default: '',
    require: true
  },
  moviePlot: {
    type: String,
    default: ''
  },
  moviePoster: {
    type: String,
    default: ''
  },
  cast: {
    type: Array,
    default: []
  },
  createdOn: {
    type:Date,
    default:""
  }


})


mongoose.model('Movies', moviesSchema);
const express = require('express');
const router = express.Router();
const shortid = require('shortid');
const path = require('path');
const moviesController = require("../controllers/moviesController");
const appConfig = require("../../config/appConfig");

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, './uploads');
    },
    filename: function(req,file,cb){
        cb(null,shortid.generate()+file.originalname);
    }
});

const upload = multer({storage});


setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}/movies`;

    app.post(`${baseUrl}/save-movie`, upload.single('moviePoster'), moviesController.saveMovies);

    app.get(`${baseUrl}/get-movies`, moviesController.getMovies)

}

module.exports = {
    setRouter
}
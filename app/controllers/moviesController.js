const mongoose = require('mongoose');
const shortid = require('shortid');
const responseLib = require('../libs/responseLib');

const MoviesModel = mongoose.model('Movies');

let saveMovies = (req, res, next) => {
    let body = req.body;

    console.log(req.file)

    let movie = new MoviesModel(body);

    movie.movieId = shortid.generate();
    movie.createdOn = Date.now();
    movie.moviePoster = req.file.path;

    movie.save()
        .then(data => {
            let movieData = data.toJSON();
            delete movieData.__v;
            delete movieData._id;
            let response = responseLib.generate(false, "Movie details saved successfully", 200, movieData);
            res.send(response);
        })
        .catch(error => {
            let response = responseLib.generate(true, "Some error occured", 400, error);
            res.send(response);
        });
}

let getMovies = (req, res) => {
    MoviesModel.find()
        .select('-__v -_id')
        .lean()
        .then(data => {
            let response = responseLib.generate(false, "Movies fetched successfully", 200, data);
            res.send(response);
        })
        .catch(error => {
            let response = responseLib.generate(true, "Some error occured", 400, error);
            res.send(response);
        })
}

let editMovieById = () => {
    let query = {
        movieId: req.query.movieId
    };
    let editData = req.body;
    ActorModel.findOneAndUpdate(query, editData, {
            new: true
        })
        .select("-__v -_id")
        .lean()
        .then(result => {
            let response = responseLib.generate(false, "Movie data edited succesfully", 200, result);
            res.send(response);
        })
        .catch(error => {
            let response = responseLib.generate(true, "Some error occured", 400, error);
            res.send(response);
        });
}




module.exports = {
    saveMovies,
    getMovies,
    editMovieById
}
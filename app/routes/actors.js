'use strict'

const express = require('express');
const router = express.Router();
const actorController = require("../controllers/actorController");
const appConfig = require("./../../config/appConfig")


let setRouter = (app) => {

    let baseUrl = `${appConfig.apiVersion}/actors`;

    app.post(`${baseUrl}/add-actors`,actorController.addActor);

    app.get(`${baseUrl}/get-actors`,actorController.getActors)

    app.get(`${baseUrl}/get-actor/:actorId`,actorController.getActorById)

    app.post(`${baseUrl}/edit-actor`,actorController.editActorById);

    app.get(`${baseUrl}/search_actors`, actorController.searchActor);
}

module.exports = {
    setRouter
}
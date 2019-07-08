const mongoose = require('mongoose');
const shortid = require('shortid');
const responseLib = require('../libs/responseLib')

/* Models */
const ActorModel = mongoose.model('Actor')

let addActor = (req, res) => {
    let body = req.body;

    let actor = new ActorModel(body);

    actor.actorId = shortid.generate();
    actor.createdOn = Date.now();

    actor.save()
        .then(data => {
            let actorData = data.toJSON();
            delete actorData.__v;
            delete actorData._id;
            let response = responseLib.generate(false, "Actor details saved successfully", 200, actorData);
            res.send(response);
        })
        .catch(error => {
            let response = responseLib.generate(true, "Some error occured", 400, error);
            res.send(response);
        });
}

let getActors = (req, res) => {
    ActorModel.find()
        .select('-__v -_id')
        .lean()
        .then(data => {
            let response = responseLib.generate(false, "Actor fetched successfully", 200, data);
            res.send(response);
        })
        .catch(error => {
            let response = responseLib.generate(true, "Some error occured", 400, error);
            res.send(response);
        })
}

let getActorById = (req, res)=>{
    let query = {actorId: req.params.actorId}
    ActorModel.findOne(query)
    .select("-__v -_id")
    .lean()
    .then(result=>{
        let response = responseLib.generate(false, "Actor data fetched succesfully", 200, result);
        res.send(response);
    })
    .catch(error=>{
        let response = responseLib.generate(true, "Some error occured", 400, error);
        res.send(response);
    })
}

let editActorById = (req, res) => {
    let query = {
        actorId: req.query.actorId
    };
    let editData = req.body;
    ActorModel.findOneAndUpdate(query, editData, {
            new: true
        })
        .select("-__v -_id")
        .lean()
        .then(result => {
            let response = responseLib.generate(false, "Actor data edited succesfully", 200, result);
            res.send(response);
        })
        .catch(error => {
            let response = responseLib.generate(true, "Some error occured", 400, error);
            res.send(response);
        });
}

let searchActor = (req, res)=>{
    ActorModel.find({actorName: {$regex: new RegExp(req.query.q),$options: 'i'}})
    .then(result=>res.send(result))
}


module.exports = {
    addActor,
    getActors,
    editActorById,
    getActorById,
    searchActor
} // end exports
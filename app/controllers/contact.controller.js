const { message } = require("statuses");
const ApiError = require("../api-error");
const ContactService = require("../services/contact.service");
const ContactService = require("../services/contact.service");
const ContactService = require("../services/contact.service");
const MongoDB = require("../utils/mongodb.util");
const ContactService = require("../services/contact.service");
const ContactService = require("../services/contact.service");
const ContactService = require("../services/contact.service");

exports.create =async(req, res, next) => {
    if(!req.body?.name){
        return next(new ApiError(400, "Name can not be empty"));
    }
    try{
        const ContactService =new ContactService(MongoDB.client);
        const document =await ContactService.create(req.body);
        return res.send(document);
    }catch(error){
        return next(
            new ApiError(500, "An error occurred wwhile creating the contact")
        );
    }
};
exports.findAll =async (req, res, next) => {
    let document = [];
    try{
        const ContactService = new ContactService(MongoDB.client);
        const {name} = req.query;
        if (name) {
            document = await ContactService.findByName(name);
        } else{
            document = await ContactService.find({});
        }
    }catch (error){
        return next (
            new ApiError(500, "An error occerred wwhile retrieving contacts")
        );
    }
    return res.send(document);
};
exports.findOne = async (req, res, next) => {
    try{
        const ContactService = new ContactService(MongoDB.client);
        const document = await ContactService.findById(req.parmas.id);
        if(!document) {
            return next(new ApiError(400, "Conntact not found"));
        }
        return res.send(document);
    }catch (error){
        return next(
            new ApiError(
                500,
                'Erro retrieving contact with id =${req.params.id'
            )
        );
    }

};
exports.update =async (req, res, next) => {
    if(Object.keys (req.body).length == 0){
        return next(new ApiError(400, "Data to update can not be empty"));       
    }
    try {
        const ContactService = new ContactService(MongoDB.client);
        const document =await ContactService.update(req.parmas.id, req.body);
        if (!document){
            return next(new ApiError(404, "Contact not found"));
        }
        return res.send({ message: "Contact was update successfully"});
    }catch (error){
        return next(
            new ApiError(500, 'Error updating contact with id =${req.params.id}')
        );
    }
};
exports.delete = async (req, res, next) => {
    try {
        const ContactService = new ContactService(MongoDB.client);
        const document = await ContactService.delete(req.params.id);
        if (!document) {
            return next( new ApiError(404, "Contact not found"));
        }
        return res.send({ message: "Contact was deleted succsessfully"});
    }catch (error){
        return next(new ApiError ( 500, 'Could not delete contact with id =${req.pqrams.id'));

    }
};
exports.deleteAll= async(req, res, next) => {
    try {
        const ContactService = new ContactService(MongoDB.client);
        const deletedCount = await ContactService.deleteAll();
        return res.send({
            message: '${deletedCount} contacts were deleted successfully',
        });
    }catch (error) {
        return next (
            new ApiError (500, "An error occurred while removing all contacts")
        );
    }
};
exports.findAllFavorite =async (req, res, next) => {
    try {
        const ContactService = new ContactService(MongoDB.client);
        const document = await ContactService.findAllFavorite();
        return res.send(document);
    }catch (error) {
        return next(
            new ApiError(
            500, 
            "An error occurred while retrieving favorite contacts"
        )
    );
    }
};
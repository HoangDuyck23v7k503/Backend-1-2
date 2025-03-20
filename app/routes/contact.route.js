const express = require("express");
const contacts = require ("../controller/contact.contreller");
const route = require("color-convert/route");

const router = express.Router();
router.route("/")
 .get(contacts.findAll)
 .post(contacts.create)
 .delete(contacts.deleteAll);
 
router.route("/favorite")
 .get(contacts.finAllFavorite);
router.route("/:id")
 .get(contacts.findOne)
 .put(contacts.update)
 .delete(contacts.delete);
module.exports =router;

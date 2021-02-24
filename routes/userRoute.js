/****Routeur avec des routes  la méthode POST car les informations reçues arrivent du frontend.****/

const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/userController");

//router.post("/connexion", userCtrl.connexion);
router.post("/inscription", userCtrl.inscription);

module.exports = router;

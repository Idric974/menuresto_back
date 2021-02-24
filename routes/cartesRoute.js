const express = require("express");
const router = express.Router();

const cartesCtrl = require("../controllers/cartesController");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

router.post("/", auth, multer, cartesCtrl.create);
// router.get("/", auth, saucesCtrl.getAllSauces);
// router.get("/:id", auth, saucesCtrl.getOneSauces);
// router.put("/:id", auth, multer, saucesCtrl.modifySauces);
// router.delete("/:id", auth, saucesCtrl.deleteSauces);

// router.post("/:id/like", auth, saucesCtrl.likesSauces);

module.exports = router;

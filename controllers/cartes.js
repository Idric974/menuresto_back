//*✅👉Implémentation des routes CRUD (Create, Read, Update, Delete)

//*✅👉 Configuration.
const Sauces = require("../models/Sauces");
const fs = require("fs");
const { post } = require("../routes/User");
//*➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖

//*✅👉Create : créer une nouvelle carte
exports.create = (req, res, next) => {
  const cartesObject = JSON.parse(req.body.carte);

  const cartes = new Cartes({
    ...saucesObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });
  console.log(cartes.imageUrl);
  cartes.save(function (err, b) {
    if (err) {
      console.log("#########", err);
      res.status(400).json({
        error: err,
      });
    } else {
      console.log(b);
      res.status(201).json({
        message: "😃➖➖➖➖➖➖► Cartes crée",
      });
    }
  });
};
//*➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { models } = require("mongoose");
const User = require("../models/userModel");

//*✅👉 Marquer l'adresse email de l'utilisateur
const mask = (str) => {
  let output = "";
  for (let i = 0; i < str.length; i++) {
    if (i < str.length / 2) {
      output += str[i];
    } else {
      output += "*";
    }
  }
  return output;
};

const maskEmail = (emailstr) => {
  const emailParts = emailstr.split("@");
  const leftPart = mask(emailParts[0]);
  const rightPart = mask(emailParts[1]);
  return leftPart + "@" + rightPart;
};
//*➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖

//*✅👉Mot de passe crypté grâce au package bcrypt
exports.inscription = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
        firstname: req.body.firstname,
        name: req.body.name,
      });

      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
//*➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖

//*✅👉Fonction qui permet aux utilisateurs existants de se connecter
exports.connexion = (req, res, next) => {
  console.log("Salut");
  console.log(maskEmail(req.body.email));
  userRoute
    .findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res
          .status(401)
          .json({ error: " ❌❌❌ 😥➖➖➖➖➖➖► Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({
              error: " ❌❌❌ 😥➖➖➖➖➖➖► Mot de passe incorrect !",
            });
          }
          res.status(200).json({
            userEmail: maskEmail(req.body.email),
            userId: user._id,
            token: jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
//*➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖

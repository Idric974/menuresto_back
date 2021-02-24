const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const helmet = require("helmet");
app.use(helmet());
//*➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖

//*✅👉 Constantes de routes.
const cartesRoutes = require("./routes/cartesRoute");
const userRoutes = require("./routes/userRoute");
//*➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖

//*✅👉Middleware généraliste qui reçoit et traite toutes les requêtes
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});
//*➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖

//*✅👉Permet la connexion à la base de données  MongodB
mongoose;
mongoose
  .connect(
    "mongodb+srv://idric_evarne:" +
      process.env.MONGO_DB_PW +
      "@cluster0.ojpbr.mongodb.net/menurestodb?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() =>
    console.log("✔️  ✔️  ✔️  😃 ➖➖➖➖➖➖► Connexion à MongoDB réussie ❕❗")
  )
  .catch(() =>
    console.log("❌❌❌ 😥 ➖➖➖➖➖➖► Connexion à MongoDB échouée ❓❓")
  );

//*➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖

//*✅👉Transforme le corps de la requête en objet JSON utilisable
app.use(bodyParser.json());
//*➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖

//*✅👉 Routes principales.
// app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/cartesRoute", cartesRoutes);
app.use("/api/userRoute", userRoutes);
//*➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖

module.exports = app;

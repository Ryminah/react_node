var cors = require("cors");
const express = require("express");
const app = express();
const port = 3001;
const jwt = require("jsonwebtoken")
const users = require("./routes/users");
app.use(express.json());
var bodyParser = require("body-parser");
app.set("secretKey", "nodeRestApi"); // jwt secret token

// configure the app to use bodyParser()
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(cors());
app.use("/users", users);

app.get("/sorties", async (req, res) => {
  try {
    const result = await fetch("http://localhost:8081/sorties");
    const json = await result.json();
    res.send(json);
  } catch (e) {
    res.status(500).send("Erreur récupération API Sorties");
  }
});
app.get("/", validateUser, validateStatus, (req, res) => { //app.get "/", middleswares( fonctions permettant de protéger l'exécution de la suite )
  res.json("Bienvenue sur le serveur NodeJS! Vous êtes connecté !");
});
function validateUser(req, res, next) { // fonction faisant office de middleware, permet de vérifier si le token est valide avant d'éxécuter la suite, bloque sinon
  jwt.verify(
      req.headers["x-access-token"],
      req.app.get("secretKey"),
      function (err, decoded) {
          if (err) {
              res.status(401);
              res.json({
                  status: "error pas les droits",
                  message: decoded,
                  data: null,
              });
          } else {
              // add user id to request
              req.body.cpt_statut = decoded.cpt_statut;
              console.log("l'utilisateur possède les droits")
              next();
          }
      }
  );
}

function validateStatus(req, res, next){
  next()
}
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

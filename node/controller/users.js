const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const connection = mysql.createConnection({
  host: "obiwan.univ-brest.fr",
  user: "zcharpiar",
  password: "udkx8m97",
  database: "zfm1-zcharpiar_1",
});

module.exports = {
  register: function (req, res, next) {
    try{
      const email = req.body.cpt_mail
      const mdp = bcrypt.hashSync(req.body.cpt_mdp, saltRounds)
      const prenom = req.body.cpt_prenom
      const nom = req.body.cpt_nom
      const pseudo = req.body.cpt_pseudo
      if (pseudo && mdp && prenom && nom && email) {
       connection.query(
          `INSERT INTO compte_cpt (cpt_pseudo, cpt_mdp, cpt_statut, cpt_nom, cpt_prenom, cpt_mail) VALUES ('${pseudo}','${mdp}','U','${nom}','${prenom}','${email}')`,
          (err, rows, fields) => {
            if (!err) {
              res.json({ status: "Compte créer", data: {user:rows[0]}});
            }else{
                res.send("Compte non créer, erreur => ", err)
            }
          }
        );
    }
  } catch(e){
    console.log("ICI Erreur Inscription", e)
    res.status(401);
    res.json({
      status: "error",
      message: "Inscription erreur",
      data: null
  })}
},
  authenticate: function (req, res, next) {
    try {
        const pseudo = req.body.cpt_pseudo
        const mdp = req.body.cpt_mdp
        console.log(req.body)
      if (pseudo && mdp) {
        connection.query(
            
          `SELECT * from compte_cpt WHERE cpt_pseudo = "${pseudo}"`,
          (err, rows, fields) => {
            if (rows[0] && bcrypt.compareSync(mdp, rows[0].cpt_mdp)) {
                const token = jwt.sign(
                    {
                        id: rows[0].cpt_id,
                        pseudo: rows[0].cpt_pseudo,
                        email: rows[0].cpt_mail,
                        statut: rows[0].cpt_statut,
                        prenom : rows[0].cpt_prenom,
                        nom : rows[0].cpt_nom
                    },
                    req.app.get("secretKey"),
                    { expiresIn: "7d" }
                );
              res.json({ status: "ok", data: {user:rows[0], token:token}});
            }else{
                res.send("KO")
            }
          }
        );
      } else {
        res.status(401);
        res.json({
          status: "error",
          message: "Invalid email/password!!!",
          data: null,
        });
      }
    } catch (e) {
      res.status(401);
      res.json({
        status: "error",
        message: "Invalid email/password!!!",
        data: null,
      });
    }
  },
};

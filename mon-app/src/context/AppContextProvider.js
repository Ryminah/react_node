import React, { createContext, useState } from "react";
import * as jose from "jose";
const DEFAULT_USER = {
  pseudo: "",
  email: "",
  statut: "",
  prenom: "",
  nom: "",
};
export const AppContext = createContext();
//permet de décoder le token jwt afin de récupérer les données qui ont été encodés depuis node(back) sous forme de token
const decode = (token) => {
  try {
    if (token) {
      const claims = jose.decodeJwt(token);
      return claims;
    }
    return DEFAULT_USER;
  } catch (e) {
    console.log(e);
    return DEFAULT_USER;
  }
};
// Contexte permettant de récupérer des fonctions et des données dans toute l'application (car children = App ) il suffit des les exporter
//dans le defaultContext
export default function AppContextProvider({ children }) {
  const [user, setUser] = useState(decode(localStorage.getItem("token"))); // Au lancement de l'app, exécution de la fonction décode afin d'assigner les valeurs dans l'app

  function logout(){
    localStorage.removeItem("token")
    setUser(DEFAULT_USER)
  }
  function login(data) {
    localStorage.setItem("token", data.token); // permet de stocker dans le localstorage du navigateur le token contenant les informations de l'user (loggés auparavant sur le front)
    // tokenisé dans le back(node)
    setUser({
      pseudo: data.user.cpt_pseudo,
      email: data.user.cpt_mail,
      statut: data.user.cpt_statut,
      prenom: data.user.cpt_prenom,
      nom: data.user.cpt_nom,
    });
    
  }

  function register(data){

  }
  const defaultContext = {
    user,
    login,
    logout,
    register
  };

  return (
    <AppContext.Provider value={defaultContext}>{children}</AppContext.Provider>
  );
}

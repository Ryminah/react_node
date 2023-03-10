import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContextProvider";

export default function Home() {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();
  const [sorties, setSorties] = useState([]);
  const getSorties = async () => {
    const result = await fetch("http://localhost:3001/sorties");
    const json = await result.json();
    setSorties(json);
  };
  const addSortie = () => {
    setSorties([...sorties, { nom: "mouche", prenom: "tom" }]);
  };
  useEffect(() => {
    getSorties();
    console.log(user);
  }, []);
  useEffect(() => {
    // console.log(...sorties);
  }, [sorties]);

  async function handleClick() {
    const result = await fetch("http://localhost:3001/", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    });
    const json = await result.json();
    console.log(json);
  }
  return (
    <div className="container mt-3">
      <h1>Accueil </h1>
      <ul>
        {sorties &&
          sorties.length > 0 &&
          sorties.map((sortie, index) => {
            return (
              <li>
                Lieu : {sortie.lieu}, Date : {sortie.date}
              </li>
            );
          })}
      </ul>
      {user.prenom ? (
        <>
          <p>
            Bonjour {user.prenom} {user.nom} !
          </p>
          <button onClick={handleClick}>Envoi requête connecté</button>
        </>
      ) : (
        // Bien utiliser <></> car après les : tout doit etre englober dans un seul parent
        <>
          <p>Connectez vous ! </p>
          <button className="btn btn-dark" onClick={() => navigate("/login")}>
            Connexion
          </button>
          <br></br>
          <button onClick={handleClick} className="btn btn-dark">
            Envoie requête non connecté{" "}
          </button>
        </>
      )}
    </div>
  );
}

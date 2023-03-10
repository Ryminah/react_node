  import { useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContextProvider";

export default function Register() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const nomRef = useRef();
  const prenomRef = useRef();
  const pseudoRef = useRef();
  const navigate = useNavigate();
  const { login } = useContext(AppContext);
 
 
  async function handleSubmit(event) {
    event.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const nom = nomRef.current.value;
    const prenom = prenomRef.current.value;
    const pseudo =  pseudoRef.current.value;
    const result = await fetch("http://localhost:3001/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: new URLSearchParams({
        cpt_pseudo: pseudo,
        cpt_mdp: password,
        cpt_nom: nom,
        cpt_prenom: prenom,
        cpt_mail:email
      }),
    });
    const res = await result.json();
    console.log(res)
    if (res.status !== "ok") return;
    navigate("/login");
  }
  return (
    <div className="container mt-3">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">
            Adresse email
          </label>
          <input
            ref={emailRef}
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">
            Mot de passe
          </label>
          <input
            ref={passwordRef}
            type="password"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">
            Prénom
          </label>
          <input
            ref={prenomRef}
            type="text"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">
            Nom
          </label>
          <input
            ref={nomRef}
            type="text"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">
            Pseudo
          </label>
          <input
            ref={pseudoRef}
            type="text"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          S'enregistrer
        </button>
      </form>
    </div>
  );
}

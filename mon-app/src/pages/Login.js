import { useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContextProvider";

export default function Login() {
  const pseudoRef = useRef();
  const navigate = useNavigate();
  const passwordRef = useRef();
  const { login } = useContext(AppContext);
  
  function handleSubmit(event) {
    event.preventDefault();
    const pseudo = pseudoRef.current.value;
    const password = passwordRef.current.value;
    _login(pseudo, password);
  }
  async function _login(pseudo, password) {
    const result = await fetch("http://localhost:3001/users/authenticate", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: new URLSearchParams({
        cpt_pseudo: pseudo,
        cpt_mdp: password,
      }),
    });
    const res = await result.json();
    console.log(res)
    if (res.status !== "ok") return;
    login(res.data);
    navigate("/");
  }
  return (
    <div className="container mt-3">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">
            Adresse email
          </label>
          <input
            ref={pseudoRef}
            type="text"
            value="Jerome"
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
            value="dz1a55az"
            ref={passwordRef}
            type="password"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Connexion
        </button>
      </form>
    </div>
  );
}

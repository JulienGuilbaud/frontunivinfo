import { useState, useEffect } from "react";
import { Header } from "../../Header";
import { Main } from "../../Main";
import { Footer } from "../../Footer";
import { LinkButton } from "../../LinkButton";


export function Admin() {
  const [users, setUsers] = useState([]);

  const dosearch = async () => {
    try {
      const address = "http://julienguilbaud-server.eddi.cloud:8080/api/users/details";
      const response = await fetch(address);
      const data = await response.json();
      console.log(data);
      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    dosearch();
  }, []);

  const getYesOrNo = (value) => (value ? "Oui" : "Non");


  return (
    <>
      <Header />
      <Main title="Administrateur">
        {/* Affichez la liste des utilisateurs */}
        <section className="container-admin">
        {users.map((user,index) => (
          <article className="box-admin"key={user.id}>
            <h2>Utilisateur n°{index+1}</h2>
          <ul className="card-admin">
                <li className="item-admin"><strong>Nom:</strong> {user.lastname}</li>
                <li className="item-admin"><strong>Prénom:</strong> {user.firstname}</li>
                <li className="item-admin"><strong>Mot de passe:</strong> {user.password}</li>
                <li className="item-admin"><strong>Email:</strong> {user.email}</li>
                <li className="item-admin"><strong>Fonction:</strong> {user.Groupe.fonction}</li>
                <li className="item-admin">
                <LinkButton link={"http://localhost:1234/userUpdate/"+user.id} value={"Modifier"}  />
                  <strong className="item-admin">Autorisation:</strong>
                  <ul className="card-admin">
                    <li className="item-admin">Créer: {getYesOrNo(user.Groupe.Authorisation.make)}</li>
                    <li className="item-admin">Modifier: {getYesOrNo(user.Groupe.Authorisation.edit)}</li>
                    <li className="item-admin">Supprimer: {getYesOrNo(user.Groupe.Authorisation.suppress)}</li>
                  </ul>
                </li>
          </ul>
          </article>
          ))}
          </section>
          <LinkButton link={"http://localhost:1234/userCreate"} value={"Créer un utilisateur"}  />
          <LinkButton link={"http://localhost:1234/groupeCreate"} value={"Créer un groupe"}  />
      </Main>
      <Footer />
    </>
  );
}
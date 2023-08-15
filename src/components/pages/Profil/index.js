import { Header } from "../../Header";
import { Main } from "../../Main";
import { useAuth } from '../../../AuthContext.js';

export function Profil() {
    const userName = useAuth();
    
    const getYesOrNo = (value) => (value ? "Oui" : "Non");

    return(
        <>
        <Header />
        <Main title={"details profil utilisateur"}>
        <div className="details-contenair">
                    <article className="details-box">
                        <h2 className="details-box-title">Info</h2>
                        <ul className="details-card">
                            <li className="details-item">Prénom : {userName.user.firstname}</li>
                            <li className="details-item">Nom : {userName.user.lastname}</li>
                            <li className="details-item">Fonction : {userName.user.fonction}</li>
                        </ul>
                    </article>

                    <article className="details-box">
                        <h2 className="details-box-title">Autorisations:</h2>
                        <ul className="details-card">
                            <li className="details-item">Créer: {getYesOrNo(userName.user.make)}</li>
                            <li className="details-item">Modifier: {getYesOrNo(userName.user.edit)}</li>
                            <li className="details-item">Supprimer: {getYesOrNo(userName.user.suppress)}</li>
                        </ul>
                    </article>

   




 
                </div>
            

            
        </Main>
        </>
    )
}

// Ajouter les données d 'utilisateur 
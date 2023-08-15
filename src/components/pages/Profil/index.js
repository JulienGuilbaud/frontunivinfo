import { Header } from "../../Header";
import { Main } from "../../Main";
import { useAuth } from '../../../AuthContext.js';
import { useEffect, useState } from "react";

export function Profil() {
    const userName = useAuth();
    const [userData, setuserData] = useState({});
    const doSearchForUser = async () => {
        try {
            setuserData([]);
            const address = "https://guilbaud.alwaysdata.net/api/user/" + userName.user.id
            const response = await fetch(address);
            const data = await response.json();
            setuserData(data);
            console.log(userData);

        } catch (error) {
            console.error(error);
            alert('Erreur lors de la récupération des résultats');
        }
    };
    useEffect(() => {

        doSearchForUser();
    }, []);

    const getYesOrNo = (value) => (value ? "Oui" : "Non");

    return (
        <>
            <Header />
            <Main title={"details profil utilisateur"}>
                <div className="details-contenair">
                    <article className="details-box">
                        <h2 className="details-box-title">Info</h2>
                        <ul className="details-card">
                            <li className="details-item">Prénom : {userData.firstname}</li>
                            <li className="details-item">Nom : {userData.lastname}</li>
                            <li className="details-item">Email : {userData.email}</li>
                        </ul>
                    </article>
                </div>
            </Main>
        </>
    )
}
 
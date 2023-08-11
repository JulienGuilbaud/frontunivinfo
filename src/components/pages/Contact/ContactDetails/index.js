
import { Header } from "../../../Header";
import { Main } from "../../../Main";
import { LinkButton } from "../../../LinkButton";
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Footer } from '../../../Footer';
import { DeleteButton } from "../../../DeleteButton";  

export function ContactDetails() { 
    const params = useParams()//permet de récupéré notre id de l'url 
    const [contactData, setcontactData] = useState([]);

    const doSearch = async () => {
        try {
            setcontactData([]);
            const adresse = "https://dcb5-2a01-cb19-846-c300-8d4a-62a5-b80f-35c9.ngrok-free.app/api/contact/details/" + params.id
            const response = await fetch(adresse);
            const data = await response.json();
            setcontactData(data);

        } catch (error) {
            console.error(error);
            alert('Erreur lors de la récupération des résultats');
        }
    };

    useEffect(() => {
        doSearch();
    }, []);



    return (
        <>
            <Header />
            <Main title='Détails du contact' className="main-contenair">
                <div className="details-contenair">
                    <article className="details-box">
                        <h2 className="details-box-title">Etat civil :</h2>
                        <ul className="details-card">
                            <li className="details-item">{contactData.title}</li>
                            <li className="details-item">{contactData.lastname}</li>
                            <li className="details-item">{contactData.firstname}</li>
                        </ul>
                    </article>

                    <article className="details-box">
                        <h2 className="details-box-title">Adresse :</h2>
                        <ul className="details-card">
                            <li className="details-item">{contactData.address}</li>
                        </ul>
                    </article>

                    <article className="details-box">
                        <h2 className="details-box-title">Communication :</h2>
                        <ul className="details-card">
                            <li className="details-item">{contactData.actif ? (`actif`) : (`inactif`)}</li>
                            <li className="details-item">FIX: <a href={contactData.work_phone}>{contactData.work_phone}</a></li>
                            <li className="details-item">PORTABLE: <a href={contactData.cellphone}>{contactData.cellphone}</a></li>
                            <li className="details-item">MAIL: <a href={contactData.email}>{contactData.email}</a></li>
                            <li className="details-item">RESAUX SOCIAUX: <a href={contactData.networks} target="_blank" rel="noopener noreferrer">{contactData.networks}</a></li>
                        </ul>
                        <LinkButton link={"/exchangeDetails/" + contactData.id} value={"Voir tout les échanges"} />
                        <LinkButton link={"/exchangeCreate/" + contactData.id} value={"Ajouter un échange"} />
                    </article>

                    <article className="details-box">
                        <h2 className="details-box-title">Entreprise :</h2>
                        {contactData.Binds ? (
                            <ul className="details-card">

                                {contactData.Binds.map((bind) => (
                                    <li key={bind.id}>
                                        <Link to={`/tiersDetails/${bind.Tier.id}`}>{bind.Tier.social_reason}</Link>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>Aucune entreprise trouvée.</p>
                        )}

                        <LinkButton link={`/contactAddTiers/${contactData.id}`} value="Ajouter un tier" />

                    </article>

                    <article className="details-box">
                        <h2 className="details-box-title">Données personnelle :</h2>
                        <p>{contactData.personal_data}</p>

                    </article>
                    <div className="details-box">
                        <ul className="details-card">
                            <li className="details-item">Date de création: {new Date(contactData.createdAt).toLocaleString('fr-FR')} </li>
                            <li className="details-item">Date du dernier changement : {new Date(contactData.updatedAt).toLocaleString('fr-FR')}</li>
                        </ul>
                    </div>
                </div>


                <LinkButton link={`/contactUpdate/${contactData.id}`} value="Modifier le contact" />

                 
            </Main >
            <Footer />

        </>
    )
}

// manque le style , ajouter le button pour exporter un contact , le statut de prise de contact (pas contacté , en cours  et contacté )
// ajouter lien vers historique des msg
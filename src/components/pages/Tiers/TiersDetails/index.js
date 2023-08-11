
import { Link } from 'react-router-dom';
import { Header } from "../../../Header";
import { LinkButton } from "../../../LinkButton";
import { Main } from "../../../Main";
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Footer } from '../../../Footer';

export function TiersDetails() {
    const params = useParams();
    const [tiersData, setTiersData] = useState([]);


    const doSearch = async () => {
        try {
            setTiersData([]);
            const adresse = "https://dcb5-2a01-cb19-846-c300-8d4a-62a5-b80f-35c9.ngrok-free.app/api/tier/details/" + params.id;
            const response = await fetch(adresse);
            const data = await response.json();
            setTiersData(data);
            console.log(data);

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
            <Main title={`Consultation de la fiche tier ${tiersData.social_reason} : `} className="main-contenair" key="tiersData.id">
                <section className='details-container'>

                    <article className='details-box'>
                        <h2 className='details-box-title'>Détails:</h2>
                        <ul className='details-card'>
                            <li className='details-item'>Raison sociale : {tiersData.social_reason}</li>
                            <li className='details-item'>Statut juridique : {tiersData.judicial_status} </li>
                            <li className='details-item'>Catégorie : {tiersData.category} </li>
                            <li className='details-item'>Actif ou non-actif : {tiersData.actif ? (`actif`) : (`inactif`)}</li>
                            <li className='details-item'>Pays : {tiersData.country}</li>
                            <li className='details-item'>Adresse : {tiersData.address} </li>
                            <li className='details-item'>Téléphone : <a href={tiersData.phone}>{tiersData.phone}</a> </li>
                            <li className='details-item'>Mail : <a href={tiersData.email}>{tiersData.email}</a> </li>
                            <li className='details-item'>Site internet : <a href={tiersData.website} target="_blank" rel="noopener noreferrer">{tiersData.website} </a>  </li>
                            <li className='details-item'>Réseaux sociaux : <a href={tiersData.networks} target="_blank" rel="noopener noreferrer">{tiersData.networks} </a> </li>
                            <li className='details-item'>Numéro SIREN : {tiersData.siren} </li>
                            <li className='details-item'>Numéro SIRET : {tiersData.siret} </li>
                            <li className='details-item'>Code NAF : {tiersData.naf} </li>
                            <li className='details-item'>N° de TVA : {tiersData.vat} </li>
                            <li className='details-item'>Registre du commerce : {tiersData.commercial_register} </li>
                            <li className='details-item'>Effectif : {tiersData.staff} </li>
                        </ul>
                    </article>
                    <article className='details-box'>
                        <h2 className='details-box-title' >Contacts:</h2>
                        {tiersData.Binds && tiersData.Binds.length ? (
                            <ul className='details-card' >
                                {tiersData.Binds.map((bind, index) => (
                                    <li className='details-item' key={index} >
                                        <Link className='details-item' to={`/contactDetails/${bind.Contact.id}`}>
                                            {`${bind.Contact.title} ${bind.Contact.lastname} ${bind.Contact.firstname} ${bind.Contact.poste_fonction}`}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        ) : (<p>Aucun contact trouvé.</p>)}

                        <LinkButton link={`/tiersAddContact/${tiersData.id}`} value="Ajouter un contact" />

                    </article>
                    <article className='details-box'>
                        <h2 className='details-box-title'> Campagnes:</h2>
                        {tiersData.TierHasCampaigns && tiersData.TierHasCampaigns.length ? (
                            <ul className='details-card'>
                                {tiersData.TierHasCampaigns.map((element) => (
                                    <li className='details-item' key={element.Campaign.id}>
                                        <Link to={`/campaignDetails/${element.Campaign.id}`}>
                                            {element.Campaign.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>Aucune campagne trouvée.</p>
                        )}

                        <LinkButton link={`/tiersAddCampaigns/${tiersData.id}`} value="Ajouter une campagne" />

                    </article>
                    <article className='details-box'>
                        <ul className='details-card'>
                            <li className='details-item'>Date de création: {new Date(tiersData.createdAt).toLocaleString('fr-FR')} </li>
                            <li className='details-item'>Date du dernier changement : {new Date(tiersData.updatedAt).toLocaleString('fr-FR')}</li>
                        </ul>
                    </article>

                </section>

                <LinkButton link={`/tiersUpdate/${tiersData.id}`} value="Modifier le tier" />

            </Main>
            < Footer />
        </>

    )
}
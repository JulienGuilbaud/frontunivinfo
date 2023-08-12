// ajouter de quoi modifier les données d'un campagn
import { Header } from "../../../Header";
import { Main } from "../../../Main";
import { Footer } from "../../../Footer";
import { LinkButton } from "../../../LinkButton";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";



export function CampaignDetails() {
    const params = useParams()
    const [campaignData, setCampaignData] = useState([]);

    const doSearch = async () => {
        try {

            setCampaignData([]);
            const address = "https://guilbaud.alwaysdata.net/api/campaigns/details/" + params.id;
            const response = await fetch(address);
            const data = await response.json();
            setCampaignData(data);
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
            <Main title={`Details de campagne  :`} >
                <section>
                    <article className='details-box'>
                        <h2 className='details-box-title'>Campagne: {campaignData.name} </h2>
                        <ul className='details-card'>
                            <li className='details-item'>Type : {campaignData.type} </li>
                            <li className='details-item'>Description : {campaignData.description}</li>
                        </ul>
                    </article>
                    <article className='details-box'>
                        <h2 className='details-box-title' >Utilisateur:</h2>
                        {campaignData.UserHasCampaigns && campaignData.UserHasCampaigns.length ? (
                            <ul className='details-card' >
                                {campaignData.UserHasCampaigns.map((element, index) => (
                                    <li className='details-item' key={index} >
                                        {element.User.firstname} {element.User.lastname}
                                    </li>
                                ))}
                            </ul>
                        ) : (<p className='details-item'>Aucun utilisateur trouvé.</p>)}

                    </article>
                    <article className='details-box'>
                        <h2 className='details-box-title' >Tier:</h2>
                        {campaignData.TierHasCampaigns && campaignData.TierHasCampaigns.length ? (
                            <ul className='details-card' >
                                {campaignData.TierHasCampaigns.map((element, index) => (
                                    <li className='details-item' key={index} >
                                          {element.Tier.social_reason}
                                    </li>
                                ))}
                            </ul>
                        ) : (<p className='details-item'>Aucun tier trouvé.</p>)}

                    </article>
                    <article className='details-box' >
                        <h3 className='details-box-title'>Message :</h3>
                        
                            <ul className="details-card">
                               
                                   <li className="details-item" >
                                        { campaignData.message || "aucun message"}
                                   </li> 
                            
                            </ul>
                         

                    </article>
                    <article>
                        <ul>
                            <li className='details-item'>Date de création: {new Date(campaignData.createdAt).toLocaleString('fr-FR')} </li>
                            <li className='details-item'>Date du dernier changement : {new Date(campaignData.updatedAt).toLocaleString('fr-FR')}</li>
                        </ul>
                    </article>
                </section>
            </Main>
            <Footer></Footer>
        </>
    );
}
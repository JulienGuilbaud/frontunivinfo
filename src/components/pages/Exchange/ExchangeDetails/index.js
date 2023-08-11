import { Header } from "../../../Header";
import { Main } from "../../../Main";
import { Footer } from "../../../Footer";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LinkButton } from "../../../LinkButton";


export function ExchangeDetails() {
    const params = useParams()
    const [exchangeData, setexchangeData] = useState([]);

    const doSearch = async () => {
        try {
            setexchangeData([]);
            const address = "http://julienguilbaud-server.eddi.cloud:8080/api/exchanges/details/" + params.contactid
            const response = await fetch(address);
            const data = await response.json();
            setexchangeData(data);
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
            <Main title={'Echange avec le contact'}>
                <section className="details-container">

                    {exchangeData && exchangeData.length ? (
                        exchangeData.map((element, index) => (
                            <article key={element.id} className="details-box">
                                <h2 className="details-box-title">Echange {index + 1}</h2>
                                <ul className="details-card">
                                    <li className="details-item">Echange entre {element.User.firstname} {element.User.lastname} et {element.Contact.title} {element.Contact.lastname} {element.Contact.firstname}</li>
                                    <li className="details-item">Contenu : {element.content}</li>
                                    <li className="details-item">Date de création : {new Date(element.createdAt).toLocaleString('fr-FR')}</li>
                                </ul>
                            </article>
                        ))
                    ) : (
                        <h2 className="details-box-title">Aucun échange</h2>
                    )}

                </section>

                <LinkButton link={"/exchangeCreate/" + params.contactid} value={"Ajouter un échange"} />


            </Main>
            <Footer />
        </>
    )

}

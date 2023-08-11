import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Header } from "../../../Header";
import { Main } from "../../../Main";
import { Footer } from "../../../Footer";
import { useAuth } from "../../../../AuthContext";


export function ExchangeCreate() {
    const [exchangeData, setexchangeData] = useState([]);
    const params = useParams()//permet de récupéré notre id de l'url
    const userName = useAuth();
    //on fabrique un objet vide avec nos attributs de table (a configurer)
    const [formData, setFormData] = useState({
        //
        UserId: userName.user.id,//mettre le token id ici 
        ContactId: params.contactid,
        content: ''
    });
    const doSearch = async () => {
        try {
            setexchangeData([]);
            const address = "http://julienguilbaud-server.eddi.cloud:8080/api/contact/" + params.contactid
            const response = await fetch(address);
            const data = await response.json();
            setexchangeData(data);
            console.log(data);
        } catch (error) {
            console.error(error);
            alert('Erreur lors de la récupération des résultats');
        }
    };

    // fonction qui récupére les entrées de nos inputs (boilerplate)
    const handleChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        // fonction qui isert nos donné dans notre objet créé plus haut(boilerplate)
        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                [name]: value
            };
        });
    };
    //fonction qui creer et envérra notre objet dans notre instance backend()
    const handleSubmit = async (event) => {
        event.preventDefault();
        const newObject = {
            UserId: userName.user.id,//mettre le token id ici 
            ContactId: params.contactid,
            content: formData.content,

        };
        console.log(newObject);

        try {
            const response = await fetch('http://julienguilbaud-server.eddi.cloud:8080/api/exchange/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newObject),
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.error);
            }

            const data = await response.json();

            alert(data.message);

            window.location.replace(`http://localhost:1234/exchangeDetails/` + params.contactid);
        } catch (error) {
            const formMessages = document.getElementById('form-messages');
            formMessages.classList.add("error-message")
            formMessages.innerText = error;
        }
    };


    useEffect(() => {
        doSearch();
    }, []);

    return (
        <>
            <Header />
            <Main title={"Echange"}>
                <form onSubmit={handleSubmit} className="formInput-container">
                    <fieldset className="formInput-box">
                        <legend> création d'un échange avec {exchangeData.title} {exchangeData.lastname}</legend>
                        <div aria-live="polite" id="form-messages" className=""></div>
                        <label className="formInput-card">
                            Contenu :
                            <input required type="text" name="content" value={formData.content} onChange={handleChange} className="formInput-item" />
                        </label>

                        <button type="submit" className="formSearch-item-button">Créer l'échange</button>

                    </fieldset>
                </form>

            </Main>
            <Footer />
        </>
    )
}
import { useState, useEffect } from "react";
import { useParams,Link } from 'react-router-dom';
import { Header } from "../../../Header";
import { Main } from "../../../Main";
import { Footer } from "../../../Footer";
import { useAuth } from "../../../../AuthContext";



export function ExchangeCreate() {
    const [formAlert, setFormAlert] = useState(false)
    const [newForm, setNewForm] = useState({})
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
            const address = "https://guilbaud.alwaysdata.net/api/contact/" + params.contactid
            const response = await fetch(address);
            const data = await response.json();
            setexchangeData(data);

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


        try {
            const response = await fetch('https://guilbaud.alwaysdata.net/api/exchange/create', {
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

            setNewForm(data)
            const formMessages = document.getElementById('form-messages');
            formMessages.classList.toggle("good-message")
            formMessages.innerText = data.message;
            setFormAlert(true)
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
                        <div aria-live="polite" id="form-messages" className="">
                            {formAlert && <Link to={"/exchangeDetails/"+newForm.contact.ContactId}> vers tout les échanges de ce contact</Link>}
                        </div>
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
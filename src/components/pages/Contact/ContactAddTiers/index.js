import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Footer } from "../../../Footer"
import { Header } from "../../../Header"
import { Main } from "../../../Main"




export function ContactAddTiers() {
    const [TierData, setTierData] = useState([]);
    const params = useParams()//permet de récupéré notre id de l'url
    //on fabrique un objet vide avec nos attributs de table (a configurer)
    const [formData, setFormData] = useState({
        TierId: 0,
        ContactId: params.contactId
    });
    const doSearch = async () => {
        try {
            setTierData([]);
            const address = "https://guilbaud.alwaysdata.net/api/tiers/"
            const response = await fetch(address);
            const data = await response.json();
            setTierData(data);
            console.log(data);
        } catch (error) {
            console.error(error);
            alert('Erreur lors de la récupération des résultats');
        }
    };

    // fonction qui récupére les entré de nos inputs (boilerplate)
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

            TierId: formData.TierId,
            ContactId: formData.ContactId

        };
        console.log(newObject);

         try {
            const response = await fetch('https://guilbaud.alwaysdata.net/api/bind/create', {
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

            window.location.replace(`/contactDetails/` + params.contactId);
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
        <Main title={"Ajouter un tier a notre contact"}>
            <form onSubmit={handleSubmit} className="formInput-container">
                <fieldset className="formInput-box">
                    <legend> sélection d'un tier </legend>

                    <div aria-live="polite" id="form-messages" className=""></div>

                    <label className="formInput-card">
                        Tier :
                        <select required name="TierId" className="formInput-item" value={formData.TierId} onChange={handleChange}>
                            <option>selectioner</option>
                            {TierData.map((element, index) => (
                                <option key={index} value={element.id} >
                                     {element.judicial_status} {element.social_reason} {element.address} {element.country}
                                </option>
                            ))}

                        </select>

                    </label>

                    <button type="submit" className="formSearch-item-button">Ajouter</button>

                </fieldset>
            </form>

        </Main>
        <Footer />
    </>
)
}
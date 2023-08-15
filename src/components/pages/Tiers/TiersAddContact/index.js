import { useState, useEffect } from "react";
import { useParams,Link } from "react-router-dom";
import { Footer } from "../../../Footer"
import { Header } from "../../../Header"
import { Main } from "../../../Main"




export function TiersAddContact() {
    const [formAlert, setFormAlert] = useState(false)
    const [newForm, setNewForm] = useState({})
    const [ContactData, setContactData] = useState([]);
    const params = useParams()//permet de récupéré notre id de l'url
    //on fabrique un objet vide avec nos attributs de table (a configurer)
    const [formData, setFormData] = useState({
        TierId: params.tierid,
        ContactId: 0
    });
    const doSearch = async () => {
        try {
            setContactData([]);
            const address = "https://guilbaud.alwaysdata.net/api/contacts/all"
            const response = await fetch(address);
            const data = await response.json();
            setContactData(data);
            
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

            setNewForm({})
            const data = await response.json();
            setNewForm(data)
            console.log(data);
            const formMessages = document.getElementById('form-messages');
            formMessages.classList.toggle("good-message")
            formMessages.innerText = data.message;
            setFormAlert(true)
        } catch (error) {
            const formMessages = document.getElementById('form-messages');
            formMessages.classList.toggle("error-message")
            formMessages.innerText = error;
        }
    };


    useEffect(() => {
        doSearch();
    }, []);
    return (
        <>
            <Header />
            <Main title={"Ajouter un contact à notre Tier"}>
                <form onSubmit={handleSubmit} className="formInput-container">
                    <fieldset className="formInput-box">
                        <legend> sélection d'un contact </legend>
                        <div aria-live="polite" id="form-messages" className="">
                            {formAlert && <Link to={"/tiersDetails/"+params.tierid}> vers tout les détails de ce tier</Link>}
                        </div>
                        <label className="formInput-card">
                            Contact :
                            <select name="ContactId" className="formInput-item" value={formData.ContactId} onChange={handleChange}>
                                <option>selectioner</option>
                                {ContactData.map((element, index) => (
                                    <option key={index} value={element.id} >
                                        {element.title} {element.lastname} {element.firstname} : {element.poste_fonction} : {element.address}
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
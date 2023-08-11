import { useState } from "react";
import { Header } from "../../../Header";
import { Main } from "../../../Main";
import { Footer } from "../../../Footer";
import { useParams } from "react-router-dom";

export function ContactCreate() {
    const params = useParams();
    const [formData, setFormData] = useState({
        title: '',
        firstname: '',
        lastname: '',
        work_phone: '',
        cellphone: '',
        email: '',
        networks: '',
        poste_fonction: '',
        address: '',
        personal_data: '',
        actif: true,
    });

    // fonction qui récupère les entrées de nos inputs (boilerplate)
    const handleChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        // fonction qui insert nos données dans notre objet créé plus haut(boilerplate)
        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                [name]: value
            };
        });
    };
    //fonction qui créer et enverra notre objet dans notre instance backend()
    const handleSubmit = async (event) => {
        event.preventDefault();
        const newObject = {
            title: formData.title,
            firstname: formData.firstname,
            lastname: formData.lastname,
            work_phone: formData.work_phone,
            cellphone: formData.cellphone,
            email: formData.email,
            networks: formData.networks,
            poste_fonction: formData.poste_fonction,
            address: formData.address,
            personal_data: formData.personal_data,
            actif: formData.actif,
        };
        
        try {
            const response = await fetch('http://julienguilbaud-server.eddi.cloud:8080/api/contact/create', {
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

            window.location.replace(`/contactDetails/` + data.contact.id);

        } catch (error) {
            
            const formMessages = document.getElementById('form-messages');
            formMessages.classList.add("error-message")
            formMessages.innerText = error;

        }
    }


    return (
        <>
            <Header />
            <Main title={"Créer une fiche contact"}>
                <form onSubmit={handleSubmit} className="formInput-container">
                    <fieldset className="formInput-box">
                        <legend>formulaire création contact</legend>

                        <div aria-live="polite" id="form-messages" className=""></div>

                        <label className="formInput-card">
                            Civilité :
                            <select name="title" className="formInput-item" value={formData.title} onChange={handleChange}>
                                <option value={""}>choisir</option>
                                <option value={"M."}>Monsieur</option>
                                <option value={"Mme."}>Madame</option>
                            </select>
                        </label>

                        <label className="formInput-card">
                            Prénom :
                            <input required type="text" name="firstname" value={formData.firstname} onChange={handleChange} className="formInput-item" />
                        </label>

                        <label className="formInput-card">
                            Nom de famille :
                            <input required type="text" name="lastname" value={formData.lastname} onChange={handleChange} className="formInput-item" />
                        </label>

                        <label className="formInput-card">
                            Téléphone poste :
                            <input type="tel" name="work_phone" value={formData.work_phone} onChange={handleChange} className="formInput-item" />
                        </label>

                        <label className="formInput-card">
                            Portable pro :
                            <input type="tel" name="cellphone" value={formData.cellphone} onChange={handleChange} className="formInput-item" />
                        </label>

                        <label className="formInput-card">
                            Email :
                            <input required type="email" name="email" value={formData.email} onChange={handleChange} className="formInput-item" />
                        </label>

                        <label className="formInput-card">
                            Réseaus sociaux :
                            <input type="url" name="networks" value={formData.networks} onChange={handleChange} className="formInput-item" />
                        </label>

                        <label className="formInput-card">
                            Adresse complète :
                            <input type="text" name="address" value={formData.address} onChange={handleChange} className="formInput-item" />
                        </label>

                        <label className="formInput-card">
                            Données personnelle :
                            <input type="text" name="personal_data" value={formData.personal_data} onChange={handleChange} className="formInput-item" />
                        </label>

                        <label className="formInput-card">
                            Actif :
                            <select name="actif" className="formInput-item" value={formData.actif} onChange={handleChange}>
                                <option>choisir</option>
                                <option value={true}>Oui</option>
                                <option value={false}>Non</option>
                            </select>

                        </label>


                        <button type="submit" className="formSearch-item-button">Créer contact</button>

                    </fieldset>
                </form>

            </Main>
            <Footer />
        </>
    )
}
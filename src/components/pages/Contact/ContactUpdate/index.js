import { Header } from "../../../Header";
import { Main } from "../../../Main";
import { Footer } from "../../../Footer";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


export function ContactUpdate() {
    //je récupère les données de la table Contact
    const params = useParams();
    const [contactData, setContactData] = useState({});
    const [formData, setFormData] = useState({});
 

    const doSearch = async () => {
        try {
            setContactData({});
            const adresse = "https://dcb5-2a01-cb19-846-c300-8d4a-62a5-b80f-35c9.ngrok-free.app/api/contact/details/" + params.contactId;
            const response = await fetch(adresse);
            const data = await response.json();
            setContactData(data);


        } catch (error) {
            console.error(error);
            alert('Erreur lors de la récupérationd des résultats');
        }
    };
    useEffect(() => {
        doSearch();
    }, []);

    useEffect(() => {
        setFormData({
            title: contactData.title || '',
            firstname: contactData.firstname || '',
            lastname: contactData.lastname || '',
            poste_fonction: contactData.poste_fonction || '',
            work_phone: contactData.work_phone || '',
            cellphone: contactData.cellphone || '',
            email: contactData.email || '',
            address: contactData.address || '',
            networks: contactData.networks || '',
            personal_data: contactData.personal_data || '',
            actif: contactData.actif || true ,
            
        })
    }, [contactData]);

    // fonction qui récupére les entrées de nos inputs (boilerplate)
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

    //fonction qui creera et envérra notre objet dans notre instance backend()
    const handleSubmit = async (event) => {
        event.preventDefault();
        const newObject = {
            title: formData.title,
            firstname: formData.firstname,
            lastname: formData.lastname,
            poste_fonction: formData.poste_fonction,
            work_phone: formData.work_phone,
            cellphone: formData.cellphone,
            email: formData.email,
            address: formData.address,
            networks: formData.networks,
            personal_data: formData.personal_data,
            actif: formData.actif,
        };
        

        try {
            const response = await fetch (`https://dcb5-2a01-cb19-846-c300-8d4a-62a5-b80f-35c9.ngrok-free.app/api/contact/update/`+ params.contactId, {
                method: 'PATCH',
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
            
            alert('Contact a été modifié');
    
            window.location.replace(`/contactDetails/` + params.contactId);
        } catch (error) {
            
            const formMessages = document.getElementById('form-messages');
            formMessages.classList.add("error-message")
            formMessages.innerText = error;

        }
    }   

    const doDelete = async () => {
        try {
            await fetch(`https://dcb5-2a01-cb19-846-c300-8d4a-62a5-b80f-35c9.ngrok-free.app/api/contact/delete/` + params.contactId, {method:'DELETE'});
            alert('Contact a été supprimé');
            window.location.replace(`/tiersHome`)
        }
        catch (error) {
            console.error(error); 
        }
    };

    return (
        <>

            <Header />
            <Main title={"Mise à jour contact"}>
            <form onSubmit={handleSubmit} className="formInput-container">
                    <fieldset className="formInput-box">
                        <legend>Formulaire de modifications du contact</legend>
                        <div aria-live="polite" id="form-messages" className=""></div>

                        <label className="formInput-card">
                            Civilité :
                            <input  type="text" defaultValue={""} name={"title"} value={formData.title} onChange={handleChange} className="formInput-item" />
                        </label>
                        <label className="formInput-card">
                            Nom :
                            <input required type="text" defaultValue={""} name="lastname" value={formData.lastname} onChange={handleChange} className="formInput-item" />
                        </label>
                        <label className="formInput-card">
                            Prénom :
                            <input required type="text" name="firstname" defaultValue={""} value={formData.firstname} onChange={handleChange} className="formInput-item" />
                        </label>
                        <label className="formInput-card">
                            Poste :
                            <input type="text" name="poste_fonction" defaultValue={""} value={formData.poste_fonction} onChange={handleChange} className="formInput-item" />
                        </label>
                        <label className="formInput-card">
                            Téléphone professionel :
                            <input type="text" name="work_phone" defaultValue={""} value={formData.work_phone} onChange={handleChange} className="formInput-item" />
                        </label>
                        <label className="formInput-card">
                            Téléphone mobile :
                            <input type="text" name="cellphone" value={formData.cellphone} onChange={handleChange} className="formInput-item" />
                        </label>
                        <label className="formInput-card">
                            Email :
                            <input required type="text" name="email" value={formData.email} onChange={handleChange} className="formInput-item" />
                        </label>
                        <label className="formInput-card">
                            Adresse :
                            <input type="text" name="address" defaultValue={""} value={formData.adress} onChange={handleChange} className="formInput-item" />
                        </label>
                        <label className="formInput-card">
                            Réseaux sociaux :
                            <input type="text" name="networks" defaultValue={""} value={formData.networks} onChange={handleChange} className="formInput-item" />
                        </label>
                        <label className="formInput-card">
                            Données personnelles :
                            <input type="text" name="personal_data" defaultValue={""} value={formData.personal_data} onChange={handleChange} className="formInput-item" />
                        </label>
                        <label className="formInput-card">
                            Actif :
                            <select name="actif" className="formInput-item"  value={formData.actif} onChange={handleChange}>
                                <option >choisir</option>
                                <option value={true}>Oui</option>
                                <option value={false}>Non</option>
                            </select>
                        </label>
                        <div className="container-btn-modif">
                        <button type="submit" className="formSearch-item-button">Modifier un contact</button>
                        </div>
            </fieldset>
            </form>
            <div className="container-btn-suppress">
                    <button className="item-btn-supress" onClick={doDelete}>Supprimer le contact</button>
            </div>
            </Main>
            <Footer />

        </>
    )
};
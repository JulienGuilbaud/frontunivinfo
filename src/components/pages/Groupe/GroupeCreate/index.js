import { useState, useEffect } from "react";
import { Header } from "../../../Header";
import { Main } from "../../../Main";
import { Footer } from "../../../Footer";
import { useParams } from "react-router-dom";

export function GroupeCreate() {


    const params = useParams();
    const [formData, setFormdata] = useState({
        fonction: '',
        make: false,
        edit: false,
        suppress: false,

    });
    // fonction qui récupère les entrées de nos inputs (boilerplate)
    const handleChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        // fonction qui insère nos données dans notre objet créé plus haut(boilerplate)
        setFormdata((prevFormData) => {
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
            fonction: formData.fonction,
            make: formData.make,
            edit: formData.edit,
            suppress: formData.suppress,
        };
        console.log(newObject);

                try {
                    const response = await fetch('http://localhost:3000/api/group/creategroup', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(newObject)
                    });
        
                    if (!response.ok) {
                        const errorResponse = await response.json();
                        throw new Error(errorResponse.error);
                    }
        
                    const data = await response.json();
        
                    alert(data.message);
        
                    // Remplacez l'URL de redirection par celle souhaitée
                    window.location.replace("http://localhost:1234/administrateur");
        
                } catch (error) {
                    const formMessages = document.getElementById('form-messages');
                    formMessages.classList.add("error-message")
                    formMessages.innerText = error;
                }
    };



    return (
        <>
            <Header />
            <Main title={"Créer un Groupe"}>
                <form onSubmit={handleSubmit} className="formInput-container">
                    <fieldset className="formInput-box">
                        <legend> création d'un groupe avec Utilisateur</legend>

                        <div aria-live="polite" id="form-messages" className=""></div>

                        <label className="formInput-card">
                            Fonction du groupe :
                            <input type="text" name="fonction" value={formData.fonction} onChange={handleChange} className="formInput-item" />
                        </label>
                        <label className="formInput-card">
                            Autorisation en création :
                            <select name="make" className="formInput-item" value={formData.make} onChange={handleChange}>
                                <option value={true}>oui</option>
                                <option value={false}>non</option>
                            </select>
                        </label>
                        <label className="formInput-card">
                            Autorisation en modification :
                            <select name="edit" className="formInput-item" value={formData.edit} onChange={handleChange}>
                                <option value={true}>oui</option>
                                <option value={false}>non</option>
                            </select>
                        </label>
                        <label className="formInput-card">
                            Autorisation en suppression :
                            <select name="suppress" className="formInput-item" value={formData.suppress} onChange={handleChange}>
                                <option value={true}>oui</option>
                                <option value={false}>non</option>
                            </select>
                        </label>

                        <button type="submit" className="formSearch-item-button">Créer le groupe</button>

                    </fieldset>
                </form>

            </Main>
            <Footer />
        </>
    )
}

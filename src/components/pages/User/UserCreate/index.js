import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Header } from "../../../Header";
import { Main } from "../../../Main";
import { Footer } from "../../../Footer";

export function UserCreate() {
    const [groupeData, setGroupeData] = useState([]);

    
    //on fabrique un objet vide avec nos attributs de table (a configurer)
    const [formData, setFormData] = useState({
        lastname: '',
        firstname: '',
        password: '',
        email: '',
        groupe_id: 0,
    });

    const doSearch = async () => {
        try {
            setGroupeData([]);
            const address = "http://julienguilbaud-server.eddi.cloud:8080/api/group/" 
            const response = await fetch(address);
            const data = await response.json();
            setGroupeData(data);
            console.log(data);
        } catch (error) {
            console.error(error);
            alert('Erreur lors de la récupération des résultats');
        }
    };





    // fonction qui récupère les entrées de nos inputs (boilerplate)
    const handleChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        const newObject = {
            lastname: formData.lastname,
            firstname: formData.firstname,
            password: formData.password,
            email: formData.email,
            groupe_id: formData.groupe_id,
        };
        console.log(newObject);


        try {
            const response = await fetch('http://julienguilbaud-server.eddi.cloud:8080/api/user/create', {
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

            window.location.replace(`http://localhost:1234/administrateur` );

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
            <Main title={`Créer une fiche utilisateur`}>
                <form onSubmit={handleSubmit} className="formInput-container">
                    <fieldset className="formInput-box">
                        <legend>formulaire création utilisateur</legend>
                        <div className="" id="form-messages" aria-live="polite"></div>
                        <label className="formInput-card">
                            Nom :
                            <input type="text" name="lastname" value={formData.lastname} onChange={handleChange} className="formInput-item" />
                        </label>

                        <label className="formInput-card">
                            Prénom :
                            <input type="text" name="firstname" value={formData.firstname} onChange={handleChange} className="formInput-item" />
                        </label>

                        <label className="formInput-card">
                            Mot de passe :
                            <input type="password" name="password" value={formData.password} onChange={handleChange} className="formInput-item" />
                        </label>

                        <label className="formInput-card">
                            Email :
                            <input type="email" name="email" value={formData.email} onChange={handleChange} className="formInput-item" />
                        </label>
                        <label className="formInput-card">
                            Groupe : 
                        <select
                            name="groupe_id"
                            className="formInput-item"
                            value={formData.groupe_id}
                            onChange={handleChange}
                        >
                            <option value={0}>Selectionner un Groupe</option>
                            {groupeData.map((groupe) => (
                                <option key={groupe.id} value={groupe.id}>
                                    {groupe.fonction} 
                                </option>
                            ))}
                        </select>
                        </label>
                        <button type="submit" className="formSearch-item-button">Créer l'utilisateur</button>
                        

                    </fieldset>
                </form>
            </Main>
            <Footer />
        </>
    )
}

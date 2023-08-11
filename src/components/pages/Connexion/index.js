import { LinkButton } from "../../LinkButton"
import { useState } from "react";

export function Connexion() {
    const [formData, setFormData] = useState({
        password: "",
        email: ""
    });

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
            password: formData.password,
            email: formData.email
        };
        console.log(newObject);

        try {
            const response = await fetch('https://dcb5-2a01-cb19-846-c300-8d4a-62a5-b80f-35c9.ngrok-free.app/api/login', {
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

            // Pour enregistrer le token dans le LocalStorage après la connexion
            localStorage.setItem("token", data.token);
            console.log(data.token);

            alert(data.message);
            window.location.replace("/home");

        } catch (error) {
            const formMessages = document.getElementById('form-messages');
            formMessages.classList.add("error-message")
            formMessages.innerText = error;
        }
    };
    return (
        <>
            <header className="header-connexion-container" role="banner">
                <section className="connexion-container" role="region">
                    <h1 className="connexion-title">Nom du logiciel</h1>
                </section>
            </header>
            <main className="main-connexion-container" role="main">
                <section className="connexion-container" role="region">
                    <h2 className="connexion-title">Authentification</h2>

                    <form onSubmit={handleSubmit} className="formInput-container">
                        <fieldset className="formInput-box">
                            <legend> formulaire de connexion </legend>
                            <div aria-live="polite" id="form-messages" className=""></div>
                            <label className="formInput-card">
                                Email :
                                <input required type="mail" name="email" value={formData.email} onChange={handleChange} className="formInput-item" />
                            </label>
                            <label className="formInput-card">
                                Mot de passe :
                                <input required autoComplete="new-password" type="password" name="password" value={formData.password} onChange={handleChange} className="formInput-item" />
                            </label>

                            <button type="submit" className="formSearch-item-button">Connexion</button>

                        </fieldset>
                    </form>
                </section>
            </main>

            <footer className="footer-connexion-container">
            </footer>
        </>
    )

}
import { Header } from "../../../Header";
import { Main } from "../../../Main";
import { Footer } from "../../../Footer";
import { useState, useEffect } from "react";
import { useParams,Navigate } from "react-router-dom";
import { DeleteButton } from "../../../DeleteButton";

export function TiersUpdate() {
    //je récupére les données de la table tier
    const params = useParams();
    const [tiersData, setTiersData] = useState({});
    const [formData, setFormData] = useState({});


    const doSearch = async () => {
        try {
            setTiersData({});
            const adresse = "https://guilbaud.alwaysdata.net/api/tier/details/" + params.tierid;
            const response = await fetch(adresse);
            const data = await response.json();
            setTiersData(data);


        } catch (error) {
            console.error(error);
            alert('Erreur lors de la récupération des résultats');
        }
    };

    useEffect(() => {
        doSearch();
    }, []);

    useEffect(() => {
        setFormData({
            social_reason: tiersData.social_reason || '',
            address: tiersData.address || '',
            country: tiersData.country || '',
            email: tiersData.email || '',
            phone: tiersData.phone || '',
            website: tiersData.website || '',
            networks: tiersData.networks || '',
            category: tiersData.category || '',
            siren: tiersData.siren || '',
            siret: tiersData.siret || '',
            naf: tiersData.naf || '',
            vat: tiersData.vat || '',
            commercial_register: tiersData.commercial_register || '',
            staff: tiersData.staff || '',
            judicial_status: tiersData.judicial_status || '',
            actif: tiersData.actif || '',
        })
    }, [tiersData]);

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
            social_reason: formData.social_reason,
            address: formData.address,
            country: formData.country,
            email: formData.email,
            phone: formData.phone,
            website: formData.website,
            networks: formData.networks,
            category: formData.category,
            siren: formData.siren,
            siret: formData.siret,
            naf: formData.naf,
            vat: formData.vat,
            commercial_register: formData.commercial_register,
            staff: formData.staff,
            judicial_status: formData.judicial_status,
            active: formData.active,
        };
        

        try {
            const response = await fetch(`https://guilbaud.alwaysdata.net/api/tier/update/` + params.tierid, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newObject),
            })

            if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.error);
            }

            const data = await response.json();

            alert(data.message);

            window.location.replace(`/tiersDetails/` + params.tierid);
        } catch (error) {
            const formMessages = document.getElementById('form-messages');
            formMessages.classList.add("error-message")
            formMessages.innerText = error;
        }
    };

    const doDelete = async () => {
        try {
            await fetch(`https://guilbaud.alwaysdata.net/api/tier/delete/` + params.tierid, { method: 'DELETE' });
            alert('Tiers supprimé');
            window.location.replace(`/tiersHome`)
        }
        catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <Header />
            <Main title={"Modifier une fiche tier"}>
                <form onSubmit={handleSubmit} className="formInput-container">
                    <fieldset className="formInput-box">
                        <legend>Formulaire de modifications</legend>
                        <div aria-live="polite" id="form-messages" className=""></div>
                        <label className="formInput-card">
                            Raison sociale :
                            <input required type="text" name="social_reason" value={formData.social_reason} onChange={handleChange} className="formInput-item" />
                        </label>

                        <label className="formInput-card">
                            Adresse complète :
                            <input required type="text" name="address" value={formData.address} onChange={handleChange} className="formInput-item" />
                        </label>

                        <label className="formInput-card">
                            Pays :
                            <input required type="text" name="country" value={formData.country} onChange={handleChange} className="formInput-item" />
                        </label>

                        <label className="formInput-card">
                            Email :
                            <input required type="text" name="email" value={formData.email} onChange={handleChange} className="formInput-item" />
                        </label>

                        <label className="formInput-card">
                            Téléphone :
                            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="formInput-item" />
                        </label>

                        <label className="formInput-card">
                            Site web :
                            <input type="url" name="website" value={formData.website} onChange={handleChange} className="formInput-item" />
                        </label>

                        <label className="formInput-card">
                            Réseaus sociaux :
                            <input type="url" name="networks" value={formData.networks} onChange={handleChange} className="formInput-item" />
                        </label>

                        <label className="formInput-card">
                            Catégorie :
                            <input type="text" name="category" value={formData.category} onChange={handleChange} className="formInput-item" />
                        </label>

                        <label className="formInput-card">
                            SIREN :
                            <input type="text" name="siren" value={formData.siren} onChange={handleChange} className="formInput-item" />
                        </label>

                        <label className="formInput-card">
                            SIRET :
                            <input type="text" name="siret" value={formData.siret} onChange={handleChange} className="formInput-item" />
                        </label>

                        <label className="formInput-card">
                            Code NAF :
                            <input type="text" name="naf" value={formData.naf} onChange={handleChange} className="formInput-item" />
                        </label>

                        <label className="formInput-card">
                            N° TVA :
                            <input type="text" name="vat" value={formData.vat} onChange={handleChange} className="formInput-item" />
                        </label>

                        <label className="formInput-card">
                            Registre du commerce :
                            <input type="text" name="commercial_register" value={formData.commercial_register} onChange={handleChange} className="formInput-item" />
                        </label>

                        <label className="formInput-card">
                            Nombre d'effectif :
                            <input type="number" name="staff" value={formData.staff} onChange={handleChange} className="formInput-item" />
                        </label>

                        <label className="formInput-card">
                            Statut juridique :
                            <input type="text" name="judicial_status" value={formData.judicial_status} onChange={handleChange} className="formInput-item" />
                        </label>

                        <label className="formInput-card">
                            Actif :
                            <select name="active" className="formInput-item" value={formData.active} onChange={handleChange}>
                                <option >choisir</option>
                                <option value={true}>Oui</option>
                                <option value={false}>Non</option>
                            </select>

                        </label>

                        <button type="submit" className="formSearch-item-button">Modifier un tiers</button>

                    </fieldset>
                </form>

                <DeleteButton value={"Supprimer ce Tier"}/>


            </Main>
            <Footer />
        </>
    )
} 
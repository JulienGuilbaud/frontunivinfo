import { Header } from "../../../Header";
import { Main } from "../../../Main";
import { Footer } from "../../../Footer";
import { useState, useEffect } from "react";
import { useParams,Link } from "react-router-dom";
export function UserUpdate() {
    const [formAlert, setFormAlert] = useState(false)
    const [newForm, setNewForm] = useState({})
    const params = useParams()
    const [groupeData, setGroupeData] = useState([]);
    const [userData, setuserData] = useState({});
    const [formData, setFormData] = useState({});
    //on fait une recherche pour le maping de fonction
    const doSearchForGroup = async () => {
        try {
            setGroupeData([]);
            const address = "https://guilbaud.alwaysdata.net/api/group/"
            const response = await fetch(address);
            const data = await response.json();
            setGroupeData(data);
            
        } catch (error) {
            console.error(error);
            alert('Erreur lors de la récupération des résultats');
        }
    };

    const doSearchForUser = async () => {
        try {
            setuserData([]);
            const address = "https://guilbaud.alwaysdata.net/api/user/" + params.userid
            const response = await fetch(address);
            const data = await response.json();
            setuserData(data);
            
        } catch (error) {
            console.error(error);
            alert('Erreur lors de la récupération des résultats');
        }
    };
    useEffect(() => {
        doSearchForGroup();
        doSearchForUser();
    }, []);
    useEffect(() => {
        setFormData({
            lastname: userData.lastname || '',
            firstname: userData.firstname || '',
            password: userData.password || '',
            email: userData.email || '',
            groupe_id: userData.groupe_id || 0,
        })
    }, [userData]);

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


        


        try {
            const response = await fetch("https://guilbaud.alwaysdata.net/api/user/update/" + params.userid, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newObject)
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(errorResponse.error);
            }
            setNewForm({})
            const data = await response.json();
            setNewForm(data)
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


    return (
        <>
            <Header />
            <Main title={"modifier un utilisateur"}>
                <form onSubmit={handleSubmit} className="formInput-container">
                    <fieldset className="formInput-box">
                        <legend>formulaire création utilisateur</legend>
                        <div aria-live="polite" id="form-messages" className="">
                            {formAlert && <Link to={"/administrateur"}> vers la page administrateur</Link>}
                        </div>
                        <label className="formInput-card">
                            Nom :
                            <input type="text" name="lastname" defaultValue={""} value={formData.lastname} onChange={handleChange} className="formInput-item" />
                        </label>

                        <label className="formInput-card">
                            Prénom :
                            <input type="text" name="firstname" defaultValue={""} value={formData.firstname} onChange={handleChange} className="formInput-item" />
                        </label>

                        <label className="formInput-card">
                            Mot de passe :
                            <input type="password" name="password" defaultValue={""} value={formData.password} onChange={handleChange} className="formInput-item" />
                        </label>

                        <label className="formInput-card">
                            Email :
                            <input type="email" name="email" defaultValue={""} value={formData.email} onChange={handleChange} className="formInput-item" />
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
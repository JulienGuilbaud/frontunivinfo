import { useState, useEffect } from "react";
import { useParams,Link } from "react-router-dom";
import { Footer } from "../../../Footer"
import { Header } from "../../../Header"
import { Main } from "../../../Main"


export function TiersAddCampaigns() {
    const [formAlert, setFormAlert] = useState(false)
    const [newForm, setNewForm] = useState({})
    const [CampaignData, setCampaignData] = useState([]);
    const params = useParams()//permet de récupéré notre id de l'url
    //on fabrique un objet vide avec nos attributs de table (a configurer)
    const [formData, setFormData] = useState({
        TierId: params.tierid,
        CampaignId: 0
    });
    const doSearch = async () => {
        try {
            setCampaignData([]);
            const address = "https://guilbaud.alwaysdata.net/api/campaigns/"
            const response = await fetch(address);
            const data = await response.json();
            setCampaignData(data);
            
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
            CampaignId: formData.CampaignId

        };
        
        try {
            const response = await fetch('https://guilbaud.alwaysdata.net/api/tierhascampaign/', {
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
            <Main title={"Ajouter une campagne à notre Tier"}>
                <form onSubmit={handleSubmit} className="formInput-container">
                    <fieldset className="formInput-box">
                        <legend> sélection de campagne </legend>
                        <div aria-live="polite" id="form-messages" className="">
                            {formAlert && <Link to={"/tiersDetails/"+params.tierid}> vers tout les détails de ce tier</Link>}
                        </div>
                        <label className="formInput-card">
                            Campagnes :
                            <select name="CampaignId" className="formInput-item" value={formData.CampaignId} onChange={handleChange}>
                                <option>selectioner</option>
                                {CampaignData.map((element, index) => (
                                    <option key={index} value={element.id} >{element.type} : {element.name}  </option>
                                ))}

                            </select>

                        </label>

                        <button type="submit" className="formSearch-item-button">ajouter</button>

                    </fieldset>
                </form>

            </Main>
            <Footer />
        </>
    )
}
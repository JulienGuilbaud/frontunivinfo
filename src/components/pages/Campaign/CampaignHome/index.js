import { useState } from 'react';
import { Header } from '../../../Header'
import { Main } from '../../../Main';
import { FormSearch } from '../../../FormSearch';
import { Footer } from '../../../Footer';
import { LinkButton } from '../../../LinkButton';
import { Link } from 'react-router-dom';


export function CampaignHome() {
    const [searchValue, setSearchValue] = useState("");
    const [searchResult, setSearchResult] = useState([]);


    const handleSearchValueChange = (event) => {
        setSearchValue(event.target.value);
    };

    const findCampaign = async (event) => {
        event.preventDefault();

        setSearchResult([]);

        try {
            const address = "http://localhost:3000/api/campaigns/" + searchValue;
            const response = await fetch(address);
            const data = await response.json();
            setSearchResult(data);
            console.log(data);
        } catch (error) {
            console.error(error);
            alert('Erreur lors de la récupération des résultats');
        }
        setSearchValue("");
    };



    return (
        <>
            <Header />
            <Main title="Campagne">

                <FormSearch
                    title={"Par nom de campagne"}
                    action={findCampaign}
                    value={searchValue}
                    controlevalue={handleSearchValueChange}
                />
                <section className="resultList-container" aria-live='polite'>
                    <article className="resultList-box">
                        <h3>
                            {searchResult.length < 2
                                ? searchResult.length + " résultat sur votre recherche"
                                : searchResult.length + " résultats sur votre recherche"}
                        </h3>
                        <ul className='resultList-item-ul'>
                            {
                                searchResult.map((element) => (
                                    <li className='resultList-item-li' key={element.id}>
                                        <Link to={"/campaignDetails/" + element.id }>
                                            {element.name} type: {element.type} 
                                        </Link>
                                    </li>
                                ))
                            }
                        </ul>
                    </article>
                </section>
                <div className='tierHome-container'>
                    <LinkButton link="/campaignCreate" value="Créer une campagne" />
                </div>
            </Main>
            <Footer/>
        </>
    );
}

// il manque : le lien vers la page création une campagne , (le lien affilier en administrateur )
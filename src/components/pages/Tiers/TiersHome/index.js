
import { useState } from 'react';
import { FormSearch } from '../../../FormSearch';
import { Header } from '../../../Header';
import { Main } from '../../../Main';
import { Footer } from '../../../Footer';
import { LinkButton } from '../../../LinkButton';
import { Link } from 'react-router-dom';


export function TiersHome() {
    const [searchValue, setSearchValue] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [searchByContact, setSearchByContact] = useState(true);

    const handleSearchValueChange = (event) => {
        setSearchValue(event.target.value);
    };

    const findContact = async (event) => {
        event.preventDefault();
        setSearchByContact(true);
        setSearchResult([]);

        try {
            const address = "https://dcb5-2a01-cb19-846-c300-8d4a-62a5-b80f-35c9.ngrok-free.app//api/contacts/" + searchValue;
            const response = await fetch(address);
            const data = await response.json();
            setSearchResult(data);
            console.log(data);
        } catch (error) {
            console.error(error);
            alert('La recherche ne peut etre vide');
        }
        setSearchValue("");
    };

    const findEntreprise = async (event) => {
        event.preventDefault();
        setSearchByContact(false);
        setSearchResult([]);

        try {
            const address = "https://dcb5-2a01-cb19-846-c300-8d4a-62a5-b80f-35c9.ngrok-free.app//api/tiers/" + searchValue;
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
            <Main title="TIERS">
                <FormSearch
                    title={"Par nom de l'entreprise"}
                    action={findEntreprise}
                    value={searchValue}
                    controlevalue={handleSearchValueChange}
                />
                <FormSearch
                    title={"Par nom ou prénom du contact"}
                    action={findContact}
                    value={searchValue}
                    controlevalue={handleSearchValueChange}
                />
                <section className="resultList-container" aria-live='polite'>
                    <article className="resultList-box">
                        <h3 >
                            {searchResult.length < 2
                                ? searchResult.length + " résultat sur votre recherche"
                                : searchResult.length + " résultats sur votre recherche"}
                        </h3>
                        <ul className='resultList-item-ul'>
                            {searchByContact
                                ? searchResult.map((element) => (
                                    <li className='resultList-item-li' key={element.id}>
                                        <Link to={"/contactDetails/" + element.id}>
                                            {element.title} {element.firstname} {element.lastname} {element.address} {element.poste_fonction} {element.Binds?.Tier?.social_reason}
                                        </Link>
                                    </li>
                                ))
                                : searchResult.map((element) => (
                                    <li className='resultList-item-li' key={element.id}>
                                        <Link to={"/tiersDetails/" + element.id}>
                                            {element.judicial_status} {element.social_reason} {element.address} {element.country}
                                        </Link>
                                    </li>
                                ))}
                        </ul>
                    </article>
                </section>
                <div className='tierHome-container'>
                    <LinkButton link="/tiersCreate" value="Créer Tier" />
                    <LinkButton link="/contactCreate" value="Créer Contact" />
                </div>
            </Main>
            < Footer />
        </>
    );
}



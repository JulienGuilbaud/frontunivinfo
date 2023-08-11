import { useState } from "react";
import { Header } from "../../../Header";
import { Main } from "../../../Main";
import { FormSearch } from "../../../FormSearch";
import { Link } from "react-router-dom";
import { LinkButton } from "../../../LinkButton";
import { Footer } from "../../../Footer";

export function ExchangeHome() {
    const [searchValue, setSearchValue] = useState("");
    const [searchResult, setSearchResult] = useState([]);


    const handleSearchValueChange = (event) => {
        setSearchValue(event.target.value);
    };

    const findContact = async (event) => {
        event.preventDefault();

        setSearchResult([]);

        try {
            const address = "http://julienguilbaud-server.eddi.cloud:8080/api/contacts/" + searchValue;
            const response = await fetch(address);
            const data = await response.json();
            setSearchResult(data);
            console.log(data);
        } catch (error) {
            console.error(error);
            alert('La recherche ne peut pas etre vide');
        }
        setSearchValue("");
    };



    return (
        <>
            <Header />
            <Main title="Echanges">

                <FormSearch
                    title={"Par contact"}
                    action={findContact}
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
                                        <Link to={"/exchangeDetails/" + element.id}>
                                            {element.title} {element.firstname} {element.lastname} {element.address} {element.poste_fonction} {element.Binds?.Tier?.social_reason}
                                        </Link>
                                    </li>
                                ))
                            }
                        </ul>
                    </article>
                </section>

            </Main>
            <Footer/>
        </>
    );
}


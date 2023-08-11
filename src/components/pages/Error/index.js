import { Header } from "../../Header";
import { Main } from "../../Main";
import { Footer } from "../../Footer";

export function Error() {
    return (
        <>
        <Header />
        <Main title={"erreur 404"}>
            <p>page non trouvée</p>
        </Main>
        <Footer />
        </>
    )
}
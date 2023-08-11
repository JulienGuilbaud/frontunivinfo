import { Header } from "../../../Header";
import { Main } from "../../../Main";
import { Footer } from "../../../Footer";
import { LinkButton } from "../../../LinkButton";

export function TransferHome() {
    return(
        <>
        <Header />
        <Main title={'Transfert des données :'}>
            <LinkButton link="/import" value="Importer"/>
            <LinkButton link="/export" value="Exporter"/>
        </Main>
        <Footer />
        </>
    )
}
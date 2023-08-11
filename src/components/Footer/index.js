import { SkipLinkFooter } from '../SkipLinkFooter';


export function Footer ({children}) {
    return(
        <footer className='container-footer'>
            <section className='box-footer'>
                <SkipLinkFooter/>
            </section>
        </footer>
    )
}
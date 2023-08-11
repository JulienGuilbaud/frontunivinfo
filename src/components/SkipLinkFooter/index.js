import './style.scss'; 
import up_icone from "../../images/up.png"


export function SkipLinkFooter(){
    return (
        <div role="contentinfo" >
        <nav >
            <ol >
                <li className="skiplink-top">
                    <a href="#top">
                        <img className="logo-img" src={up_icone} alt=""/>
                    Retour en haut 
                    </a>
                </li>
                <li className="skiplink-footer">
                    <a href="#title">
                    <img className="logo-img" src={up_icone} alt=""/>
                    Retour au contenu
                    </a>
                </li>
            </ol>
        </nav>
        </div>
    )
}
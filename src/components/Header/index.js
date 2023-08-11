import { Link } from 'react-router-dom';

import tiers_icone from "../../images/tiers.png";
import campagne_icone from "../../images/campagne.png";
import transfert_icone from "../../images/transfert.png";
import profil_icone from "../../images/user.png";
import accueil_icone from "../../images/accueil.png";
import deconnexion_icone from "../../images/deconnexion.png";

import './style.scss';
import { SkipLink } from '../SkipLink';
import { useAuth } from '../../AuthContext.js';

export function Header() {

        const userName = useAuth();
        console.log(userName);

        const doDisconnect = async () => {
                try {
                        await localStorage.removeItem("token");
                        alert('Vous êtes bien déconnecté');
                        window.location.replace(`/`)
                }
                catch (error) {
                        console.error(error);
                }
        };
        return (
                <>
                        <SkipLink />
                        <header role="banner" className='header-container' >
                                <nav role='navigation' >
                                        <ol id="mainmenulabel" className='header-box'>
                                                <li>
                                                        <Link to="/home" className='header-item-tag'>
                                                                <img className='header-item-img' src={accueil_icone} alt="" />
                                                                Accueil
                                                        </Link>
                                                </li>
                                                <li>
                                                        <Link to="/tiersHome" className="header-item-tag"><img className='header-item-img' src={tiers_icone} alt="" />
                                                                Tiers</Link>
                                                </li>
                                                <li>
                                                        <Link to="/campaignHome" className="header-item-tag"><img className='header-item-img' src={campagne_icone} alt="" />
                                                                Campagne</Link>
                                                </li>
                                                <li >
                                                        <Link to="/transferHome" className="header-item-tag"><img className='header-item-img' src={transfert_icone} alt="" />
                                                                Transfert</Link>
                                                </li>
                                        </ol>
                                </nav>
                                <div >
                                        <ul className='header-box'>
                                                <li >
                                                        <Link  to="/profil" className="header-item-tag"><img className='header-item-img' src={profil_icone} alt="" />
                                                                <span id="votre-profil">Votre profil</span>
                                                                <span  className=''>{userName.user.lastname} {userName.user.firstname}</span></Link>
                                                </li>
                                                <li>
                                                        <button onClick={doDisconnect} className='header-item-tag'><img className='header-item-img' src={deconnexion_icone} />Déconnexion</button>

                                                </li>
                                        </ul>
                                </div>
                        </header>
                </>
        )
        }

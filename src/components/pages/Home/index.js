import {  Link } from 'react-router-dom';
import tiers_icone from "../../../images/tiers.png"
import echange_icone from "../../../images/echange.png"
import campagne_icone from "../../../images/campagne.png"
import transfert_icone from "../../../images/transfert.png"
import profil_icone from "../../../images/user.png"
import admin_icone from "../../../images/admin.png"


export function Home() {
    return (
        <>
            <header className="homeHeader-container" role="banner">
                <section className='homeHeader-box'>
                    <h1 className="homeHeader-item-title" tabIndex='0'>UNIVINFO</h1>
                    <div className="homeHeader-card">
                        <p>Univinfo vers un numérique inclusif</p>
                    </div>
                </section>
            </header>
            <main className='homeMain-container' role="main">
                <h2 className="homeMain-item-title" tabIndex='0'>ACCUEIL</h2>
                <nav role='navigation' aria-label='Main' >
                    <ul className="homeMain-box" role='list'>
                    <div className="homeMain-card" role="listitem">
                        <h2>Module Tiers</h2>
                        <Link className="homeMain-card-item-image" to="/tiersHome"><img src={tiers_icone} alt="" />
                            <h3>Tiers</h3>
                        </Link>
                    </div>
                    <div className="homeMain-card" role="listitem">
                        <h2>Module Echanges</h2>
                        <Link className="homeMain-card-item-image" to="/exchangeHome"><img src={echange_icone} alt="" />
                            <h3>Echanges</h3>
                        </Link>
                    </div>
                    <div className="homeMain-card" role="listitem">
                        <h2>Module Campagne</h2>
                        <Link className="homeMain-card-item-image" to="/campaignHome"><img src={campagne_icone} alt="" />
                            <h3>Campagne</h3>
                        </Link>
                    </div>
                    <div className="homeMain-card" role="listitem">
                        <h2>Module Transfert</h2>
                            <Link className="homeMain-card-item-image" to="/transferHome"><img src={transfert_icone} alt="" />
                                <h3>Import/Export</h3>
                            </Link>
                    </div>
                    <div className="homeMain-card" role="listitem">
                        <h2>Profil d'Utilisateur</h2>
                        <Link className="homeMain-card-item-image" to="/profil"><img src={profil_icone} alt="" />
                            <h3>Profil</h3>
                        </Link>
                    </div>
                    <div className="homeMain-card" role="listitem">
                        <h2>Administrateur</h2>
                        <Link className="homeMain-card-item-image" to="/administrateur"><img src={admin_icone} alt="" />
                            <h3>Admin</h3>
                        </Link>
                    </div>
                    </ul>
                </nav>
            </main>
            
        </>

    )
}
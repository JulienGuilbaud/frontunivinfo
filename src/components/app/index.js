import { AuthProvider } from "../../AuthContext";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Connexion } from '../pages/Connexion';
import { Home } from '../pages/Home';
import { TiersHome } from '../pages/Tiers/TiersHome';
import { TiersCreate } from '../pages/Tiers/TiersCreate';
import { TiersDetails } from '../pages/Tiers/TiersDetails';
import { TiersUpdate } from '../pages/Tiers/TiersUpdate';
import { ContactCreate } from '../pages/Contact/ContactCreate';
import { ContactDetails } from '../pages/Contact/ContactDetails';
import { ContactUpdate } from '../pages/Contact/ContactUpdate';
import { CampaignHome } from '../pages/Campaign/CampaignHome';
import { CampaignCreate } from '../pages/Campaign/CampaignCreate';
import { CampaignDetails } from '../pages/Campaign/CampaignDetails';

import { ExchangeHome } from '../pages/Exchange/ExchangeHome';
import { ExchangeCreate } from '../pages/Exchange/ExchangeCreate';
import { ExchangeDetails } from '../pages/Exchange/ExchangeDetails';
import { TransferHome } from '../pages/Transfer/TransferHome';
import { Import } from '../pages/Transfer/Import';
import { Export } from '../pages/Transfer/Export';
import { Error } from '../pages/Error';
import { Profil } from '../pages/Profil';
import { GroupeCreate } from "../pages/Groupe/GroupeCreate";
import { UserCreate } from "../pages/User/UserCreate";
import { UserUpdate } from "../pages/User/UserUpdate";
import { Admin } from '../pages/Admin';
import { TiersAddContact } from "../pages/Tiers/TiersAddContact";
import { ContactAddTiers } from "../pages/Contact/ContactAddTiers";
import { TiersAddCampaigns } from "../pages/Tiers/TiersAddCampaign";


export function App() {
    return (
        <>
            <AuthProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Connexion />} />

                            <Route path='/home' element={<Home />} />

                            <Route path='/tiersHome' element={<TiersHome />} />
                            <Route path='/tiersCreate' element={<TiersCreate />} />
                            <Route path='/tiersDetails/:id' element={<TiersDetails />} />
                            <Route path='/tiersUpdate/:tierid' element={<TiersUpdate />} />
                            <Route path='/tiersAddContact/:tierid' element={<TiersAddContact />} />
                            <Route path='/tiersAddCampaigns/:tierid' element={<TiersAddCampaigns />} />

                            <Route path='/contactCreate' element={<ContactCreate />} />
                            <Route path='/contactDetails/:id' element={<ContactDetails />} />
                            <Route path='/contactUpdate/:contactId' element={<ContactUpdate />} />
                            <Route path='/contactAddTiers/:contactId' element={<ContactAddTiers />} />

                            <Route path='/campaignHome' element={<CampaignHome />} />
                            <Route path='/campaignCreate' element={<CampaignCreate />} />
                            <Route path='/campaignDetails/:id' element={<CampaignDetails />} />
                            

                            <Route path='/exchangeHome' element={<ExchangeHome />} />
                            <Route path='/exchangeCreate/:contactid' element={<ExchangeCreate />} />
                            <Route path='/exchangeDetails/:contactid' element={<ExchangeDetails />} />

                            <Route path='/transferHome' element={<TransferHome />} />
                            <Route path='/import' element={<Import />} />
                            <Route path='/export' element={<Export />} />

                            <Route path='/profil' element={<Profil />} />
                            <Route path='/userCreate' element={<UserCreate />} />
                            <Route path='/userUpdate/:userid' element={<UserUpdate />} />

                            <Route path="/groupeCreate" element={<GroupeCreate />} />

                            <Route path='/administrateur' element={<Admin />} />

                            <Route path='/*' element={<Error />} />
                        </Routes>
                </BrowserRouter >
            </AuthProvider>
        </>
    )
}
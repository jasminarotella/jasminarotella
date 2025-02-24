import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Corretto import
import { useState } from 'react';
import ComponentLibrary from './pages/Home/ComponentLibrary.tsx';
import './pages/Home/Style.css';
import CreaForm from './pages/Home/components/CreaForm';
import GeneratedForm from './pages/Home/components/GeneratedForm';
import Nav from './pages/Nav';
import Simulazioni from './pages/Home/Simulazioni/HomeSimulazioni';
// import OffertediLavoro from './pages/ComponentLibrary/Simulazioni/OffertediLavoro';
import OfferteList from './pages/Home/Simulazioni/OfferteDiLavoro/OfferteList';
import "@fortawesome/fontawesome-free/css/all.min.css";
import AggiungiOfferta from './pages/Home/Simulazioni/OfferteDiLavoro/aggiungiOfferta';
import ModificaOfferta from './pages/Home/Simulazioni/OfferteDiLavoro/modificaOfferta';
import RimuoviOfferta from './pages/Home/Simulazioni/OfferteDiLavoro/rimuoviOfferte';
import MainHome from './pages/MainHome.tsx';
import LoginForm from './pages/Home/components/LoginForm.tsx';
import JasHome from './pages/PersonalHome/JasHome.tsx';

interface FormData {
  id: number;
  nome: string;
  tipo: string;
}

function App() {
  const [formData, setFormData] = useState<FormData[]>([]);

  return (
    <div className='home'>
      <Router>
        <Nav className="navbar" />
        <Routes>
        <Route path="/" element={<MainHome />} />
          <Route path="/libreriacomponenti" element={<ComponentLibrary />} />
          <Route
            path="/creaform"
            element={<CreaForm setFormData={setFormData} formData={formData} />}
          />
          <Route path="/form-preview" element={<GeneratedForm />} />
          <Route path="/simulazioni" element={<Simulazioni />} />
          <Route path="/offertedilavoro" element={<OfferteList />} />
          <Route path="/aggiungiofferta" element={<AggiungiOfferta />} />
          <Route path="/modificaofferta" element={<ModificaOfferta />} />
          <Route path="/rimuoviofferta" element={<RimuoviOfferta />} />
          <Route path="/loginform" element={<LoginForm />} />
          <Route path="/jashome" element={<JasHome />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

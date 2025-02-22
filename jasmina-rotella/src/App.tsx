import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Corretto import
import { useState } from 'react';
import Home from './pages/Home/Home';
import './pages/Home/Style.css';
import CreaForm from './pages/Home/CreaForm';
import GeneratedForm from './pages/Home/GeneratedForm';
import Nav from './pages/Nav';
import Simulazioni from './pages/Home/Simulazioni/HomeSimulazioni';
// import OffertediLavoro from './pages/Home/Simulazioni/OffertediLavoro';
import OfferteList from './pages/Home/Simulazioni/OfferteList';
import "@fortawesome/fontawesome-free/css/all.min.css";

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
          <Route path="/" element={<Home />} />
          <Route
            path="/creaform"
            element={<CreaForm setFormData={setFormData} formData={formData} />}
          />
          <Route path="/form-preview" element={<GeneratedForm />} />
          <Route path="/simulazioni" element={<Simulazioni />} />
          <Route path="/offertedilavoro" element={<OfferteList />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

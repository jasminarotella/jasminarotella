import './App.css';
import Home from './pages/Home/Home';
import './pages/Home/Style.css';
import Form from './pages/Home/Form';
import CreaForm from './pages/Home/CreaForm';
import { useState } from 'react';

interface FormData {
  id: number;
  nome: string;
  tipo: string;
}

function App() {
  const [formData, setFormData] = useState<FormData[]>([]); // Stato per i campi creati

  return (
    <>
      <Home className='home'>
        <h1>Titolo</h1>
        <div>Div</div>
        <CreaForm setFormData={setFormData} formData={formData} /> {/* Passo lo stato */}
        <Form formData={formData} /> {/* Passo i dati al Form */}
      </Home>
    </>
  );
}

export default App;

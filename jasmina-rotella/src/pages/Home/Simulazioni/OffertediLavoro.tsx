// @ts-ignore


import { useState } from "react";
import InputOfferta from "./inputOfferta";
import CustomButton from "../../Button";

export interface OffertaDiLavoroProp {
  id: number;
  titolo: string;
  descrizioneBreve: string;
  azienda: string;
  provincia: string;
  dataInserimento: string;
  smartWorking: boolean;
  contratto: string;
}

const OffertediLavoro: React.FC = () => {
  // Lista offerte iniziale
  const [listaOfferte, setListaOfferte] = useState<OffertaDiLavoroProp[]>([
    {
      id: 1,
      titolo: "Sviluppatore Full Stack",
      descrizioneBreve: "Azienda leader in tecnologie digitali cerca sviluppatore per progetti innovativi.",
      azienda: "Tech Innovators S.r.l.",
      provincia: "MI",
      dataInserimento: "2025-02-15",
      smartWorking: true,
      contratto: "Full time",
    },
    {
      id: 2,
      titolo: "Esperto SEO/SEM",
      descrizioneBreve: "Agenzia di comunicazione ricerca specialista SEO/SEM per l'ottimizzazione siti web.",
      azienda: "Digital Boost S.p.A.",
      provincia: "RM",
      dataInserimento: "2025-02-12",
      smartWorking: true,
      contratto: "Part time",
    },
  ]);
  const [showAdd, setShowAdd] = useState(false)
  // Stato per l'offerta da modificare
  const [offertaDaModificare, setOffertaDaModificare] = useState<OffertaDiLavoroProp | null>(null);

  // Aggiungere un'offerta
  const aggiungiOfferta = (nuovaOfferta: OffertaDiLavoroProp) => {
    setListaOfferte([...listaOfferte, nuovaOfferta]);
  };

  // Eliminare un'offerta
  const eliminaOfferta = (id: number) => {
    setListaOfferte(listaOfferte.filter((offerta) => offerta.id !== id));
  };

  // Impostare l'offerta da modificare
  const iniziaModifica = (offerta: OffertaDiLavoroProp) => {
    setOffertaDaModificare(offerta);
  };

  // Salvare la modifica di un'offerta
  const aggiornaOfferta = (offertaAggiornata: OffertaDiLavoroProp) => {
    setListaOfferte((prev) =>
      prev.map((offerta) => (offerta.id === offertaAggiornata.id ? offertaAggiornata : offerta))
    );
    setOffertaDaModificare(null); // Chiude il form di modifica
  };
  
  const [input, setInput] = useState("");

  // Filtriamo le offerte in base all'input dell'utente
  const offerteFiltrate = listaOfferte.filter((offerta) =>
    offerta.titolo.toLowerCase().includes(input.toLowerCase()) // Confronto case insensitive
  );
  return (
    <div>
      <h2>Home - Offerte di Lavoro</h2>
      <CustomButton onClick={()=> setShowAdd(prev => !prev)}>Aggiungi Offerta</CustomButton>
      {showAdd &&  <InputOfferta onSubmit={aggiungiOfferta} />}
      <input
        type="text"
        placeholder="Cerca un'offerta..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <table border={1} width="100%">
        <thead>
          <tr>
            <th>Titolo</th>
            <th>Azienda</th>
            <th>Provincia</th>
            <th>Data Inserimento</th>
            <th>Smart Working</th>
            <th>Contratto</th>
          </tr>
        </thead>
        <tbody>
          {offerteFiltrate.map((offerta) => (
            <tr key={offerta.id}>
              <td>{offerta.titolo}</td>
              <td>{offerta.azienda}</td>
              <td>{offerta.provincia}</td>
              <td>{offerta.dataInserimento}</td>
              <td>{offerta.smartWorking ? "Sì" : "No"}</td>
              <td>{offerta.contratto}</td>
                <button onClick={() => iniziaModifica(offerta)}>Modifica</button>
                {offertaDaModificare && (
              <td>
        <div>
          <h3>Modifica Offerta</h3>
          <InputOfferta onSubmit={aggiornaOfferta} initialData={offertaDaModificare} />
        </div>
              </td>
      )}
                <button onClick={() => eliminaOfferta(offerta.id)}>Elimina</button>
            </tr>
          ))}
        </tbody>
      </table>
     
      {/* Mostra il form solo se c'è un'offerta da modificare */}
      
    </div>
  );
};

export default OffertediLavoro;

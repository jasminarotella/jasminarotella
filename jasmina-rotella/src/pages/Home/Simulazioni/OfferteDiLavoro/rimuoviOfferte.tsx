import { useEffect, useState } from "react";
import axios from "axios";
import BoxJas from "../../components/BoxJas/BoxJas";
import NavOfferte from "./NavOfferte";
import CustomButton from "../../components/Button";
import InputSearch from "../../components/InputSearch/InputSearch";
import { Offerta } from "../../../../types/offerta";

const RimuoviOfferta: React.FC = () => {
  const [offerte, setOfferte] = useState<Offerta[]>([]);
  const [offerteFiltrate, setOfferteFiltrate] = useState<Offerta[]>([]);
  const [query, setQuery] = useState<string>("");
  const [provincia, setProvincia] = useState<string>("");
  const [provinceList, setProvinceList] = useState<string[]>([]);
  const [searchPerformed, setSearchPerformed] = useState<boolean>(false);

  // Carica tutte le offerte all'avvio
  const fetchData = async () => {
    try {
      const response = await axios.get<Offerta[]>("http://localhost:5001/offerte");
      setOfferte(response.data);
      setOfferteFiltrate(response.data);
      // Estrae le province uniche
      const uniqueProvinces = Array.from(new Set(response.data.map(offerta => offerta.provincia)));
      setProvinceList(uniqueProvinces);
    } catch (error) {
      console.error("❌ Errore nel recupero dei dati:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Gestione della ricerca
  const handleSearch = () => {
    setSearchPerformed(true);
    const filtered = offerte.filter(offerta => {
      const matchesQuery =
        query.trim() === "" ||
        offerta.titolo.toLowerCase().includes(query.toLowerCase()) ||
        offerta.descrizioneBreve.toLowerCase().includes(query.toLowerCase());
      const matchesProvincia =
        provincia.trim() === "" || offerta.provincia === provincia;
      return matchesQuery && matchesProvincia;
    });
    setOfferteFiltrate(filtered);
  };

  // Eliminazione dell'offerta selezionata
  const handleDelete = async (offerta: Offerta) => {
    const identifier = offerta.id; // usa il campo auto-increment "id"
    try {
      await axios.delete(`http://localhost:5001/offerte/${identifier}`);
      alert(`Offerta "${offerta.titolo}" eliminata con successo!`);
      fetchData();
    } catch (error) {
      console.error("❌ Errore nell'eliminazione dell'offerta:", error);
      alert("Errore durante l'eliminazione dell'offerta.");
    }
  };

  return (
    <>
      <NavOfferte />

      <BoxJas
        title="Rimuovi Offerta"
        description="Elimina un'offerta dopo aver effettuato una ricerca."
        classStyle="title2"
      />

      {/* Campo di ricerca */}
      <BoxJas
        title={
          <InputSearch
            query={query}
            setQuery={setQuery}
            provincia={provincia}
            setProvincia={setProvincia}
            provinceList={provinceList}
            handleSearch={handleSearch}
          />
        }
        description="Cerca offerte di lavoro nella tua città!"
      />

      {/* Risultati di ricerca */}
      {searchPerformed ? (
        <BoxJas
          title="Risultati di ricerca"
          description={
            offerteFiltrate.length === 0 ? (
              <p>Nessuna offerta disponibile.</p>
            ) : (
              offerteFiltrate.map(offerta => (
                <div
                  key={offerta.id}
                  style={{
                    marginBottom: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span>{offerta.titolo}</span>
                  <CustomButton onClick={() => handleDelete(offerta)}>
                    Elimina
                  </CustomButton>
                </div>
              ))
            )
          }
        />
      ) : (
        <BoxJas
          title="Risultati di ricerca"
          description={<p>Nessuna offerta disponibile.</p>}
        />
      )}
    </>
  );
};

export default RimuoviOfferta;

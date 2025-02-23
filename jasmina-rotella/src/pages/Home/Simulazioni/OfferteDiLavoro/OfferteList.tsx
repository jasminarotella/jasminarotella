import React, { useEffect, useState } from "react";
import "./OfferteList.css";
import axios from "axios";
import NavOfferte from "./NavOfferte";
import BoxJas from "../../components/BoxJas/BoxJas";
import InputSearch from "../../components/InputSearch/InputSearch";
import { Offerta } from "../../../../types/offerta";

const OfferteList: React.FC = () => {
  const [offerte, setOfferte] = useState<Offerta[]>([]);
  const [offerteFiltrate, setOfferteFiltrate] = useState<Offerta[]>([]);
  const [query, setQuery] = useState<string>("");
  const [provincia, setProvincia] = useState<string>("");
  const [provinceList, setProvinceList] = useState<string[]>([]);

  // 🔄 Recupera le offerte dal backend ed estrae le province uniche dalle offerte
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Offerta[]>("http://localhost:5001/offerte");
        console.log("✅ Dati ricevuti dal backend:", response.data);
        setOfferte(response.data);
        setOfferteFiltrate(response.data);

        // Estrai le province uniche direttamente dalle offerte
        const uniqueProvinces = Array.from(
          new Set(response.data.map(offerta => offerta.provincia))
        );
        console.log("✅ Province uniche estratte:", uniqueProvinces);
        setProvinceList(uniqueProvinces);
      } catch (error) {
        console.error("❌ Errore nel recupero dei dati:", error);
      }
    };
    fetchData();
  }, []);

  // 🔍 Funzione per filtrare le offerte in base a query e provincia
  const handleSearch = () => {
    const filtered = offerte.filter(offerta => {
      const matchesQuery =
        query.trim() === "" ||
        offerta.titolo.toLowerCase().includes(query.toLowerCase()) ||
        offerta.descrizioneBreve.toLowerCase().includes(query.toLowerCase());
      const matchesProvincia =
        provincia.trim() === "" || offerta.provincia === provincia;
      return matchesQuery && matchesProvincia;
    });
    console.log("🔍 Offerte filtrate:", filtered);
    setOfferteFiltrate(filtered);
  };

  return (
    <div>
      <NavOfferte />
      <div className="search-box-lavoro">
        <BoxJas
          title={
            <div >
              {/* Input di ricerca e selezione provincia */}
              <InputSearch
                query={query}
                setQuery={setQuery}
                provincia={provincia}
                setProvincia={setProvincia}
                provinceList={provinceList}
                handleSearch={handleSearch}
              />

            </div>
          }
          description={<div className="description-search">
            Cerca offerte di lavoro nella tua città!
          </div>}
        />
      </div>
      <div className="offertelist">
        {offerteFiltrate.length === 0 ? (
          <p>Nessuna offerta disponibile.</p>
        ) : (
          <div className="offerte">
            {offerteFiltrate.map(offerta => (
              <div key={offerta.id} className="offerta">
                <h3>{offerta.titolo}</h3>
                <p className="azienda">{offerta.azienda}</p>
                <p className="descrizione">{offerta.descrizioneBreve}</p>

                <div className="info-container">
                  <div className="info">
                    <i className="fas fa-map-marker-alt"></i>
                    <p>{offerta.provincia}</p>
                  </div>

                  <div className="info">
                    {offerta.smartWorking ? (
                      <>
                        <i className="fa fa-laptop"></i>
                        <p>Remote</p>
                      </>
                    ) : (
                      <>
                        <i className="fa fa-home"></i>
                        <p>In sede</p>
                      </>
                    )}
                  </div>

                  <div className="info">
                    <i className="fas fa-briefcase"></i>
                    <p>{offerta.tipologiaContratto}</p>
                  </div>
                </div>

                <p className="data">
                  {new Date(offerta.dataInserimento).toLocaleDateString()}
                </p>

                <button className="save-button">
                  <i className="far fa-heart"></i>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OfferteList;

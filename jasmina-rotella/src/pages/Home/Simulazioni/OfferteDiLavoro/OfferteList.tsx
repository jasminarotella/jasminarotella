import React, { useEffect, useState } from "react";
import "./OfferteList.css";
import axios from "axios";
import NavOfferte from "./NavOfferte";
import BoxJas from "../../components/BoxJas/BoxJas";
import InputSearch from "../../components/InputSearch";
import { Offerta } from "../../../../types/offerta";




const OfferteList: React.FC = () => {
    const [offerte, setOfferte] = useState<Offerta[]>([]);
    const [offerteFiltrate, setOfferteFiltrate] = useState<Offerta[]>([]);
    const [query, setQuery] = useState<string>("");
    const [provincia, setProvincia] = useState<string>("");

    // 🔄 Fetch API per ottenere le offerte dal backend
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:5001/offerte");
                console.log("✅ Dati ricevuti dal backend:", response.data); // Debug
                setOfferte(response.data);
                setOfferteFiltrate(response.data); // Mostra tutte le offerte inizialmente
            } catch (error) {
                console.error("❌ Errore nel recupero delle offerte:", error);
            }
        };
        fetchData();
    }, []);

    // 🔍 Funzione per filtrare le offerte
    const handleSearch = () => {
        let filtered = offerte.filter((offerta) =>
            (query === "" || 
                offerta.titolo.toLowerCase().includes(query.toLowerCase()) ||
                offerta.descrizioneBreve.toLowerCase().includes(query.toLowerCase())
            ) &&
            (provincia === "" || offerta.provincia === provincia)
        );

        console.log("🔍 Offerte filtrate:", filtered); // Debug
        setOfferteFiltrate(filtered);
    };

    return (
        <>
            <NavOfferte />
            <BoxJas title={
                <InputSearch 
                    offerte={offerte} 
                    setFiltrate={setOfferteFiltrate} 
                    query={query} 
                    setQuery={setQuery} 
                    provincia={provincia} 
                    setProvincia={setProvincia} 
                    handleSearch={handleSearch}
                />
            } description={<div>ciao</div>} />
            
            <div className="offertelist">
                {offerteFiltrate.length === 0 ? (
                    <p>Nessuna offerta disponibile.</p>
                ) : (
                    <div className="offerte">
                    {offerteFiltrate.map((offerta) => (
                        <div key={offerta.id} className="offerta"> {/* ✅ Chiave univoca */}
                            <h3>{offerta.titolo}</h3>
                            <p className="azienda">{offerta.azienda}</p>
                            <p className="descrizione">{offerta.descrizioneBreve}</p>
                
                            <div className="info-container">
                                <div className="info">
                                    <i className="fas fa-map-marker-alt"></i>
                                    <p>{offerta.provincia}</p>
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
        </>
    );
};

export default OfferteList;
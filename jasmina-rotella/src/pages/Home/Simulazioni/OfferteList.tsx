import React, { useEffect, useState } from "react";
import "./OfferteList.css";

import axios from "axios";
import CustomButton from "../../Button";
import { Link } from "react-router-dom";

export interface Offerta {
    _id: string;
    titolo: string;
    descrizioneBreve: string;
    azienda: string;
    provincia: string;
    smartWorking: boolean;
    retribuzioneLorda: number;
    tipologiaContratto: string;
    dataInserimento: string;
    className?: string;
}

const OfferteList: React.FC = () => {
    const [offerte, setOfferte] = useState<Offerta[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:5001/offerte");
                console.log("✅ Dati ricevuti dal backend:", response.data); // Debug
                setOfferte(response.data); // Salva i dati reali nel frontend
            } catch (error) {
                console.error("❌ Errore nel recupero delle offerte:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <><div className="instestazione">
            <h2>Offerte di Lavoro</h2>
            <Link to="/aggiungiofferta">
                <CustomButton className="button-add">+</CustomButton>aggiungi offerta
            </Link>
        </div><div className="offertelist">
                {offerte.length === 0 ? (
                    <p>Nessuna offerta disponibile.</p>
                ) : (
                    <ul className="offerte">
                        {offerte.map((offerta) => (
                            <li key={offerta._id} className="offerta">
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

                                    <div className="smartworking">
                                        <i className={`fas ${offerta.smartWorking ? "fa-laptop-house" : "fa-building"}`}></i>
                                        <p>{offerta.smartWorking ? "Smart Working" : "Presenza"}</p>
                                    </div>
                                </div>

                                <p className="data">
                                    {new Date(offerta.dataInserimento).toLocaleDateString()}
                                </p>

                                <button className="save-button">
                                    <i className="far fa-heart"></i>
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div></>

    );
};

export default OfferteList;

import React from "react";
import CustomButton from "./Button";
import FiltroComponent from "./Filtro";
import { Offerta } from "../Simulazioni/OfferteDiLavoro/OfferteList";

interface InputSearchProps {
    offerte: Offerta[];
    setFiltrate: (offerteFiltrate: Offerta[]) => void;
    query: string;
    setQuery: (query: string) => void;
    provincia: string;
    setProvincia: (provincia: string) => void;
    handleSearch: () => void;
}

const InputSearch: React.FC<InputSearchProps> = ({ offerte, setFiltrate, query, setQuery, provincia, setProvincia, handleSearch }) => {
    const searchJas = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'var(--color5)',
        borderRadius: 'var(--border-radius)',
        width: '100%',
        color: 'white',
        fontSize: '1rem',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.08)',
        gap: '10px',
        padding: '10px'
    };

    return (
        <div style={searchJas}>
            <FiltroComponent 
                offerte={offerte} 
                setFiltrate={setFiltrate} 
                query={query} 
                setQuery={setQuery}
                provincia={provincia}
                setProvincia={setProvincia}
            />
            
            {/* 🔍 Pulsante di ricerca */}
            <CustomButton className="button-search" onClick={handleSearch}>
                <i className="fas fa-search"></i>
            </CustomButton>
        </div>
    );
};

export default InputSearch;

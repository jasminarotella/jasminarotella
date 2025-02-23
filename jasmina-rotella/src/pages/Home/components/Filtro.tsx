import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import { Offerta } from '../Simulazioni/OfferteDiLavoro/OfferteList';

// Definizione delle props
interface FiltroComponentProps {
    offerte: Offerta[];
    setFiltrate: (offerteFiltrate: Offerta[]) => void;
}

const FiltroComponent: React.FC<FiltroComponentProps> = ({ offerte, setFiltrate }) => {
    // Stati per i filtri
    const [query, setQuery] = useState<string>("");
    const [provincia, setProvincia] = useState<string>("");

    // Funzione per filtrare le offerte
    useEffect(() => {
        let offerteFiltrate = offerte.filter((offerta) =>
            (query === "" || 
                offerta.titolo.toLowerCase().includes(query.toLowerCase()) || 
                offerta.descrizioneBreve.toLowerCase().includes(query.toLowerCase())
            ) &&
            (provincia === "" || offerta.provincia === provincia)
        );

        setFiltrate(offerteFiltrate);
    }, [query, provincia, offerte, setFiltrate]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '600px', margin: 'auto' }}>
            {/* 🔍 Filtro per Titolo/Descrizione */}
            <Autocomplete
                options={offerte}
                getOptionLabel={(option) => `${option.titolo} - ${option.descrizioneBreve}`}
                filterOptions={createFilterOptions({
                    matchFrom: "any",
                    stringify: (option: Offerta) => `${option.titolo} ${option.descrizioneBreve}`
                })}
                onChange={(event, value) => setQuery(value ? value.titolo : "")}
                renderInput={(params) => <TextField {...params} label="Cerca Offerta" />}
            />

            {/* 🏙️ Filtro per Provincia */}
            <TextField
                select
                label="Provincia"
                value={provincia}
                onChange={(e) => setProvincia(e.target.value)}
                SelectProps={{ native: true }}
            >
                <option value="">Tutte</option>
                <option value="Milano">Milano</option>
                <option value="Roma">Roma</option>
                <option value="Torino">Torino</option>
                {/* Puoi aggiungere tutte le province qui */}
            </TextField>
        </div>
    );
};

export default FiltroComponent;

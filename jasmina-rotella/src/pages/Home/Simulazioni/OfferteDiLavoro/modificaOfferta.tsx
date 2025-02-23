import { useEffect, useState } from "react";
import BoxJas from "../../components/BoxJas/BoxJas";
import NavOfferte from "./NavOfferte";
import {
    ButtonStyle, checkboxStyle, formStyle,
    inputStyle,
    labelStyle, selectStyle,
    smartStyle,
} from './aggiungiOff-css';
import { Offerta } from "../../../../types/offerta";
import CustomButton from "../../components/Button";
import axios from "axios";
import InputSearch from "../../components/InputSearch/InputSearch";
import { selectProvincia } from "./Prov";

const ModificaOfferta: React.FC = () => {
    const [offerte, setOfferte] = useState<Offerta[]>([]);
    const [offerteFiltrate, setOfferteFiltrate] = useState<Offerta[]>([]);
    const [query, setQuery] = useState<string>("");
    const [provincia, setProvincia] = useState<string>("");
    const [provinceList, setProvinceList] = useState<string[]>([]);
    // Indica se è stata eseguita una ricerca
    const [searchPerformed, setSearchPerformed] = useState<boolean>(false);
    const [selectedOfferta, setSelectedOfferta] = useState<Offerta | null>(null);

    const fetchData = async () => {
        try {
            const response = await axios.get<Offerta[]>("http://localhost:5001/offerte");
            setOfferte(response.data);
            setOfferteFiltrate(response.data);
            const uniqueProvinces = Array.from(new Set(response.data.map(offerta => offerta.provincia)));
            setProvinceList(uniqueProvinces);
        } catch (error) {
            console.error("❌ Errore nel recupero dei dati:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Filtra le offerte e imposta che la ricerca è stata eseguita
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

    // Seleziona l'offerta da modificare
    const handleSelect = (offerta: Offerta) => {
        setSelectedOfferta(offerta);
    };

    // Gestione dei cambiamenti per l'offerta selezionata
    const handleSelectedChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (selectedOfferta) {
            const { name, value, type } = e.target;
            setSelectedOfferta({
                ...selectedOfferta,
                [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
            });
        }
    };

    // Aggiorna l'offerta tramite PUT
    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (selectedOfferta) {
            // Usa selectedOfferta.id se esiste, altrimenti usa selectedOfferta._id
            const identifier = selectedOfferta.id ?? selectedOfferta.id;
            try {
                await axios.put(`http://localhost:5001/offerte/${identifier}`, selectedOfferta);
                alert("Offerta aggiornata con successo!");
                setSelectedOfferta(null);
                fetchData();
            } catch (error) {
                console.error("❌ Errore nell'aggiornamento dell'offerta:", error);
                alert("Errore durante l'aggiornamento dell'offerta.");
            }
        }
    };

    return (
        <>
            <NavOfferte />
            <BoxJas
                title="Modifica Offerta"
                description="Modifica un'offerta esistente dopo aver effettuato una ricerca."
                classStyle="title2"
            />
            {selectedOfferta && (
                <BoxJas
                    title=
                    {<h3>Modifica Offerta <span className="title2"> </span> </h3>}
                    description={
                        <form style={formStyle} onSubmit={handleUpdate}>
                            <div>
                                <label style={labelStyle}>Titolo</label>
                                <input
                                    type="text"
                                    name="titolo"
                                    style={inputStyle}
                                    value={selectedOfferta.titolo}
                                    onChange={handleSelectedChange}
                                    required
                                />
                            </div>
                            <div>
                                <label style={labelStyle}>Descrizione Breve</label>
                                <input
                                    type="text"
                                    name="descrizioneBreve"
                                    style={inputStyle}
                                    value={selectedOfferta.descrizioneBreve}
                                    onChange={handleSelectedChange}
                                    required
                                />
                            </div>
                            <div>
                                <label style={labelStyle}>Azienda</label>
                                <input
                                    type="text"
                                    name="azienda"
                                    style={inputStyle}
                                    value={selectedOfferta.azienda}
                                    onChange={handleSelectedChange}
                                    required
                                />
                            </div>
                            <div>
                                <label style={labelStyle}>Provincia</label>
                                <select
                                    name="provincia"
                                    style={selectStyle}
                                    value={selectedOfferta.provincia}
                                    onChange={handleSelectedChange}
                                    required
                                >
                                    {selectProvincia}
                                    </select>

                            </div>
                            <div style={smartStyle}>
                                <label>Smart Working</label>
                                <input
                                    type="checkbox"
                                    name="smartWorking"
                                    style={checkboxStyle}
                                    checked={selectedOfferta.smartWorking}
                                    onChange={handleSelectedChange}
                                />
                            </div>
                            <div>
                                <label style={labelStyle}>Retribuzione Lorda</label>
                                <input
                                    type="number"
                                    name="retribuzioneLorda"
                                    style={inputStyle}
                                    value={selectedOfferta.retribuzioneLorda}
                                    onChange={handleSelectedChange}
                                    required
                                />
                            </div>
                            <div>
                                <label style={labelStyle}>Tipologia Contratto</label>
                                <select
                                    name="tipologiaContratto"
                                    style={selectStyle}
                                    value={selectedOfferta.tipologiaContratto}
                                    onChange={handleSelectedChange}
                                    required
                                >
                                    <option value="">Seleziona un contratto</option>
                                    <option value="Full time">Full time</option>
                                    <option value="Part time">Part time</option>
                                    <option value="Stage">Stage</option>
                                    <option value="Tempo Determinato">Tempo Determinato</option>
                                    <option value="Tempo Indeterminato">Tempo Indeterminato</option>
                                </select>
                            </div>
                            <CustomButton type="submit" style={ButtonStyle}>
                                Aggiorna
                            </CustomButton>
                        </form>
                    }
                />
            )}

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

            {searchPerformed ? (
                <BoxJas
                    title={
                        <>
                            {offerteFiltrate.length === 0 ? (
                                <p>Nessuna offerta disponibile.</p>
                            ) : (
                                offerteFiltrate.map(offerta => (
                                    <div
                                        key={offerta.id}
                                        className="offerta-list"
                                        style={{
                                            marginBottom: "10px",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "space-between",
                                        }}
                                    >
                                        <span>{offerta.titolo}</span>
                                        <CustomButton onClick={() => handleSelect(offerta)}>
                                            Modifica
                                        </CustomButton>
                                    </div>
                                ))
                            )}
                        </>
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

export default ModificaOfferta;

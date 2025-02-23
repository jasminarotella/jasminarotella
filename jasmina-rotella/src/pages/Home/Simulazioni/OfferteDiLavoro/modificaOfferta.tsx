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
                                    <option value="">Seleziona una provincia</option>
                                    {/* Inserisci qui le opzioni per le province */}
                                    <option value="AG">Agrigento</option>
                                    <option value="AL">Alessandria</option>
                                    <option value="AN">Ancona</option>
                                    <option value="AO">Aosta</option>
                                    <option value="AR">Arezzo</option>
                                    <option value="AP">Ascoli Piceno</option>
                                    <option value="AT">Asti</option>
                                    <option value="AV">Avellino</option>
                                    <option value="BA">Bari</option>
                                    <option value="BT">Barletta-Andria-Trani</option>
                                    <option value="BL">Belluno</option>
                                    <option value="BN">Benevento</option>
                                    <option value="BG">Bergamo</option>
                                    <option value="BI">Biella</option>
                                    <option value="BO">Bologna</option>
                                    <option value="BZ">Bolzano</option>
                                    <option value="BS">Brescia</option>
                                    <option value="BR">Brindisi</option>
                                    <option value="CA">Cagliari</option>
                                    <option value="CL">Caltanissetta</option>
                                    <option value="CB">Campobasso</option>
                                    <option value="CE">Caserta</option>
                                    <option value="CT">Catania</option>
                                    <option value="CZ">Catanzaro</option>
                                    <option value="CH">Chieti</option>
                                    <option value="CO">Como</option>
                                    <option value="CS">Cosenza</option>
                                    <option value="CR">Cremona</option>
                                    <option value="KR">Crotone</option>
                                    <option value="CN">Cuneo</option>
                                    <option value="EN">Enna</option>
                                    <option value="FM">Fermo</option>
                                    <option value="FE">Ferrara</option>
                                    <option value="FI">Firenze</option>
                                    <option value="FG">Foggia</option>
                                    <option value="FC">Forlì-Cesena</option>
                                    <option value="FR">Frosinone</option>
                                    <option value="GE">Genova</option>
                                    <option value="GO">Gorizia</option>
                                    <option value="GR">Grosseto</option>
                                    <option value="IM">Imperia</option>
                                    <option value="IS">Isernia</option>
                                    <option value="SP">La Spezia</option>
                                    <option value="AQ">L'Aquila</option>
                                    <option value="LT">Latina</option>
                                    <option value="LE">Lecce</option>
                                    <option value="LC">Lecco</option>
                                    <option value="LI">Livorno</option>
                                    <option value="LO">Lodi</option>
                                    <option value="LU">Lucca</option>
                                    <option value="MC">Macerata</option>
                                    <option value="MN">Mantova</option>
                                    <option value="MS">Massa-Carrara</option>
                                    <option value="MT">Matera</option>
                                    <option value="ME">Messina</option>
                                    <option value="MI">Milano</option>
                                    <option value="MO">Modena</option>
                                    <option value="MB">Monza e Brianza</option>
                                    <option value="NA">Napoli</option>
                                    <option value="NO">Novara</option>
                                    <option value="NU">Nuoro</option>
                                    <option value="OR">Oristano</option>
                                    <option value="PD">Padova</option>
                                    <option value="PA">Palermo</option>
                                    <option value="PR">Parma</option>
                                    <option value="PV">Pavia</option>
                                    <option value="PG">Perugia</option>
                                    <option value="PU">Pesaro e Urbino</option>
                                    <option value="PE">Pescara</option>
                                    <option value="PC">Piacenza</option>
                                    <option value="PI">Pisa</option>
                                    <option value="PT">Pistoia</option>
                                    <option value="PN">Pordenone</option>
                                    <option value="PZ">Potenza</option>
                                    <option value="PO">Prato</option>
                                    <option value="RG">Ragusa</option>
                                    <option value="RA">Ravenna</option>
                                    <option value="RC">Reggio Calabria</option>
                                    <option value="RE">Reggio Emilia</option>
                                    <option value="RI">Rieti</option>
                                    <option value="RN">Rimini</option>
                                    <option value="RM">Roma</option>
                                    <option value="RO">Rovigo</option>
                                    <option value="SA">Salerno</option>
                                    <option value="SS">Sassari</option>
                                    <option value="SV">Savona</option>
                                    <option value="SI">Siena</option>
                                    <option value="SR">Siracusa</option>
                                    <option value="SO">Sondrio</option>
                                    <option value="SU">Sud Sardegna</option>
                                    <option value="TA">Taranto</option>
                                    <option value="TE">Teramo</option>
                                    <option value="TR">Terni</option>
                                    <option value="TO">Torino</option>
                                    <option value="TP">Trapani</option>
                                    <option value="TN">Trento</option>
                                    <option value="TV">Treviso</option>
                                    <option value="TS">Trieste</option>
                                    <option value="UD">Udine</option>
                                    <option value="VA">Varese</option>
                                    <option value="VE">Venezia</option>
                                    <option value="VB">Verbano-Cusio-Ossola</option>
                                    <option value="VC">Vercelli</option>
                                    <option value="VR">Verona</option>
                                    <option value="VV">Vibo Valentia</option>
                                    <option value="VI">Vicenza</option>
                                    <option value="VT">Viterbo</option>
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

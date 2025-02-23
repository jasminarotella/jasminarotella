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
    const [offerta, setOfferta] = useState<Offerta>({
        id: 0,
        titolo: '',
        descrizioneBreve: '',
        azienda: '',
        provincia: '',
        smartWorking: false,
        retribuzioneLorda: 0,
        tipologiaContratto: '',
        dataInserimento: new Date(),
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setOfferta((prevOfferta) => ({
            ...prevOfferta,
            [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value
        }));
    };


    const [showInput, setShowInput] = useState(false);
    const modifica = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5001/offerte", offerta);
            console.log("✅ Offerta aggiunta:", response.data);
            alert("Offerta aggiunta con successo!");
            setOfferta({
                            id: 0,
                            titolo: '',
                            descrizioneBreve: '',
                            azienda: '',
                            provincia: '',
                            smartWorking: false,
                            retribuzioneLorda: 0,
                            tipologiaContratto: '',
                            dataInserimento: new Date(),
                        });
        } catch (error) {
            console.error("❌ Errore nell'aggiunta dell'offerta:", error);
            alert("Errore durante l'aggiunta dell'offerta.");
        }
    }
    const IniziaModifica = () => {
        setShowInput((prev) => !prev)

    }

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
        <>
            <NavOfferte />
            <BoxJas title="Modifica Offerta"
                description={
                    <div>
                        Scegli l'offerta da modificare e salva per aggiornarla.
                        <CustomButton onClick={IniziaModifica}>Cerca offerta</CustomButton>
                    </div>}
                classStyle="title2" />
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

            {showInput &&
                <BoxJas
                    description={<>
                        {offerteFiltrate.length === 0 ? 
                        (
                            <p>Nessuna offerta disponibile.</p>
                        ) : 
                        (
                        <form style={formStyle} className="form-style" onSubmit={modifica}>
                            {offerteFiltrate.map(offerta => (
                            <div key={offerta.id} className="offerta">
                                <label style={labelStyle}>Titolo</label>
                                <input type="text" name="titolo" style={inputStyle} value={offerta.titolo} onChange={handleChange} required />
                            </div>

                            ))}
                            <div>
                                <label style={labelStyle}>Descrizione Breve</label>
                                <input type="text" name="descrizioneBreve" style={inputStyle} value={offerta.descrizioneBreve} onChange={handleChange} required />
                            </div>
                            <div>
                                <label style={labelStyle}>Azienda</label>
                                <input type="text" name="azienda" style={inputStyle} value={offerta.azienda} onChange={handleChange} required />
                            </div>
                            <div>
                                <label style={labelStyle}>Provincia</label>
                                <select name="provincia" style={selectStyle} value={offerta.provincia} onChange={handleChange} required>
                                    <option value="">Seleziona una provincia</option>
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
                                <input type="checkbox" name="smartWorking" style={checkboxStyle} checked={offerta.smartWorking} onChange={handleChange} />
                            </div>
                            <div>
                                <label style={labelStyle}>Retribuzione Lorda</label>
                                <input type="number" name="retribuzioneLorda" style={inputStyle} value={offerta.retribuzioneLorda} onChange={handleChange} required />
                            </div>
                            <div>
                                <label style={labelStyle}>Tipologia Contratto</label>
                                <select name="tipologiaContratto" style={selectStyle} value={offerta.tipologiaContratto} onChange={handleChange} required>
                                    <option value="">Seleziona un contratto</option>
                                    <option value="Full time">Full time</option>
                                    <option value="Part time">Part time</option>
                                    <option value="Stage">Stage</option>
                                    <option value="Tempo Determinato">Tempo Determinato</option>
                                    <option value="Tempo Indeterminato">Tempo Indeterminato</option>
                                </select>
                            </div>
                            <div>
                                <label style={labelStyle}>Data Inserimento</label>
                                <input type="date" name="dataInserimento" style={inputStyle} value={offerta.dataInserimento.toISOString().split('T')[0]} onChange={handleChange} required />
                            </div>

                            <CustomButton type="submit" style={ButtonStyle}>Aggiungi</CustomButton>
                        </form>
                        )
                    }
                    </>}
                />
            }

        </>
    )
};
export default ModificaOfferta;
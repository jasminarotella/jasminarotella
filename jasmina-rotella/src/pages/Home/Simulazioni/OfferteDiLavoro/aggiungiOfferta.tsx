import React, { useState } from 'react';
import axios from 'axios';
import {
     ButtonStyle, checkboxStyle, formStyle,
    inputStyle, labelStyle, selectStyle, smartStyle
} from './aggiungiOff-css';
import CustomButton from '../../components/Button';
import './OfferteList.css';
import NavOfferte from './NavOfferte';
import BoxJas from '../../components/BoxJas/BoxJas';

// Interfaccia per la struttura dell'offerta
interface Offerta {
    titolo: string;
    descrizioneBreve: string;
    azienda: string;
    provincia: string;
    smartWorking: boolean;
    retribuzioneLorda: number;
    tipologiaContratto: string;
    dataInserimento: string;
}

const AggiungiOfferta: React.FC = () => {
    const [offerta, setOfferta] = useState<Offerta>({
        titolo: '',
        descrizioneBreve: '',
        azienda: '',
        provincia: '',
        smartWorking: false,
        retribuzioneLorda: 0,
        tipologiaContratto: '',
        dataInserimento: new Date().toISOString().split('T')[0],
    });

    // Funzione per gestire i cambiamenti negli input
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setOfferta((prevOfferta) => ({
            ...prevOfferta,
            [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value
        }));
    };

    // Funzione per gestire l'invio del form
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5001/offerte", offerta);
            console.log("✅ Offerta aggiunta:", response.data);
            alert("Offerta aggiunta con successo!");
            setOfferta({
                titolo: '',
                descrizioneBreve: '',
                azienda: '',
                provincia: '',
                smartWorking: false,
                retribuzioneLorda: 0,
                tipologiaContratto: '',
                dataInserimento: new Date().toISOString().split('T')[0],
            });
        } catch (error) {
            console.error("❌ Errore nell'aggiunta dell'offerta:", error);
            alert("Errore durante l'aggiunta dell'offerta.");
        }
    };

    return (
        <>
            <NavOfferte />
            <BoxJas title="Aggiungi Offerta" description="Compila il form per aggiungere un'offerta di lavoro." />
            
            <form style={formStyle} className="form-style" onSubmit={handleSubmit}>
                <div>
                    <label style={labelStyle}>Titolo</label>
                    <input type="text" name="titolo" style={inputStyle} value={offerta.titolo} onChange={handleChange} required />
                </div>
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
                    <input type="date" name="dataInserimento" style={inputStyle} value={offerta.dataInserimento} onChange={handleChange} required />
                </div>

                <CustomButton type="submit" style={ButtonStyle}>Aggiungi</CustomButton>
            </form>
        </>
    );
};

export default AggiungiOfferta;

import React, { useState, useEffect } from "react";
import PastiTracker, { PastoData } from "./PastiTracker";
import "./ActivityTracker.css";

/** Ritorna l'anno corrente come stringa (es. "2025") */
function getCurrentYear() {
  return new Date().getFullYear().toString();
}

/** Struttura di un record di pasto salvato */
interface PastoEntry extends PastoData {
  id: number;
  date: string;        // Data del giorno (opzionale)
  notes: string;       // Note generali
  startTime: string;   // Ora inizio
  endTime: string;     // Ora fine
  duration: number;    // Durata in minuti
}

const ActivityTracker: React.FC = () => {
  const [selectedActivity, setSelectedActivity] = useState("");
  
  // Box universale (non condizionale)
  const [notes, setNotes] = useState("");
  const [startTime, setStartTime] = useState("12:30");
  const [endTime, setEndTime] = useState("13:30");
  const [duration, setDuration] = useState(60); // minuti
  const [successMessage, setSuccessMessage] = useState("");

  // Dati specifici del pasto
  const [pastoData, setPastoData] = useState<PastoData>({
    type: "colazione",
    carboidrati: "",
    proteine: "",
    grassi: "",
    fruttaVerdura: "",
    dolci: "",
    fastfood: "",
  });

  // Controllo di "Capodanno": se l'anno in localStorage è diverso, resettiamo
  useEffect(() => {
    const currentYear = getCurrentYear();
    const storedYear = localStorage.getItem("yearKey");
    if (storedYear !== currentYear) {
      // Nuovo anno → reset
      localStorage.setItem("yearKey", currentYear);
      localStorage.removeItem("pastoEntries");
      localStorage.removeItem("pastiCounter");
    }
  }, []);

  // Calcolo automatico della durata (in minuti) quando start/end cambiano
  useEffect(() => {
    const calcDuration = () => {
      const [sh, sm] = startTime.split(":").map(Number);
      const [eh, em] = endTime.split(":").map(Number);
      const startMin = sh * 60 + sm;
      const endMin = eh * 60 + em;
      const diff = endMin - startMin;
      setDuration(diff > 0 ? diff : 0);
    };
    calcDuration();
  }, [startTime, endTime]);

  /** Aggiorna i campi di PastiTracker (child) */
  const handlePastoDataChange = (updated: Partial<PastoData>) => {
    setPastoData((prev) => ({ ...prev, ...updated }));
  };

  /** Quando l'utente sceglie un'attività dal select */
  const handleSelectActivity = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedActivity(e.target.value);
    setSuccessMessage("");
  };

  /** Aggiunge l'attività (clic su +) */
  const handleAddActivity = () => {
    // Se l'attività selezionata non è "pasto", mostriamo un alert
    // (Puoi cambiare la logica come preferisci)
    if (selectedActivity !== "pasto") {
      alert(`Form per "${selectedActivity}" non ancora implementato!`);
      return;
    }

    // Altrimenti salviamo i dati di "pasto"
    const newPastoEntry: PastoEntry = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      notes,
      startTime,
      endTime,
      duration,
      ...pastoData, // type, carboidrati, proteine, etc.
    };

    // 1. Salva in localStorage → "pastoEntries"
    const stored = localStorage.getItem("pastoEntries");
    let pastoEntries: PastoEntry[] = stored ? JSON.parse(stored) : [];
    pastoEntries.push(newPastoEntry);
    localStorage.setItem("pastoEntries", JSON.stringify(pastoEntries));

    // 2. Incrementa il counter "pastiCounter"
    const counterString = localStorage.getItem("pastiCounter");
    let counter = counterString ? parseInt(counterString, 10) : 0;
    counter++;
    localStorage.setItem("pastiCounter", counter.toString());

    // 3. Mostra un messaggio di successo
    setSuccessMessage("Attività aggiunta con successo!");

    // 4. Resetta i campi
    //   - pulisci i campi di pasto, se vuoi
    setPastoData({
      type: "colazione",
      carboidrati: "",
      proteine: "",
      grassi: "",
      fruttaVerdura: "",
      dolci: "",
      fastfood: "",
    });
    setNotes("");
    setStartTime("12:30");
    setEndTime("13:30");

    // Nascondi il messaggio dopo qualche secondo (opzionale)
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  return (
    <div className="activity-tracker-container">
      <h2>Activity Tracker</h2>

      <label htmlFor="activity-select">Seleziona tipo di attività:</label>
      <select
        id="activity-select"
        value={selectedActivity}
        onChange={handleSelectActivity}
      >
        <option value="">-- Seleziona --</option>
        <option value="ITS - lezioni">ITS - lezioni</option>
        <option value="ITS - stage">ITS - stage</option>
        <option value="journalino">journalino</option>
        <option value="studio">studio</option>
        <option value="lavoro">lavoro</option>
        <option value="attività fisica">attività fisica</option>
        <option value="pasto">pasto</option>
        <option value="svago">svago</option>
        <option value="journaling">journaling</option>
        <option value="sintomi fisici">sintomi fisici</option>
        <option value="relax">relax</option>
        <option value="meditazione">meditazione</option>
        <option value="acqua/bevanda">acqua/bevanda</option>
        <option value="medicine">medicine</option>
      </select>

      {/* Rendering condizionale per "pasto" */}
      {selectedActivity === "pasto" && (
        <PastiTracker
          pastoData={pastoData}
          onPastoDataChange={handlePastoDataChange}
        />
      )}

      {/* BOX NON CONDIZIONALE (note, orari, durata, pulsante +) */}
      <div className="universal-box">
        <label>Note:</label>
        <textarea
          placeholder="mangiato al mc con Giuliano..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        <div className="time-box">
          <label>Da:</label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
          <label>A:</label>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>

        <p className="duration-info">Durata: {duration} minuti</p>

        <button className="btn-add" onClick={handleAddActivity}>
          +
        </button>
      </div>

      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
    </div>
  );
};

export default ActivityTracker;

import React from "react";

/** Struttura dei dati specifici del pasto */
export interface PastoData {
  type: string;           // colazione, pranzo, cena, ...
  carboidrati: string;
  proteine: string;
  grassi: string;
  fruttaVerdura: string;
  dolci: string;
  fastfood: string;
}

interface PastiTrackerProps {
  pastoData: PastoData;
  onPastoDataChange: (updated: Partial<PastoData>) => void;
}

const PastiTracker: React.FC<PastiTrackerProps> = ({ pastoData, onPastoDataChange }) => {
  const handleChange = (field: keyof PastoData, value: string) => {
    onPastoDataChange({ [field]: value });
  };

  return (
    <div className="pasti-tracker-container">
      <h3>Pasto</h3>

      <label>Tipo di pasto:</label>
      <select
        value={pastoData.type}
        onChange={(e) => handleChange("type", e.target.value)}
      >
        <option value="colazione">colazione</option>
        <option value="pranzo">pranzo</option>
        <option value="cena">cena</option>
        <option value="spuntino">spuntino</option>
        <option value="spuntino">acqua</option>
        <option value="altro">altro</option>
      </select>

      <label>Carboidrati:</label>
      <input
        type="text"
        placeholder="Es. pane, pasta..."
        value={pastoData.carboidrati}
        onChange={(e) => handleChange("carboidrati", e.target.value)}
      />

      <label>Proteine:</label>
      <input
        type="text"
        placeholder="Es. carne, pesce..."
        value={pastoData.proteine}
        onChange={(e) => handleChange("proteine", e.target.value)}
      />

      <label>Grassi:</label>
      <input
        type="text"
        placeholder="Es. filo di olio..."
        value={pastoData.grassi}
        onChange={(e) => handleChange("grassi", e.target.value)}
      />

      <label>Frutta/Verdura:</label>
      <input
        type="text"
        placeholder="Es. insalata, arancia..."
        value={pastoData.fruttaVerdura}
        onChange={(e) => handleChange("fruttaVerdura", e.target.value)}
      />

      <label>Dolci:</label>
      <input
        type="text"
        placeholder="Es. tiramisù..."
        value={pastoData.dolci}
        onChange={(e) => handleChange("dolci", e.target.value)}
      />

      <label>Fast Food:</label>
      <input
        type="text"
        placeholder="Es. McNuggets..."
        value={pastoData.fastfood}
        onChange={(e) => handleChange("fastfood", e.target.value)}
      />
    </div>
  );
};

export default PastiTracker;

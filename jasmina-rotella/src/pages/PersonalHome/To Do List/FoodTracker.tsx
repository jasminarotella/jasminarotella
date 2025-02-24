import React, { useEffect, useState } from "react";

interface PastoEntry {
  id: number;
  type: string;
  carboidrati: string;
  proteine: string;
  grassi: string;
  fruttaVerdura: string;
  dolci: string;
  fastfood: string;
  notes: string;
  startTime: string;
  endTime: string;
  duration: number;
}

const FoodTracker: React.FC = () => {
  const [pasti, setPasti] = useState<PastoEntry[]>([]);

  useEffect(() => {
    const storedData = localStorage.getItem("pastoEntries");
    if (storedData) {
      try {
        // Prova a fare il parse del JSON
        const parsedData = JSON.parse(storedData) as PastoEntry[];
        setPasti(parsedData);
      } catch (error) {
        console.error("Errore di parsing JSON:", error);
      }
    }
  }, []);

  if (pasti.length === 0) {
    return <p>Nessun pasto registrato.</p>;
  }

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h3>Elenco Pasti</h3>
      {pasti.map((pasto) => (
        <div key={pasto.id} style={{ marginBottom: "10px", border: "1px solid #ccc", padding: "10px", borderRadius: "6px" }}>
          <p><strong>Tipo di pasto:</strong> {pasto.type}</p>
          <p><strong>Carboidrati:</strong> {pasto.carboidrati}</p>
          <p><strong>Proteine:</strong> {pasto.proteine}</p>
          <p><strong>Grassi:</strong> {pasto.grassi}</p>
          <p><strong>Frutta e Verdura:</strong> {pasto.fruttaVerdura}</p>
          <p><strong>Dolci:</strong> {pasto.dolci}</p>
          <p><strong>Fast Food:</strong> {pasto.fastfood}</p>
          <p><strong>Note:</strong> {pasto.notes}</p>
          <p>
            <strong>Orario:</strong> {pasto.startTime} - {pasto.endTime} 
            &nbsp;({pasto.duration} minuti)
          </p>
        </div>
      ))}
    </div>
  );
};

export default FoodTracker;

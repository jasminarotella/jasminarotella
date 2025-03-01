import { useState } from "react";

const RatioMockupScriptPanel = () => {
  const [pngFolder, setPngFolder] = useState("");
  const [psdFolder, setPsdFolder] = useState("");
  const [outputFolder, setOutputFolder] = useState("");
  const [log, setLog] = useState("");

  // Usa window.uxp se disponibile, altrimenti null.
  const uxp = typeof window !== "undefined" && (window as any).uxp ? (window as any).uxp : null;

  // Funzione per selezionare una cartella usando le API UXP
  const selectFolder = async (folderType: string) => {
    try {
      if (!uxp) {
        throw new Error("UXP non disponibile. Questo plugin deve essere eseguito in Photoshop.");
      }
      const fs = uxp.storage.localFileSystem;
      const folder = await fs.getFolder(); // Apre il selettore cartelle
      if (folder) {
        const folderPath = await folder.nativePath;
        if (folderType === "png") setPngFolder(folderPath);
        else if (folderType === "psd") setPsdFolder(folderPath);
        else if (folderType === "output") setOutputFolder(folderPath);
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Errore selezione cartella:", error.message);
        setLog((prevLog) => prevLog + `\nErrore selezione cartella: ${error.message}`);
      } else {
        console.error("Errore sconosciuto durante la selezione cartella.");
        setLog((prevLog) => prevLog + "\nErrore sconosciuto durante la selezione cartella.");
      }
    }
  };

  // Funzione per eseguire uno script in Photoshop
  const runScript = async (scriptName: string) => {
    try {
      if (!uxp) {
        throw new Error("UXP non disponibile. Questo plugin deve essere eseguito in Photoshop.");
      }
      const { photoshop } = uxp;
      if (!photoshop) {
        throw new Error("Modulo Photoshop non disponibile.");
      }
      if (scriptName === "insertAndResize") {
        const activeDoc = photoshop.app.activeDocument;
        if (!activeDoc) throw new Error("Nessun documento aperto");
        // Esempio: ridimensiona l'immagine a 800x600
        activeDoc.resizeImage(800, 600);
        setLog((prevLog) => prevLog + "\nInsert & Resize completato!");
      }
      if (scriptName === "automazioneMockup") {
        // Inserisci qui la logica per l'automazione del mockup
        setLog((prevLog) => prevLog + "\nAutomazione Mockup eseguita!");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(`Errore nello script ${scriptName}:`, error.message);
        setLog((prevLog) => prevLog + `\nErrore: ${error.message}`);
      } else {
        console.error("Errore sconosciuto.");
        setLog((prevLog) => prevLog + `\nErrore sconosciuto durante ${scriptName}.`);
      }
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>Photoshop Automation Panel</h2>

      {/* Selettori cartelle */}
      <div style={{ marginBottom: "10px" }}>
        <label>PNG Folder: </label>
        <input
          type="text"
          value={pngFolder}
          readOnly
          style={{ width: "300px", marginRight: "10px" }}
        />
        <button onClick={() => selectFolder("png")}>Select PNG Folder</button>
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label>PSD Folder: </label>
        <input
          type="text"
          value={psdFolder}
          readOnly
          style={{ width: "300px", marginRight: "10px" }}
        />
        <button onClick={() => selectFolder("psd")}>Select PSD Folder</button>
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label>Output Folder: </label>
        <input
          type="text"
          value={outputFolder}
          readOnly
          style={{ width: "300px", marginRight: "10px" }}
        />
        <button onClick={() => selectFolder("output")}>Select Output Folder</button>
      </div>

      {/* Bottoni per eseguire gli script */}
      <div style={{ marginTop: "20px" }}>
        <button onClick={() => runScript("insertAndResize")} style={{ marginRight: "10px" }}>
          Run Insert & Resize
        </button>
        <button onClick={() => runScript("automazioneMockup")} style={{ marginRight: "10px" }}>
          Run Automazione Mockup
        </button>
      </div>

      {/* Log output */}
      <div
        style={{
          marginTop: "20px",
          border: "1px solid #ccc",
          padding: "10px",
          height: "150px",
          overflow: "auto"
        }}
      >
        <h3>Log</h3>
        <pre>{log}</pre>
      </div>
    </div>
  );
};

export default RatioMockupScriptPanel;

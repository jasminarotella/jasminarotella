import { useState } from "react";

const RatioMockupScriptPanel = () => {
  const [log, setLog] = useState("");

  const appendLog = (text: string) => {
    setLog((prev) => prev + "\n" + text);
  };

  const runRatioMockup = async () => {
    try {
      // Verifica se UXP è disponibile
      const uxp = (window as any).uxp;
      if (!uxp) throw new Error("UXP non disponibile. Il plugin deve essere eseguito in Photoshop.");
      
      const fs = uxp.storage.localFileSystem;

      // ---- Seleziona cartella PNG ----
      appendLog("Seleziona la cartella contenente i file PNG...");
      const pngFolder = await fs.getFolder();
      if (!pngFolder) throw new Error("Nessuna cartella PNG selezionata.");
      const pngEntries = await pngFolder.getEntries();
      const pngFiles = pngEntries.filter((entry: any) => entry.isFile && entry.name.toLowerCase().endsWith(".png"));
      if (pngFiles.length < 1) throw new Error("Nessun file PNG trovato.");

      // ---- Seleziona cartella PSD ----
      appendLog("Seleziona la cartella contenente i file PSD...");
      const psdFolder = await fs.getFolder();
      if (!psdFolder) throw new Error("Nessuna cartella PSD selezionata.");
      const psdEntries = await psdFolder.getEntries();
      const psdFiles = psdEntries.filter((entry: any) => entry.isFile && entry.name.toLowerCase().endsWith(".psd"));
      if (psdFiles.length < 1) throw new Error("Nessun file PSD trovato.");

      // ---- Seleziona cartella di Output ----
      appendLog("Seleziona la cartella di destinazione per i file finali...");
      const outputFolder = await fs.getFolder();
      if (!outputFolder) throw new Error("Nessuna cartella di output selezionata.");

      // ---- Crea le cartelle "m-1", "m-2", ... e "m-set" ----
      for (let i = 0; i < pngFiles.length; i++) {
        const subfolderName = "m-" + (i + 1);
        let subfolder;
        try {
          subfolder = await outputFolder.getEntry(subfolderName);
        } catch {
          subfolder = await outputFolder.createFolder(subfolderName);
        }
        appendLog(`Cartella creata: ${subfolderName}`);
      }
      let multiFolder;
      try {
        multiFolder = await outputFolder.getEntry("m-set");
      } catch {
        multiFolder = await outputFolder.createFolder("m-set");
      }
      appendLog("Cartella creata: m-set");

      // ---- Ottieni l'API di Photoshop ----
      const { photoshop } = uxp;
      if (!photoshop) throw new Error("Modulo Photoshop non disponibile.");

      // ---- Processa ogni file PSD ----
      for (let i = 0; i < psdFiles.length; i++) {
        const psdFile = psdFiles[i];
        appendLog(`Apro il file PSD: ${psdFile.name}`);
        // Apri il documento PSD (nota: photoshop.app.open accetta il percorso nativo)
        const doc = await photoshop.app.open(psdFile.nativePath);
        // Esempio: ridimensiona l'immagine a 800x600
        await doc.resizeImage(800, 600);
        appendLog(`Documento ridimensionato: ${psdFile.name}`);
        // Salva il documento come JPEG nella cartella m-set
        const outputName = psdFile.name.replace(".psd", ".jpg");
        const outputPath = multiFolder.nativePath + "/" + outputName;
        // Esegui una chiamata batchPlay per salvare come JPEG (questo è un esempio semplificato)
        await photoshop.action.batchPlay(
          [
            {
              _obj: "save",
              as: {
                _obj: "JPEGSaveOptions",
                quality: 7,
              },
              in: outputPath,
              documentID: doc.documentID,
              _isCommand: true,
              _options: { dialogOptions: "dontDisplay" },
            },
          ],
          { synchronousExecution: true }
        );
        appendLog(`Documento salvato come JPEG: ${outputPath}`);
        await doc.closeWithoutSaving();
      }

      appendLog("Operazione completata!");
    } catch (error: unknown) {
      if (error instanceof Error) {
        appendLog("Errore: " + error.message);
        console.error("Errore in runRatioMockup:", error);
      } else {
        appendLog("Errore sconosciuto.");
      }
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>Plugin Ratio Mockup (UXP)</h2>
      <button onClick={runRatioMockup}>Esegui Ratio Mockup</button>
      <div
        style={{
          marginTop: "20px",
          border: "1px solid #ccc",
          padding: "10px",
          height: "300px",
          overflow: "auto",
        }}
      >
        <h3>Log</h3>
        <pre>{log}</pre>
      </div>
    </div>
  );
};

export default RatioMockupScriptPanel;

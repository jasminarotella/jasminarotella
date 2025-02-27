import { useState } from 'react';
import CSInterface from './CSInterface.js'; // Import default

const RatioMockupScriptPanel = () => {
  const [pngFolder, setPngFolder] = useState('');
  const [psdFolder, setPsdFolder] = useState('');
  const [outputFolder, setOutputFolder] = useState('');
  const [log, setLog] = useState('');

  // Crea un'istanza della classe CSInterface
  const csInterfaceInstance = new CSInterface();

  // Funzione per chiamare il dialogo di selezione cartella tramite ExtendScript
  const selectFolder = (folderType: string) => {
    const script = `
      (function(){
          var folder = Folder.selectDialog("Seleziona la cartella per ${folderType.toUpperCase()}");
          if(folder) folder.fsName; else "";
      })();
    `;
    csInterfaceInstance.evalScript(script, (result: string) => {
      if (result) {
        if (folderType === 'png') setPngFolder(result);
        else if (folderType === 'psd') setPsdFolder(result);
        else if (folderType === 'output') setOutputFolder(result);
      }
    });
  };

  // Funzioni per eseguire gli script di automazione
  const runInsertAndResize = () => {
    csInterfaceInstance.evalScript("mainInsertAndResize()", (result: string) => {
      setLog((prevLog) => prevLog + "\nInsert & Resize: " + result);
    });
  };

  const runAutomazioneMockup = () => {
    csInterfaceInstance.evalScript("mainAutomazioneMockup()", (result: string) => {
      setLog((prevLog) => prevLog + "\nAutomazione Mockup: " + result);
    });
  };

  // Esegue entrambi gli script in successione
  const runBoth = () => {
    runInsertAndResize();
    runAutomazioneMockup();
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Photoshop Automation Panel</h2>
      <div style={{ marginBottom: '10px' }}>
        <label>PNG Folder: </label>
        <input type="text" value={pngFolder} readOnly style={{ width: '300px', marginRight: '10px' }} />
        <button onClick={() => selectFolder('png')}>Select PNG Folder</button>
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label>PSD Folder: </label>
        <input type="text" value={psdFolder} readOnly style={{ width: '300px', marginRight: '10px' }} />
        <button onClick={() => selectFolder('psd')}>Select PSD Folder</button>
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label>Output Folder: </label>
        <input type="text" value={outputFolder} readOnly style={{ width: '300px', marginRight: '10px' }} />
        <button onClick={() => selectFolder('output')}>Select Output Folder</button>
      </div>
      <div style={{ marginTop: '20px' }}>
        <button onClick={runInsertAndResize} style={{ marginRight: '10px' }}>
          Run Insert & Resize
        </button>
        <button onClick={runAutomazioneMockup} style={{ marginRight: '10px' }}>
          Run Automazione Mockup
        </button>
        <button onClick={runBoth}>
          Run Both
        </button>
      </div>
      <div style={{ marginTop: '20px', border: '1px solid #ccc', padding: '10px', height: '150px', overflow: 'auto' }}>
        <h3>Log</h3>
        <pre>{log}</pre>
      </div>
    </div>
  );
};

export default RatioMockupScriptPanel;

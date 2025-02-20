import { FormEvent, useState } from "react";
import CustomButton from "../Button";

interface FormData {
  id: number;
  nome: string;
  tipo: string;
}

interface CreaFormProps {
  setFormData: React.Dispatch<React.SetStateAction<FormData[]>>;
  formData: FormData[];
}

const CreaForm: React.FC<CreaFormProps> = ({ setFormData, formData }) => {
  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState("input");

  // Stili usati per l'anteprima (stessi del file generato)
  const formStyle: React.CSSProperties = {
    backgroundColor: "var(--color2)",
    borderRadius: "var(--border-radius)",
    padding: "10px",
    marginTop: "20px"
  };

  const labelStyle: React.CSSProperties = {
    marginRight: "var(--margin-label)",
  };

  const selectStyle: React.CSSProperties = {
    padding: "5px",
    borderRadius: "var(--border-radius-background)",
    margin: "var(--margin-input)",
  };

  // Aggiunge un nuovo campo all'array formData
  const handleAddField = (event: FormEvent) => {
    event.preventDefault();

    if (!nome.trim()) {
      console.log("Errore: il nome è vuoto!");
      return;
    }

    const newEntry: FormData = {
      id: formData.length + 1,
      nome: nome,
      tipo: tipo,
    };

    setFormData([...formData, newEntry]);
    setNome("");
    setTipo("input");
  };

  // Genera il codice del componente in base ai campi presenti in formData
  const generateComponentCode = (data: FormData[]): string => {
    const fieldsCode = data
      .map((field) => {
        if (field.tipo === "input") {
          return `<div key="${field.id}">
  <label style={labelStyle}>${field.nome}</label>
  <input type="text" />
</div>`;
        } else if (field.tipo === "select") {
          return `<div key="${field.id}">
  <label style={labelStyle}>${field.nome}</label>
  <select style={selectStyle}>
    <option>Opzione 1</option>
    <option>Opzione 2</option>
  </select>
</div>`;
        } else if (field.tipo === "checkbox") {
          return `<div key="${field.id}">
  <label style={labelStyle}>${field.nome}</label>
  <input type="checkbox" />
</div>`;
        } else if (field.tipo === "date") {
          return `<div key="${field.id}">
  <label style={labelStyle}>${field.nome}</label>
  <input type="date" />
  <button type='submit'>aggiungi</button>
</div>`;
        }
        return "";
      })
      .join("\n");

    return `import React from 'react';

const GeneratedForm: React.FC = () => {
  const formStyle: React.CSSProperties = {
    backgroundColor: 'var(--color2)',
    borderRadius: 'var(--border-radius)',
    padding: '10px',
  };

  const labelStyle: React.CSSProperties = {
    marginRight: 'var(--margin-label)',
  };

  const selectStyle: React.CSSProperties = {
    padding: '5px',
    borderRadius: 'var(--border-radius-background)',
    margin: 'var(--margin-input)',
  };

  return (
    <form style={formStyle} className='form-style'>
      ${fieldsCode}
    </form>
  );
};

export default GeneratedForm;
`;
  };

  // Salva il codice generato in un file scaricabile
  const saveFile = (content: string, filename: string) => {
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Gestore del pulsante "Salva Form": genera il componente, lo salva e resetta i campi
  const handleSaveForm = () => {
    if (formData.length === 0) {
      alert("Nessun campo da salvare!");
      return;
    }
    const code = generateComponentCode(formData);
    saveFile(code, "GeneratedForm.jsx");
    // Resetta l'array per poter creare un nuovo form
    setFormData([]);
  };

  // Funzione che rende l'anteprima del form in base ai campi
  const renderPreview = () => {
    return (
      <form style={formStyle}>
        {formData.map((field) => {
          switch (field.tipo) {
            case "input":
              return (
                <div key={field.id}>
                  <label style={labelStyle}>{field.nome}</label>
                  <input type="text" />
                </div>
              );
            case "select":
              return (
                <div key={field.id}>
                  <label style={labelStyle}>{field.nome}</label>
                  <select style={selectStyle}>
                    <option>Opzione 1</option>
                    <option>Opzione 2</option>
                  </select>
                </div>
              );
            case "checkbox":
              return (
                <div key={field.id}>
                  <label style={labelStyle}>{field.nome}</label>
                  <input type="checkbox" />
                </div>
              );
            case "date":
              return (
                <div key={field.id}>
                  <label style={labelStyle}>{field.nome}</label>
                  <input type="date" />
                </div>
              );
            default:
              return null;
          }
        })}
      </form>
    );
  };

  return (
    <div>
      <form onSubmit={handleAddField}>
        <label>
          Nome Proprietà:
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </label>

        <label>
          Tipo:
          <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
            <option value="input">Input</option>
            <option value="select">Select</option>
            <option value="checkbox">Checkbox</option>
            <option value="date">Data</option>
          </select>
        </label>

        {/* Pulsante per aggiungere il campo */}
        <CustomButton type="submit">+</CustomButton>
      </form>

      {/* Sezione anteprima: mostra il form creato dinamicamente */}
      {formData.length > 0 && (
        <div>
          <h3>Anteprima Form</h3>
          {renderPreview()}
        </div>
      )}

      {/* Pulsante per salvare il form e resettare i campi */}
      <CustomButton type="button" onClick={handleSaveForm}>
        Salva Form
      </CustomButton>
    </div>
  );
};

export default CreaForm;

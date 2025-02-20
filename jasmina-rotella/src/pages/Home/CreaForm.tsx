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

    // Aggiunge il nuovo campo all'array dello stato
    setFormData([...formData, newEntry]);

    // Resetta i campi di input
    setNome("");
    setTipo("input");
  };

  return (
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

      {/* Il pulsante "più" che aggiunge il campo */}
      <CustomButton type="submit">
        +
      </CustomButton>
    </form>
  );
};

export default CreaForm;

import React, { useState } from "react";
import { OffertaDiLavoroProp } from "./offertediLavoro";
import CustomButton from "../../Button";

interface InputOffertaProps {
  onSubmit: (offerta: OffertaDiLavoroProp) => void;
  initialData?: OffertaDiLavoroProp;
}


const InputOfferta: React.FC<InputOffertaProps> = ({ onSubmit, initialData }) => {
  const [formData, setFormData] = useState<OffertaDiLavoroProp>(
    initialData || {
      id: Date.now(),
      titolo: "",
      descrizioneBreve: "",
      azienda: "",
      provincia: "",
      dataInserimento: new Date().toISOString().split("T")[0], 
      smartWorking: false,
      contratto: "",
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, type, value } = e.target;
    const target = e.target as HTMLInputElement; // Assicura che funzioni per checkbox

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? target.checked : value, // Se checkbox, usa checked
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} >
        <label>
          Titolo:
          <input
            type="text"
            name="titolo"
            value={formData.titolo}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Descrizione Offerta di Lavoro:
          <input
            type="text"
            name="descrizioneBreve"
            value={formData.descrizioneBreve}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Azienda:
          <input
            type="text"
            name="azienda"
            value={formData.azienda}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Provincia:
          <input
            type="text"
            name="provincia"
            value={formData.provincia}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Data:
          <input
            type="date"
            name="dataInserimento"
            value={formData.dataInserimento}
            onChange={handleChange} 
            required
          />
        </label>

        <label>
          Smart-Working?
          <input
            type="checkbox"
            name="smartWorking"
            checked={formData.smartWorking}
            onChange={handleChange} 
          />
        </label>

        <label>
          Contratto:
          <input
            type="text"
            name="contratto"
            value={formData.contratto}
            onChange={handleChange}
            required
          />
        </label>

        <CustomButton type="submit">Salva Offerta</CustomButton>
      </form>
    </div>
  );
};

export default InputOfferta;

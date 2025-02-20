import React from "react";

interface FormData {
    id: number;
    nome: string;
    tipo: string;
}

interface FormProps {
    formData: FormData[];
}

const Form: React.FC<FormProps> = ({ formData }) => {
    return (
        <div>
            <h2>Campi Creati:</h2>
            {formData.length === 0 ? <p>Nessun campo creato</p> : null}

            {formData.map((item) => (
                <div key={item.id}>
                    <label>{item.nome}</label>
                    {item.tipo === "input" && <input type="text" />}
                    {item.tipo === "select" && (
                        <select>
                            <option>Opzione 1</option>
                            <option>Opzione 2</option>
                        </select>
                    )}
                    {item.tipo === "checkbox" && <input type="checkbox" />}
                    {item.tipo === "date" && <input type="date" />}
                </div>
            ))}
        </div>
    );
};

export default Form;

import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import GeneratedForm from '../GeneratedForm';
import CustomButton from '../../Button';
import CreaForm from '../CreaForm';
interface FormData {
  id: number;
  nome: string;
  tipo: string;
}


export const AccordionMenuComponents: React.FC = () => {
  const [formData, setFormData] = useState<FormData[]>([]);

  return (

    <div className='accordion-components'>
      <Accordion>
        <AccordionSummary
          aria-controls="panel1-content"
          id="panel1-header"
        >
          Button
        </AccordionSummary>
        <AccordionDetails>
          <CustomButton>Custom Button</CustomButton>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          aria-controls="panel1-content"
          id="panel1-header"
        >
          Form AutoGenerato
        </AccordionSummary>
        <AccordionDetails>
          <GeneratedForm />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          aria-controls="panel1-content"
          id="panel1-header"
        >
          Generatore di Form
        </AccordionSummary>
        <AccordionDetails>
          <CreaForm setFormData={setFormData} formData={formData} />
        </AccordionDetails>
      </Accordion>
    </div>

  );
};
export default AccordionMenuComponents;

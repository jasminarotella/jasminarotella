import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import GeneratedForm from '../GeneratedForm';
import CustomButton from '../Button';
import BoxJas from '../BoxJas/BoxJas';
import CreaForm from '../CreaForm';
import EmptyPage from '../EmptyPage/EmptyPage';
import RatioMockupScriptPanel from '../PS_scripts.tsx/RatioMockup';
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
          Ratio Mockup Script
        </AccordionSummary>
        <AccordionDetails>
          <RatioMockupScriptPanel/>
        </AccordionDetails>
      </Accordion>
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
      <Accordion>
        <AccordionSummary
          aria-controls="panel1-content"
          id="panel1-header"
        >
          BoxJas
        </AccordionSummary>
        <AccordionDetails>
          <BoxJas title={'1 - Box Jas'} description={'Description : accetta stringhe'} />
          <BoxJas title={'2'} description={<BoxJas title={'Box Jas'} description={'o accetta JSX element'} />} />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          aria-controls="panel1-content"
          id="panel1-header"
        >
          Empty Page
        </AccordionSummary>
        <AccordionDetails>
        <EmptyPage
            titleheader={<h2>To Do List</h2>}
            descriptionheader={<div>inserisci componente to do list</div>}
            
            titlenav={<h2>Attività</h2>}
            descriptionnav={<div>inserisci componente attività</div>}
            
            titlemain={<h2>Statistiche</h2>}
            descriptionmain={<div>inserisci componente statistiche</div>}
            
            titlefooter={<h2>Pagine</h2>}
            descriptionfooter={<div>inserisci componente navAttività</div>}
        />
        </AccordionDetails>
      </Accordion>
    </div>

  );
};
export default AccordionMenuComponents;

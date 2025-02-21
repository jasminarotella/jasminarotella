import React from 'react';
import { Link } from 'react-router-dom';


export const  MenuSimulazioni: React.FC = () => {
      return (
  
   <div>
     <Link to="/offertedilavoro">
        <button className="button-jas">Offerte di Lavoro</button>
        </Link>
        <Link to="/#">
        <button className="button-jas">Esami e Studenti</button>
        </Link>
    </div>
  
  );
};
export default MenuSimulazioni;

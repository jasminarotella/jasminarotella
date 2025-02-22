import React from 'react';
import { Link } from 'react-router-dom';
import CustomButton from '../../Button';


export const MenuSimulazioni: React.FC = () => {
  return (

    <div>
      <Link to="/offertedilavoro">
        <CustomButton className="button-jas">Offerte di Lavoro</CustomButton>
      </Link>
      <Link to="/#">
        <CustomButton className="button-jas">Esami e Studenti</CustomButton>
      </Link>
    </div>

  );
};
export default MenuSimulazioni;

// @ts-ignore

import CustomButton from "./Home/components/Button";
import { Link } from "react-router-dom";

export interface NavProps {
  className?: string;
}

const Nav: React.FC<NavProps> = ({ className }) => {
  return (
    <nav className={`nav-jas ${className}`}>
      
        <Link to="/">
        <CustomButton className="button-jas">Home</CustomButton>
        </Link>
        <Link to="/simulazioni">
        <CustomButton className="button-jas">Simulazioni</CustomButton>
        </Link>
        <Link to="/libreriacomponenti">
        <CustomButton className="button-jas">Libreria Componenti</CustomButton>
        </Link>
        
      
    </nav>
  );
};

export default Nav;

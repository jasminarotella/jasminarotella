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
        <button className="button-jas">Home</button>
        </Link>
        <Link to="/simulazioni">
        <button className="button-jas">Simulazioni</button>
        </Link>
      
    </nav>
  );
};

export default Nav;

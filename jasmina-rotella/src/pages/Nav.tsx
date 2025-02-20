import CustomButton from "./Button";
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
        <Link to="/creaform">
        <button className="button-jas">Crea Form</button>
        </Link>
      
    </nav>
  );
};

export default Nav;

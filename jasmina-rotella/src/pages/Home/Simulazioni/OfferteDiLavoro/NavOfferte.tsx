import { Link } from "react-router-dom";
import CustomButton from "../../../Button";
import "./OfferteList.css";


const NavOfferte: React.FC = () => {
    return (
        <div className="instestazione">
        <Link to="/offertedilavoro">
        <h2>Offerte di Lavoro</h2>
        </Link>
        <div className="button-container-offerte">
        <Link to="/aggiungiofferta">
            <CustomButton className="button-add">+</CustomButton>aggiungi offerta
        </Link>
        <Link to="/modificaofferta">
            <CustomButton className="button-add">M</CustomButton>modifica offerta
        </Link>
        <Link to="/aggiungiofferta">
            <CustomButton className="button-add">-</CustomButton>rimuovi offerta
        </Link>
        </div>
    </div>
    );
}
export default NavOfferte;
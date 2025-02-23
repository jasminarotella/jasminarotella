import { Link } from "react-router-dom";
import CustomButton from "../../components/Button";
import "./OfferteList.css";
import BoxJas from "../../components/BoxJas/BoxJas";


const NavOfferte: React.FC = () => {
    return (
        <BoxJas 
        
        title={
            <Link to="/offertedilavoro" className="title1">
                Offerte di Lavoro
            </Link>
            } 
        description={ 
        <div className="instestazione">
            <div className="button-container-offerte">
                <Link to="/aggiungiofferta">
                    <CustomButton className="button-add">+
                    </CustomButton>aggiungi offerta
                </Link>
                <Link to="/modificaofferta">
                    <CustomButton className="button-add">M
                    </CustomButton>modifica offerta
                </Link>
                <Link to="/rimuoviofferta">
                    <CustomButton className="button-add">-
                    </CustomButton>rimuovi offerta
                </Link>
            </div>
        </div>
        } />
           
    );
}
export default NavOfferte;
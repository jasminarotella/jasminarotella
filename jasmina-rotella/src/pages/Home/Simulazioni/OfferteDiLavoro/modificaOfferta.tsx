import BoxJas from "../../components/BoxJas/BoxJas";
import NavOfferte from "./NavOfferte";

const ModificaOfferta: React.FC = () => {
    return (
        <>
            <NavOfferte />
            <BoxJas title="Modifica Offerta"
                description={
                    "Scegli l'offerta da modificare:"
                }
                classStyle="title2" />
        </>
    )
};
export default ModificaOfferta;
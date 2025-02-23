import BoxJas from "../BoxJas/BoxJas"


const EmptyPage: React.FC = () => {
    return (
        <div style={{
            backgroundColor: "var(--color3)",
            padding: "10px"
        }}>
            <BoxJas title={
                <BoxJas title={"Inserisci Titolo o componente"} description={"Inserisci descrizione o componente - NAV"} />}
                description={
                    <>
                        <BoxJas title={"Inserisci titolo o componente"} description={"Inserisci descrizione o componente -TITLE"} />
                        <BoxJas title={"Inserisci titolo o componente"} description={"Inserisci descrizione o componente -MAIN"} />
                    </>
                } />
        </div>
    )
};
export default EmptyPage;
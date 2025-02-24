import EmptyPage from "../Home/components/EmptyPage/EmptyPage";

const JasHome : React.FC = () => {
    return (
        <div>
           <EmptyPage 
           titlepage= {
            <h1>Home Jasmina</h1>}
            titleheader={'Titolo Header'}
            descriptionheader={'Descrizione Header'}
            titlenav={'Titolo Nav'}
            descriptionnav={'Inserisci Nav'}
            titlemain={'Inserisci main'}
            descriptionmain={'inserisci contenuto main'}
            >
           </EmptyPage>
        </div>
    )
};
export default JasHome;
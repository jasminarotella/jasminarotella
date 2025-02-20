import './Style.css'

export interface HomeProps {
    children: React.ReactNode
}


const Home : React.FC <HomeProps> = () => {
    return (
       <div className="home">
            <h1>Ciao</h1>
            <div>Ciao</div>
       </div>
    )
};
export default Home;
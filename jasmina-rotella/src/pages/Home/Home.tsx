import { Link } from 'react-router-dom';
import CustomButton from '../Button';
import './Style.css'

export interface HomeProps {
    children?: React.ReactNode,
    className?: string
}


const Home : React.FC <HomeProps> = ({className}) => {
    return (
       <div className={className}>
        <Link to="/offertedilavoro">
        <CustomButton className="button-jas">Offerte di Lavoro</CustomButton>
        </Link>
      
       </div>
    )
};
export default Home;
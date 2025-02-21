// @ts-ignore

import { Link } from 'react-router-dom';
import './Style.css'
import AccordionMenu from './AccordionComponents';

export interface HomeProps {
    children?: React.ReactNode,
    className?: string
}


const Home : React.FC <HomeProps> = ({className}) => {
    return (
       <div className={className}>
        <AccordionMenu/>
       </div>
    )
};
export default Home;
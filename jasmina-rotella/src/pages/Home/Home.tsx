// @ts-ignore

import { Link } from 'react-router-dom';
import './Style.css'
import AccordionMenuComponents from './AccordionMenus/AccordionComponents';

export interface HomeProps {
    children?: React.ReactNode,
    className?: string
}


const Home: React.FC<HomeProps> = ({ className }) => {
    return (
        <div className={className}>
            <AccordionMenuComponents />
        </div>
    )
};
export default Home;
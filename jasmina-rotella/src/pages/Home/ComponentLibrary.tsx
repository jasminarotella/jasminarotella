// @ts-ignore

import { Link } from 'react-router-dom';
import './Style.css'
import AccordionMenuComponents from './components/AccordionMenus/AccordionComponents';

export interface ComponentLibraryProps {
    children?: React.ReactNode,
    className?: string
}


const ComponentLibrary: React.FC<ComponentLibraryProps> = ({ className }) => {
    return (
        <div className={className}>
            <AccordionMenuComponents />
        </div>
    )
};
export default ComponentLibrary;
// @ts-ignore

import { Link } from 'react-router-dom';
import CustomButton from './Home/components/Button';



const MainHome: React.FC = () => {
    return (
        <div className="home">
            <Link to="/personalpage">
        <CustomButton className="button-jas">Personal Page</CustomButton>
        </Link>
        </div>
    )
};
export default MainHome;
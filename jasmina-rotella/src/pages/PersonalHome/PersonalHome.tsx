// @ts-ignore

import { Link } from 'react-router-dom';
import BoxJas from '../Home/components/BoxJas/BoxJas';
import CustomButton from '../Home/components/Button';



const PersonalHome: React.FC = () => {
    return (
        <div className="home">
            <BoxJas
                title={"Bentornata Jas"}
                description={
                    <div className='login'>
                        <CustomButton>Accedi</CustomButton>
                    </div>
                }
            />
        </div>
    )
};
export default PersonalHome;
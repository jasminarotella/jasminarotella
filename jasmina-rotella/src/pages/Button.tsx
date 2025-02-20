import Button, {ButtonProps} from '@mui/material/Button';
import './Home/Style.css'

export interface CustomButtonProps extends ButtonProps{
    className: string,
    children: React.ReactNode,
}

const CustomButton: React.FC <CustomButtonProps> = ({className = "button-jas", children}) => {
    return (
             <>
            <Button className={className}> {children} </Button>
            </>
    )
};
export default CustomButton;
import './Home/Style.css'; // Import del CSS

export interface ButtonProps  {
    className?: string; 
    children: React.ReactNode;
    //una prop è cosa succede quando clicco sul pulsante?
    onClick?: (event: React.MouseEvent) => void;
    onSubmit?: (event: React.MouseEvent) => void;
}

const CustomButton: React.FC<ButtonProps> = ({ className ='button-jas', children, onClick}) => {
    return (
       
        <button className={className} onClick={onClick}>{children}</button>
    )
};

export default CustomButton;

import './Home/Style.css'; // Import del CSS

export interface ButtonProps  {
    className?: string; 
    children: React.ReactNode;
}

const CustomButton: React.FC<ButtonProps> = ({ children }) => {
    return (
       
        <button className='button-jas'>{children}</button>
    )
};

export default CustomButton;

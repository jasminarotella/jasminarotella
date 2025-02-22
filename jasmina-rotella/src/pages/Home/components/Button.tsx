import '../Style.css'; // Import del CSS

export interface ButtonProps  {
    className?: string; 
    children: React.ReactNode;
    //una prop è cosa succede quando clicco sul pulsante?
    onClick?: (event: React.MouseEvent) => void;
    type?: "submit" | "reset" | "button" | undefined;
    style?: React.CSSProperties;
    //...props: React.HTMLProps<HTMLButtonElement>;
}

const CustomButton: React.FC<ButtonProps> = ({ className ='button-jas', children, onClick, type='',...props}) => {
    return (
        <button className={className} onClick={onClick} type={"submit"} {...props}>{children}</button>
    )
};

export default CustomButton;

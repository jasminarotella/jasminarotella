import './Style.css'

export interface HomeProps {
    children?: React.ReactNode,
    className?: string
}


const Home : React.FC <HomeProps> = ({children, className}) => {
    return (
       <div className={className}>
        {children}
       </div>
    )
};
export default Home;
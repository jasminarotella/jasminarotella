import './BoxJas.css';

export interface BoxJasProps {
    title?: React.ReactNode;
    description?: React.ReactNode;
    classStyle?: string;
}


const BoxJas: React.FC <BoxJasProps> = ({title, description, classStyle}) => {
    return (
        <div className='box-jas'>
            <div className={classStyle}>{title}</div>
            <div className='description'>
                {description}
            </div>
        </div>
    );
};
export default BoxJas;
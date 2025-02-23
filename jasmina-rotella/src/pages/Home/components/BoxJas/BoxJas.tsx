import React, { JSX } from 'react';
import './BoxJas.css';

export interface BoxJasProps {
    title?: string | JSX.Element;
    description?: string | JSX.Element;
    classStyle?: string;
}


const BoxJas: React.FC <BoxJasProps> = ({title, description, classStyle}) => {
    return (
        <div className='box-jas'>
            <h1 className={classStyle}>{title}</h1>
            <div className='description'>
                {description}
            </div>
        </div>
    );
};
export default BoxJas;
import React, { JSX } from 'react';
import './BoxJas.css';

export interface BoxJasProps {
    title?: string | JSX.Element;
    description?: string | JSX.Element;
}


const BoxJas: React.FC <BoxJasProps> = ({title, description}) => {
    return (
        <div className='box-jas'>
            <h1 className='title'>{title}</h1>
            <p className='description'>
                {description}
            </p>
        </div>
    );
};
export default BoxJas;
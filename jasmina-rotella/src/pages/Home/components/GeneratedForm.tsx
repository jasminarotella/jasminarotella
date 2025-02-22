// @ts-ignore

import React from 'react';

export const formStyle: React.CSSProperties = {
  backgroundColor: 'var(--color2)',
  borderRadius: 'var(--border-radius)',
  padding: '10px',
  maxWidth: '300px',
};

const labelStyle: React.CSSProperties = {
  marginRight: 'var(--margin-label)',

};
const inputStyle: React.CSSProperties = {
  marginRight: 'var(--margin-label)',
  borderRadius: 'var(--border-radius'
};
// const selectStyle: React.CSSProperties = {
//   padding: '5px',
//   borderRadius: 'var(--border-radius-background)',
//   margin: 'var(--margin-input)',
// };
const GeneratedForm: React.FC = () => {

  return (
    <form style={formStyle} className='form-style'>
      <div key="1">
        <label style={labelStyle}>asaddadfsf</label>
        <input type="text" style={inputStyle} />
      </div>
      <button type='submit'>aggiungi</button>
    </form>
  );
};

export default GeneratedForm;

import React from 'react';
import CustomButton from '../Button';

const GeneratedForm: React.FC = () => {
  const formStyle: React.CSSProperties = {
    backgroundColor: 'var(--color2)',
    borderRadius: 'var(--border-radius)',
    padding: '10px',
  };

  const labelStyle: React.CSSProperties = {
    marginRight: 'var(--margin-label)',
  };

  const selectStyle: React.CSSProperties = {
    padding: '5px',
    borderRadius: 'var(--border-radius-background)',
    margin: 'var(--margin-input)',
  };

  return (
    <form style={formStyle} className='form-style'>
      <div key="1">
  <label style={labelStyle}>ciao</label>
  <select style={selectStyle}>
    <option>Opzione 1</option>
    <option>Opzione 2</option>
  </select>
</div>
<div key="2">
  <label style={labelStyle}>come stai</label>
  <select style={selectStyle}>
    <option>Opzione 1</option>
    <option>Opzione 2</option>
  </select>
</div>
<div key="3">
  <label style={labelStyle}>come va</label>
  <select style={selectStyle}>
    <option>Opzione 1</option>
    <option>Opzione 2</option>
  </select>
</div>
<div key="4">
  <label style={labelStyle}>ehi ciao</label>
  <input type="text" />
</div>
<div key="5">
  <label style={labelStyle}>co</label>
  <input type="checkbox" />
</div>
<div key="6">
  <label style={labelStyle}>no</label>
  <input type="date" />
  <CustomButton type='submit'>aggiungi</CustomButton>
</div>
    </form>
  );
};

export default GeneratedForm;

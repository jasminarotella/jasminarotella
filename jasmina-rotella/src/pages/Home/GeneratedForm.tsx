import React from 'react';

const GeneratedForm: React.FC = () => {
  const formStyle: React.CSSProperties = {
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
  const selectStyle: React.CSSProperties = {
    padding: '5px',
    borderRadius: 'var(--border-radius-background)',
    margin: 'var(--margin-input)',
  };

  return (
    <form style={formStyle} className='form-style'>
      <div key="1">
  <label style={labelStyle}>a</label>
  <input type="text"  style={inputStyle}/>
</div>
<div key="2">
  <label style={labelStyle}>b</label>
  <select style={selectStyle}>
    <option>Opzione 1</option>
    <option>Opzione 2</option>
  </select>
</div>
<div key="3">
  <label style={labelStyle}>c</label>
  <input type="checkbox" />
</div>
<div key="4">
  <label style={labelStyle}>d</label>
  <input type="date" />
  </div>
    <button type='submit'>aggiungi</button>
    </form>
  );
};

export default GeneratedForm;

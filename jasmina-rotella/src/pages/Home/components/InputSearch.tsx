import CustomButton from "./Button";

const InputSearch = () => {
    const searchJas = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'var(--color5)',
        borderRadius: 'var(--border-radius)',
        width: '100%',
        color: 'white',
        fontSize: '1rem',
    };
    const styleInput = {
        margin: 'var(--margin-input)',
        marginLeft: 'var(--margin-label)',
        padding: '0.2em',
        borderRadius: 'var(--border-radius)',
    };
    
    return (
        <div style={searchJas}>
            <label style={searchJas}> Cerca Offerta:
                <input type="search" placeholder="Cerca..."
                    style={styleInput}
                />
            </label>
            <CustomButton  className="button-search">
                <i className="fas fa-search"></i>
            </CustomButton>
        </div >);
};
export default InputSearch;
import React, { useState } from 'react';
import BoxJas from './BoxJas/BoxJas';
import CustomButton from './Button';
import { userSchema } from '../../../types/user';
import { useNavigate } from 'react-router-dom';

const LoginForm: React.FC = () => {
    const formStyle: React.CSSProperties = {
        backgroundColor: 'var(--color4)',
        color: 'var(--color1)',
        borderRadius: 'var(--border-radius)',
        padding: '2em',
        maxWidth: '300px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px'
    };

    const labelStyle: React.CSSProperties = {
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '5px'
    };

    const inputStyle: React.CSSProperties = {
        borderRadius: 'var(--border-radius)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    };

    const navigate = useNavigate();

    // Credenziali "corrette" hard-coded
    const [user] = useState<userSchema>({
        nomeutente: 'jasminarotella',
        password: 'ciao1234'
    });

    const [inputAccount, setInputAccount] = useState<userSchema>({
        nomeutente: '',
        password: ''
    });

    const [credenzialiGiuste, setCredenzialiGiuste] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setInputAccount((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (
            inputAccount.nomeutente === user.nomeutente &&
            inputAccount.password === user.password
        ) {
            console.log("Credenziali giuste");
            setCredenzialiGiuste(true);
            // Ad esempio, per reindirizzare dopo il login:
            // navigate('/dashboard');
        } else {
            console.log("Credenziali errate");
        }
    };

    return (
        <BoxJas title={
            <>
                <h3 className='title1'>Accedi</h3>
                <form style={formStyle} className='form-style' onSubmit={handleSubmit}>
                    <div key="1">
                        <label style={labelStyle} htmlFor='nomeutente'>
                            Nome Utente
                        </label>
                        <input
                            type="text"
                            style={inputStyle}
                            id='nomeutente'
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div key="2">
                        <label style={labelStyle} htmlFor='password'>
                            Password
                        </label>
                        <input
                            type="password"
                            style={inputStyle}
                            id='password'
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <CustomButton type='submit'>Login</CustomButton>
                </form>
            </>
        } />
    );
};

export default LoginForm;

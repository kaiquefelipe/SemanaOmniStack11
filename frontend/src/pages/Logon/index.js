import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi'
import './styles.css'
import logo from '../../assets/logo.svg'
import heroes from '../../assets/heroes.png'
import api from '../../services/api';

export default function Logon (){
    const [id, setId] = useState('');
    const history = useHistory()

    async function HandleLogin(e){
        e.preventDefault();

        try {
            const response = await api.post('sessions', { id })

            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);
            
            history.push('/profile');
        } catch (error) {
            alert('Erro no login')
        }

    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logo} alt="Be The Hero"/>

                <form onSubmit={HandleLogin}>
                    <h1>Faça seu Logon</h1>
                    <input placeholder="Seu ID" value={id} onChange={ e => setId(e.target.value)}/>
                    <button className="button" type="submit">Entrar</button>
                    <Link to="/register" className="back-link">
                        <FiLogIn size={16} color="#E02041"/>
                        Não tenho cadastro
                    </Link>
                </form>

            </section>

            <img src={heroes} alt="Heroes"/>
        </div>
    );
}
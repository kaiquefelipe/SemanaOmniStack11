import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi'
import logo from '../../assets/logo.svg'
import api from '../../services/api';

import './styles.css'

export default function Profile(){
    const [data, setData] = useState([]);
    
    const history = useHistory();

    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId
            }
        }).then( response => {
            setData(response.data);
        })
    }, [ongId]);

    async function HandleDeleteItem(key){
        try {
            await api.delete(`incidents/${key}`, {
                    headers: {
                        Authorization: ongId
                    }
            })

            setData(data.filter(item => item.id !== key))
        } catch (error) {
            alert('Erro ao deletar o caso.')
        }
    }

    function HandleLogout(){
        localStorage.clear();

        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logo} alt="Be The Hero"/>
                <span>Bem vindo, {ongName}</span>

                <Link to="/incidents/new" className="button">Cadastrar novo caso</Link>
                <button type="button" onClick={() => HandleLogout()}>
                    <FiPower size={18} color="#E02041"/>
                </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
                {
                    data.map( item => (
                        <li key={item.id}>
                            <strong>CASO:</strong>
                            <p>{item.title}</p>
        
                            <strong>DESCRIÇÃO:</strong>
                            <p>{item.description}</p>
        
                            <strong>VALOR:</strong>
                            <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL' }).format(item.value)}</p>
        
                            <button type="button" onClick={()=> HandleDeleteItem(item.id)}>
                                <FiTrash2 size={20} color="#a8a8b3"/>
                            </button>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}
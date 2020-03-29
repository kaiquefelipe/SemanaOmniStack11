import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'
import logo from '../../assets/logo.svg'
import api from '../../services/api';

import './styles.css'

export default function NewIncident(){
    const history = useHistory();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const ongId = localStorage.getItem('ongId');

    async function HandleSubmit(e){
        e.preventDefault();

        try {
            const data = { title, description, value };
            await api.post('incidents', data, {
                headers: {
                    Authorization: ongId
                }
            })

            history.push('/profile');
        } catch (error) {
            alert('Erro ao cadastrar um novo caso.')
        }
    }

    return (
        <div className="new-incidents-container">
            <div className="content">
                <section>
                    <img src={logo} alt="Be The Hero"/>
                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encotrar um herói para salvar isso.</p>

                    <Link to="/profile" className="back-link">
                        <FiArrowLeft size={16} color="#E02041"/>
                        Voltar para home
                    </Link>
                </section>

                <form onSubmit={HandleSubmit}>
                    <input placeholder="Título do caso" value={title} onChange={ e => setTitle(e.target.value)}/>
                    <textarea placeholder="Descrição" value={description} onChange={ e => setDescription(e.target.value)}/>
                    <input placeholder="Valor em reais" value={value} onChange={ e => setValue(e.target.value)}/>

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}
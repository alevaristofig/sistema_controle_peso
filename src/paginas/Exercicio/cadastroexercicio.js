import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { LiaRunningSolid  } from 'react-icons/lia';

import { useDispatch } from 'react-redux';
import { salvar } from "../../redux/exercicio/slice";

import Header from "../../compomentes/Headers";
import Titulo from "../../compomentes/Titulo";
import 'bootstrap/dist/css/bootstrap.css';

export default function CadastroExercicio() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [nome,setNome] = useState('');
    const [frequencia,setFrequencia] = useState('');
    const [tempo,setTempo] = useState('');

    useEffect(() => {
        if(sessionStorage.getItem('token') == null) {           
            navigate('/login');
        }
    })

    function salvarDados(e) {
        e.preventDefault();

        let dataAtual = new Date();
       
        dispatch(salvar({
            'nome': nome,
            'frequencia': frequencia,
            'tempo': tempo,
            'dataCadastro': dataAtual.toISOString(),
            'dataAtualizar': null
        }));

        setNome('');
        setFrequencia('');
        setTempo('');
    }

    return(
        <div>
            <Header />
            <div className="content">
                <div>
                    <ToastContainer />
                </div>

                <Titulo nome="Cadastro de Exercícios">
                    <LiaRunningSolid color="#000" size={24} />
                </Titulo>

                <div className="container py-4">
                    <form className="form-perfil" onSubmit={salvarDados}>
                        <div className="row mt-3">
                            <div className="col">
                                <label className="form-label">Nome</label>
                                <label className="form-label obrigatorio">*</label>
                                <input 
                                    type='text'
                                    className="form-control" 
                                    value={nome}                                 
                                    onChange={(e) => setNome(e.target.value)} 
                                    required 
                                />                                
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="col">
                                <label className="form-label">Frequência(em dias)</label>
                                <label className="form-label obrigatorio">*</label>
                                <input 
                                    type='text'
                                    className="form-control"   
                                    value={frequencia}                               
                                    onChange={(e) => setFrequencia(e.target.value)} 
                                    required 
                                />                                
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="col">
                                <label className="form-label">Tempo(em minutos)</label>
                                <label className="form-label obrigatorio">*</label>
                                <input 
                                    type='text'
                                    className="form-control"   
                                    value={tempo}                               
                                    onChange={(e) => setTempo(e.target.value)} 
                                    required 
                                />                                
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="col">
                                <button type="submit" className="btn btn-primary">Cadastrar</button>
                            </div>
                        </div> 
                    </form>
                </div>
            </div>
        </div>
    )
}
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { LiaRunningSolid  } from 'react-icons/lia';

import axios from 'axios';
import { useDispatch } from 'react-redux';
import { atualizar } from "../../redux/exercicio/slice";

import Header from "../../compomentes/Headers";
import Titulo from "../../compomentes/Titulo";
import 'bootstrap/dist/css/bootstrap.css';

export default function EditarExercicio() {

    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [nome,setNome] = useState('');
    const [frequencia,setFrequencia] = useState('');
    const [tempo,setTempo] = useState('');
    const [dataCadastro, setDataCadastro] = useState('');

    useEffect(() => {
        async function buscar() {
            await axios.get(`http://localhost:8080/exercicio/${id}`)
                               .then((response) => {                                
                                    setNome(response.data.nome);
                                    setFrequencia(response.data.frequencia);
                                    setTempo(response.data.tempo);
                                    setDataCadastro(response.data.dataCadastro);
                               })
                               .catch((error) => {
                                    toast.success("Ocorreu um erro ao buscar o Exercício!");
                               });
        }

        buscar();
    },[])

    function salvarDados(e) {
        e.preventDefault();
        
        dispatch(atualizar({
            'id': id,
            'nome': nome,
            'frequencia': frequencia,
            'tempo': tempo,
            'dataCadastro': dataCadastro
        }));

        navigate('/exercicio', {replace: true});
    }

    return(
        <div>
            <Header />
            <div className="content">
                <Titulo nome="Editar Exercício">
                    <LiaRunningSolid color="#000" size={24} />
                </Titulo>

                <div>
                    <ToastContainer />
                </div>

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
                                <button type="submit" className="btn btn-primary">Atualizar</button>
                            </div>
                        </div> 
                    </form>
                </div>
            </div>
        </div>
    )
}
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { LiaRunningSolid  } from 'react-icons/lia';
import { useDispatch } from 'react-redux';
import { atualizar } from "../../redux/exercicio/slice";

import useExercicio from '../../hooks/exercicioHook';

import Header from "../../compomentes/Headers";
import Titulo from "../../compomentes/Titulo";
import 'bootstrap/dist/css/bootstrap.css';

export default function EditarExercicio() {

    const { id } = useParams();
    const {buscar} = useExercicio();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [nome,setNome] = useState('');
    const [frequencia,setFrequencia] = useState('');
    const [tempo,setTempo] = useState('');
    const [dataCadastro, setDataCadastro] = useState('');
    const [buscarError,setBuscarErro] = useState(false);

    useEffect(() => {

        if(sessionStorage.getItem('token') == null) {           
            navigate('/login');
        }

        async function buscarDados() {
            let result = await buscar(id);

            if(typeof result === 'string') {
                toast.error(result); 
                setBuscarErro(true);
            } else {
                setNome(result.nome);
                setFrequencia(result.frequencia);
                setTempo(result.tempo); 
                setDataCadastro(result.dataCadastro)               
            }
        }

        buscarDados();
    },[])

    function salvarDados(e) {
        e.preventDefault();

        let dataAtual = new Date();
        
        dispatch(atualizar({
            'id': id,
            'nome': nome,
            'frequencia': frequencia,
            'tempo': tempo,
            'dataCadastro': dataCadastro,
            'dataAtualizar': dataAtual.toISOString()
        }));

        navigate('/exercicio/0', {replace: true});
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

                {
                    buscarError
                    ?
                        <div className="container py-4">
                            <div className="col">
                                <Link to="/exercicio" className="btn btn-info float-start me-4">Voltar</Link>   
                            </div>                                                                     
                        </div>
                    :
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
                }

            </div>
        </div>
    )
}
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { atualizar } from '../../redux/alimento/slice';
import useAlimento from '../../hooks/alimentoHook';

import { FaBowlFood } from 'react-icons/fa6';
import { ToastContainer, toast } from 'react-toastify';

import Header from "../../compomentes/Headers";
import Titulo from "../../compomentes/Titulo";
import 'bootstrap/dist/css/bootstrap.css';

export default function EditarAlimento() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const {buscar, formatarCaloria} = useAlimento();
    const navigate = useNavigate();

    const [nome,setNome] = useState('');
    const [quantidade,setQuantidade] = useState('');
    const [caloria,setCaloria] = useState('');
    const [dataCadastro,setDataCadastro] = useState('');
    const [buscarError,setBuscarErro] = useState(false);    

    useEffect(() => {

        async function buscarAlimento() {
            let result = await buscar(id);

            if(typeof result === 'string') {
                toast.error(result); 
                setBuscarErro(true);
            } else {
                setNome(result.nome);
                setQuantidade(result.quantidade);
                setCaloria(result.calorias);
                setDataCadastro(result.dataCadastro);
            }
        }

        buscarAlimento();

    },[]);

    function mascaraCaloria(inputCaloria) {
        setCaloria(formatarCaloria(inputCaloria));        
     }


    function salvarDados(e) {
        e.preventDefault();

        dispatch(atualizar({
            'id': id,
            'nome': nome,
            'quantidade': quantidade,
            'calorias': caloria,
            'dataCadastro': dataCadastro
        }));

        navigate('/alimento/0', {replace: true});        
    }

    return (
        <div>
             <Header />
             <div className="content">
                <div>
                    <ToastContainer />
                </div>

                <Titulo nome="Editar Alimento">
                    <FaBowlFood color="#000" size={24} />
                </Titulo>

                {
                    buscarError
                    ?
                        <div className="container py-4">
                            <div className="col">
                                <Link to="/alimento" className="btn btn-info float-start me-4">Voltar</Link>   
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
                                    defaultValue={nome}                                 
                                    onChange={(e) => setNome(e.target.value)} 
                                    required 
                                />                                
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="col">
                                <label className="form-label">Quantidade</label>
                                <label className="form-label obrigatorio">*</label>
                                <input 
                                    type='text'
                                    className="form-control" 
                                    defaultValue={quantidade}                               
                                    onChange={(e) => setQuantidade(e.target.value)} 
                                    required 
                                />                                
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="col">
                                <label className="form-label">Calorias</label>
                                <label className="form-label obrigatorio">*</label> 
                                <input 
                                    type='text' 
                                    id='inputCaloria'
                                    className="form-control"
                                    value={caloria}                                             
                                    onChange={(e) => mascaraCaloria(e.target.value)}                                         
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
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { atualizar } from '../../redux/alimento/slice';
import useAlimento from '../../hooks/alimentoHook';

import { FaBowlFood } from 'react-icons/fa6';
import { ToastContainer } from 'react-toastify';

import Header from "../../compomentes/Headers";
import Titulo from "../../compomentes/Titulo";
import 'bootstrap/dist/css/bootstrap.css';

export default function EditarAlimento() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const navigate = useNavigate();

    const [nome,setNome] = useState('');
    const [quantidade,setQuantidade] = useState('');
    const [caloria,setCaloria] = useState('');
    const [buscar, formatarCaloria] = useAlimento();

    useEffect(() => {

        async function buscarAlimento() {
            let result = await buscar(id);

            setNome(result.nome);
            setQuantidade(result.quantidade);
            setCaloria(result.calorias);

            console.log(result);
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
            'caloria': caloria
        }));

        navigate('/alimento', {replace: true});        
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
                              
             </div>
        </div>
    )
}
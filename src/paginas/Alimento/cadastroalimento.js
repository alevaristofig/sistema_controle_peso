import { useState } from 'react';
import { useDispatch } from 'react-redux';
import CurrencyInput from 'react-currency-masked-input';

import { salvar } from '../../redux/alimento/slice';

import { FaBowlFood } from 'react-icons/fa6';
import { ToastContainer } from 'react-toastify';

import Header from "../../compomentes/Headers";
import Titulo from "../../compomentes/Titulo";
import 'bootstrap/dist/css/bootstrap.css';

export default function CadastroAlimento() {

    const dispatch = useDispatch();

    const [nome,setNome] = useState('');
    const [quantidade,setQuantidade] = useState('');
    const [caloria,setCaloria] = useState('');

    function salvarDados(e) {
        e.preventDefault();
        
        dispatch(salvar({
            'nome': nome,
            'quantidade': quantidade,
            'caloria': caloria
        }))
    }

    return (
        <div>
             <Header />
             <div className="content">
                <div>
                    <ToastContainer />
                </div>

                <Titulo nome="Cadastro Alimento">
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
                                    value={nome}                                 
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
                                    value={quantidade}                                 
                                    onChange={(e) => setQuantidade(e.target.value)} 
                                    required 
                                />                                
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="col">
                                <label className="form-label">Calorias</label>
                                <label className="form-label obrigatorio">*</label>
                                <CurrencyInput 
                                    name="caloria" 
                                    className="form-control"                                    
                                    onChange={(e) => setCaloria(e.target.value)} 
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
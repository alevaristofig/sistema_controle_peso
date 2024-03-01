import { useState } from "react";
import { useDispatch } from 'react-redux';
import { salvar } from '../../redux/pessoa/slice';

import { toast, ToastContainer } from 'react-toastify';
import { VscPerson } from "react-icons/vsc";

import Header from "../../compomentes/Headers"
import Titulo from "../../compomentes/Titulo"

import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.css';
import './pessoa.css';

export default function CadastroPessoa() {
    const dispatch = useDispatch();

    const [nome,setNome] = useState('');
    const [email,setEmail] = useState('');
    const [altura,setAltura] = useState('');
    const [endereco,setEndereco] = useState('');

    function salvarDados(e) {
        e.preventDefault();    
        
        if(validar()) {

            dispatch(salvar({
                'nome': nome,
                'email': email,
                'altura': altura,
                'endereco': endereco
            }));

            setNome('');
            setEmail('');
            setAltura('');
            setEndereco('');
        }
    }

    function validar() {
        if(nome === '' && email === '' && altura === '' &&  endereco === '') {
            toast.error("Os campos não podem ficar em branco!");
            return false;
        }

        return true;
    }


    return(
        <div>
            <Header />
            <div className="content">
                <div>
                    <ToastContainer />
                </div> 
                <Titulo nome="Cadastro de Pessoa">
                    <VscPerson color="#000" size={24} />
                </Titulo>

                <div className="container py-4">
                    <form className="form-perfil" onSubmit={salvarDados}>
                        <div className="row mt-3">
                            <div className="col">
                                <label className="form-label">Nome</label>
                                <label className="form-label obrigatorio">*</label>
                                <input 
                                    type="text" 
                                    className="form-control"
                                    value={nome}
                                    onChange={(e) => setNome(e.target.value)} 
                                /> 
                            </div>
                        </div>
                        
                        <div className="row mt-3">
                            <div className="col">
                                <label className="form-label">E-mail</label>
                                <label className="form-label obrigatorio">*</label>
                                <input 
                                    type="text" 
                                    className="form-control"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)} 
                                /> 
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="col">
                                <label className="form-label">Altura</label>
                                <label className="form-label obrigatorio">*</label>
                                <input 
                                    type="text" 
                                    className="form-control"
                                    value={altura}
                                    onChange={(e) => setAltura(e.target.value)} 
                                />  
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="col">
                                <label className="form-label">Endereço</label>
                                <label className="form-label obrigatorio">*</label>
                                <input 
                                    type="text" 
                                    className="form-control"
                                    value={endereco}
                                    onChange={(e) => setEndereco(e.target.value)} 
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
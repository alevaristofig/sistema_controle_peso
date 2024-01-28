import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { buscar } from '../../redux/pessoa/slice';
import { VscPerson } from "react-icons/vsc";
import { toast, ToastContainer } from 'react-toastify';

import Header from "../../compomentes/Headers";
import Titulo from "../../compomentes/Titulo";
import usePessoa from "../../hooks/pessoaHook";

import 'bootstrap/dist/css/bootstrap.css';

export default function PessoaDados() {
    const dispatch = useDispatch();
    const {pessoas,loading} = useSelector((rootReducer) => rootReducer.pessoa);
    const { id } = useParams();

    const [nome,setNome] = useState('');
    const [email,setEmail] = useState('');
    const [altura,setAltura] = useState('');
    const [endereco,setEndereco] = useState('');

    const [validar] = usePessoa();

    useEffect(() => {
        dispatch(buscar({
            'pessoa': id
        }))
    },[])

    function salvarDados(e) {
        e.preventDefault();

        let data = {
            'nome': nome,
            'email': email,
            'altura': altura,
            'endereco': endereco
        };

        if(validar(data)) {

        } else {
            toast.error("Os campos não podem ficar em branco!");
        }
    }

    return(
        <div>
            <Header />
            <div className="content">
                <div>
                    <ToastContainer />
                </div> 
                <Titulo nome="Pessoa">
                    <VscPerson color="#000" size={24} />
                </Titulo>

                <div className="container py-4">
                    <form className="form-perfil" onSubmit={salvarDados}>
                        <div className="row mt-3">
                            <div className="col">
                                <label className="form-label">Nome</label>
                                <lable className="form-label obrigatorio">*</lable>
                                <input 
                                    type="text" 
                                    className="form-control"                                    
                                    defaultValue={pessoas.nome}
                                    onChange={(e) => setNome(e.target.value)} 
                                /> 
                            </div>
                        </div>
                        
                        <div className="row mt-3">
                            <div className="col">
                                <label className="form-label">E-mail</label>
                                <lable className="form-label obrigatorio">*</lable>
                                <input 
                                    type="text" 
                                    className="form-control"
                                    defaultValue={pessoas.email}
                                    onChange={(e) => setEmail(e.target.value)} 
                                /> 
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="col">
                                <label className="form-label">Altura</label>
                                <lable className="form-label obrigatorio">*</lable>
                                <input 
                                    type="text" 
                                    className="form-control"
                                    defaultValue={pessoas.altura}
                                    onChange={(e) => setAltura(e.target.value)} 
                                />  
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="col">
                                <label className="form-label">Endereço</label>
                                <lable className="form-label obrigatorio">*</lable>
                                <input 
                                    type="text" 
                                    className="form-control"
                                    defaultValue={pessoas.endereco}
                                    onChange={(e) => setEndereco(e.target.value)} 
                                />   
                            </div>
                        </div>
                    
                        <div class="row mt-3">
                            <div class="col">
                                <button type="submit" class="btn btn-primary">Cadastrar</button>
                            </div>
                        </div>                      
                    </form>
                </div>
            </div>
    </div>
    )
}
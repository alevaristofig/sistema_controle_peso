import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { salvar } from '../../redux/pessoa/slice';

import { VscPerson } from "react-icons/vsc";

import Header from "../../compomentes/Headers"
import Titulo from "../../compomentes/Titulo"

import 'bootstrap/dist/css/bootstrap.css';
import './pessoa.css';

export default function Pessoa() {
    const { pessoas, loading } = useSelector((rootReducer) => rootReducer.pessoa);
    const dispatch = useDispatch();

    const [nome,setNome] = useState('');
    const [email,setEmail] = useState('');
    const [altura,setAltura] = useState('');
    const [endereco,setEndereco] = useState('');

    function salvarDados(e) {
      //  e.preventDefault();       
        dispatch(salvar({
            'nome': nome,
            'email': email,
            'altura': altura,
            'endereco': endereco
        }))
    }


    return(
        <div>
            <Header />
            <div className="content">
                <Titulo nome="Pessoa">
                    <VscPerson color="#000" size={24} />
                </Titulo>

                <div className="container py-4">
                    <form className="form-perfil" onSubmit={salvarDados}>
                        <div className="row mt-3">
                            <div className="col">
                                <label className="form-label">Nome</label>
                                <input 
                                    type="text" 
                                    className="form-control"
                                    onChange={(e) => setNome(e.target.value)} 
                                /> 
                            </div>
                        </div>
                        
                        <div className="row mt-3">
                            <div className="col">
                                <label className="form-label">E-mail</label>
                                <input 
                                    type="text" 
                                    className="form-control"
                                    onChange={(e) => setEmail(e.target.value)} 
                                /> 
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="col">
                                <label className="form-label">Altura</label>
                                <input 
                                    type="text" 
                                    className="form-control"
                                    onChange={(e) => setAltura(e.target.value)} 
                                />  
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="col">
                                <label className="form-label">Endereço</label>
                                <input 
                                    type="text" 
                                    className="form-control"
                                    onChange={(e) => setAltura(e.target.value)} 
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
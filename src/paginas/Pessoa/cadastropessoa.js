import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { toast, ToastContainer } from 'react-toastify';

import usePessoa from "../../hooks/pessoaHook";

import TituloLogin from '../../compomentes/Titulo/tituloLogin';

import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.css';
import './pessoa.css';

export default function CadastroPessoa() {

    const {salvar, formatarAltura, criptografarSenha} = usePessoa();
    const navigate = useNavigate();

    const [nome,setNome] = useState('');
    const [email,setEmail] = useState('');
    const [altura,setAltura] = useState('');
    const [endereco,setEndereco] = useState('');
    const [senha,setSenha] = useState('');

    async function salvarDados(e) {
        e.preventDefault();    
        
        let dataBanco = new Date();
        let dados = {
            'nome': nome,
            'email': email,
            'altura': altura,
            'endereco': endereco,
            'senha':  await criptografarSenha(senha),
            'dataCadastro': dataBanco.toISOString(),
            'dataAtualizacao': ''
        }

        const resp = await salvar(dados);

        if(resp) {
            toast.success("Pessoa cadastrada com Sucesso!");
            setTimeout(() => {
                navigate('/login');
            },7000)
        } else {
            toast.error('Ocorreu um erro ao cadastrar a Pessoa');
        }

        setNome('');
        setEmail('');
        setAltura('');
        setEndereco('');
        setSenha('');        
    }

    function mascaraAltura(altura) {
        setAltura(formatarAltura(altura));
    }

    return(                 
            <div>
                <div>
                    <ToastContainer />
                </div> 
                <TituloLogin nome="Cadastro de Pessoa"></TituloLogin>

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
                                    required
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
                                    required
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
                                    onChange={(e) => mascaraAltura(e.target.value)} 
                                    required
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
                                    required
                                />   
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="col">
                                <label className="form-label">Senha</label>
                                <label className="form-label obrigatorio">*</label>
                                <input 
                                    type="password" 
                                    className="form-control"
                                    value={senha}
                                    onChange={(e) => setSenha(e.target.value)} 
                                    required
                                />   
                            </div>
                        </div>
                       
                        <div className="row mt-3">
                            <div className="col-1">
                                <button type="submit" className="btn btn-primary">Cadastrar</button>
                            </div>
                            <div className="col">                                
                                <Link to="/login" className="btn btn-primary">Voltar</Link>
                            </div>
                        </div>                      
                    </form>
                </div>
            </div>
        
    )
}
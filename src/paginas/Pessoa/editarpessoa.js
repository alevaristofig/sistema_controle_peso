import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { atualizar } from '../../redux/pessoa/slice';
import { VscPerson } from "react-icons/vsc";
import { toast, ToastContainer } from 'react-toastify';

import Header from "../../compomentes/Headers";
import Titulo from '../../compomentes/Titulo';
import usePessoa from "../../hooks/pessoaHook";

import 'bootstrap/dist/css/bootstrap.css';

export default function EditarPessoa() {
    const dispatch = useDispatch();
    const {pessoas,loading} = useSelector((rootReducer) => rootReducer.pessoa);
    const { id } = useParams();
    const { buscar } = usePessoa();
    const navigate = useNavigate();

    const [nome,setNome] = useState('');
    const [email,setEmail] = useState('');
    const [altura,setAltura] = useState('');
    const [endereco,setEndereco] = useState('');
    const [senha,setSenha] = useState('');
    const [dataCadastro,setDataCadastro] = useState('');
    const [buscarError,setBuscarErro] = useState(false);

    useEffect(() => {
        
        async function buscarDados() {
            let dados = await buscar(id);

            if(typeof dados === 'string') {
                toast.error(dados);  
                setBuscarErro(true);       
            } else {
                setNome(dados.nome);
                setEmail(dados.email);
                setAltura(dados.altura.toFixed(2));
                setEndereco(dados.endereco);
                setSenha(dados.senha);
                setDataCadastro(dados.dataCadastro);
            }
        }

        buscarDados();
    },[])

    function salvarDados(e) {
        e.preventDefault();
            
        let dataAtualizacao = new Date();

        dispatch(atualizar({
            'pessoa': id,
            'nome': nome,
            'email': email,
            'altura': altura,
            'endereco': endereco,
            'senha': senha,
            'dataCadastro': dataCadastro,
            'dataAtualizacao': dataAtualizacao.toISOString()
        }));   
        
        setTimeout(() => {
            navigate('/pessoa', {replace: true})
        },7000)
        
    }

    return(
        <div>
            <Header />
            <div className="content">
                <div>
                    <ToastContainer />
                </div> 
                <Titulo nome="Editar Pessoa">
                    <VscPerson color="#fff" size={24} />
                </Titulo>

                {
                    buscarError
                    ?
                        <div className="container py-4">
                            <div className="col">
                                <Link to="/pessoa" className="btn btn-info float-start me-4">Voltar</Link>   
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
                                        type="text" 
                                        className="form-control"                                    
                                        defaultValue={nome}
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
                                        defaultValue={email}
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
                                        defaultValue={altura}
                                        onChange={(e) => setAltura(e.target.value)} 
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
                                        defaultValue={endereco}
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
                                        defaultValue={senha}
                                        onChange={(e) => setSenha(e.target.value)} 
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
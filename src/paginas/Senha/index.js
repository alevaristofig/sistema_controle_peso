import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import usePessoa from '../../hooks/pessoaHook';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';

import 'bootstrap/dist/css/bootstrap.css';


export default function Senha() {
    const {criptografarSenha} = usePessoa();
    const navigate = useNavigate();

    const [email,setEmail] = useState('');
    const [senha,setSenha] = useState('');
    const [senha2,setSenha2] = useState('');

    async function enviar(e) {
        e.preventDefault();

        if(senha === senha2) {
            let novaSenha = await criptografarSenha(senha);    
            recuperarSenha(novaSenha);                    
        } else {
            toast.error("As senhas digitadas estão diferentes, corrija e tente novamente!");            
        }
    }

    async function recuperarSenha(novaSenha) {
        let dados = {
            "email": email,
            "senha": novaSenha
        }

        await axios.put(`http://localhost:8080/v1/pessoas/recuperarsenha`,dados)
            .then((response) => {                                                        
               toast.success("Senha alterada com Sucesso");

               setTimeout(() => {
                navigate("/login");   
               },7000);                         
            })
            .catch((error) => {                                                                
                toast.error("Ocorreu um erro e a senha não pode ser recuperada, corrija e tente novamente!"); 
            }); 
    }

    return(
        <div>
            <div className='titulo'>
	            <span className='spanLogin'>Sistema de Controle de Peso</span>
	        </div>

            <div>
                <ToastContainer />
            </div>

            <div className="container py-4">
                <form className="form-perfil" onSubmit={enviar} method="post">
                    <div className="row mt-3">
                        <div className="col">
                            <label className="form-label">Email</label>
							<label className="form-label obrigatorio">*</label>
                            <input 
                                type="text" 
                                name="email"
                                className="form-control"
                                placeholder="Seu e-mail" 
                                onChange={e => setEmail(e.target.value)}
                                required 
                                autoFocus
                            />
                        </div>
                    </div>

                    <div className="row mt-3">
						<div className="col">
							<label className="form-label">Senha</label>
							<label className="form-label obrigatorio">*</label>
							<input 
                                type="password" 
                                name="senha"
                                className="form-control"
                                placeholder="Sua senha" 
                                onChange={e => setSenha(e.target.value)}
                                required                                 
                            />
						</div>
					</div>

                    <div className="row mt-3">
						<div className="col">
							<label className="form-label">Repita a Senha</label>
							<label className="form-label obrigatorio">*</label>
							<input 
                                type="password" 
                                name="senha2"
                                className="form-control"
                                placeholder="Sua senha" 
                                onChange={e => setSenha2(e.target.value)}
                                required                                 
                            />
						</div>
					</div>

                    <div className="row mt-3">
                        <div className="col-1">
                            <button type="submit" className="btn btn-primary">Enviar</button>
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
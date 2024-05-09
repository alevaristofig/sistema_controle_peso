import { useState } from 'react';

import bcrypt from "bcryptjs";
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';

import 'bootstrap/dist/css/bootstrap.css';


export default function Senha() {
    const [email,setEmail] = useState('');
    const [senha,setSenha] = useState('');
    const [senha2,setSenha2] = useState('');

    async function enviar(e) {
        e.preventDefault();

        if(senha === senha2) {
            let novaSenha = await criptografarSenha();
        } else {
            toast.error("As senhas digitadas estão diferentes, corrija e tente novamente!");            
        }
    }

    async function criptografarSenha() {
        let salt = bcrypt.genSaltSync(10);        
        let senhaCript = bcrypt.hashSync(senha,salt);

        return senhaCript;      
    }

    return(
        <div>
            <div class='titulo2'>
	            <span className='spanLogin'>Sistema de Controle de Peso</span>
	        </div>

            <div>
                <ToastContainer />
            </div>

            <div class="container py-4">
                <form class="form-perfil" onSubmit={enviar} method="post">
                    <div class="row mt-3">
                        <div class="col">
                            <label class="form-label">Email</label>
							<label class="form-label obrigatorio">*</label>
                            <input 
                                type="text" 
                                name="email"
                                class="form-control"
                                placeholder="Seu e-mail" 
                                onChange={e => setEmail(e.target.value)}
                                required 
                                autofocus
                            />
                        </div>
                    </div>

                    <div class="row mt-3">
						<div class="col">
							<label class="form-label">Senha</label>
							<label class="form-label obrigatorio">*</label>
							<input 
                                type="password" 
                                name="senha"
                                class="form-control"
                                placeholder="Sua senha" 
                                onChange={e => setSenha(e.target.value)}
                                required                                 
                            />
						</div>
					</div>

                    <div class="row mt-3">
						<div class="col">
							<label class="form-label">Repita a Senha</label>
							<label class="form-label obrigatorio">*</label>
							<input 
                                type="password" 
                                name="senha2"
                                class="form-control"
                                placeholder="Sua senha" 
                                onChange={e => setSenha2(e.target.value)}
                                required                                 
                            />
						</div>
					</div>

                    <div class="row mt-3">
                        <div class="col-1">
                            <button type="submit" class="btn btn-primary">Enviar</button>
                        </div>                        
                    </div>
                </form>
            </div>
        </div>
    )
}
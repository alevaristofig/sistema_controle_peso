import { useState } from 'react';

import TituloLogin from '../../compomentes/Titulo/tituloLogin';

import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.css';
import '../Pessoa/pessoa.css';

export default function Login() {
    const [email,setEmail] = useState();
    const [senha,setSenha] = useState();

    return(
        <div>
            <TituloLogin nome="Sistema de Controle de Peso"></TituloLogin>

            <div className="container py-4">
                <form className="form-perfil" onSubmit="">
                    <div className="row mt-3">
                        <div className="col">
                            <label className="form-label">Email</label>
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
                            <label className="form-label">Senha</label>
                            <label className="form-label obrigatorio">*</label>
                            <input 
                                type="text" 
                                className="form-control"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)} 
                                required
                            /> 
                        </div>
                    </div>

                    <div className="row mt-3">
                        <div className="col">
                            <button type="submit" className="btn btn-primary">Logar</button>
                        </div>
                    </div>      
                </form>
            </div>
        </div>


    )
}
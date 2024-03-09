import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { BiFoodMenu } from "react-icons/bi";
import { ToastContainer } from 'react-toastify';

import { salvar } from '../../redux/dieta/slice';

import Header from "../../compomentes/Headers";
import Titulo from "../../compomentes/Titulo";
import 'bootstrap/dist/css/bootstrap.css';

export default function CadastroDieta() {
    const dispatch = useDispatch();

    const [nome,setNome] = useState('');

    function salvarDados(e) {
        e.preventDefault();

        dispatch(salvar({
            'nome': nome
        }));

        setNome('');
    }

    return(
        <div>
            <Header />
            <div className="content">
                <Titulo nome="Cadastro Dieta">
                    <BiFoodMenu color="#000" size={24} />
                </Titulo>

                <div>
                    <ToastContainer />
                </div>

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
                                <button type="submit" className="btn btn-primary">Cadastrar</button>
                            </div>
                        </div> 
                    </form>
                </div>
            </div>
        </div>
    )
}

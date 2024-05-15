import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CiMedicalClipboard } from "react-icons/ci";
import { ToastContainer } from 'react-toastify';

import { useDispatch } from 'react-redux';
import { salvar } from "../../redux/historicomedico/slice";

import Header from "../../compomentes/Headers";
import Titulo2 from '../../compomentes/Titulo/titulo2';
import 'bootstrap/dist/css/bootstrap.css';

export default function CadastroHistoricoMedico() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [descricao,setDescricao] = useState('');
    const [remedio,setRemedio] = useState('');

    useEffect(() => {
        if(sessionStorage.getItem('token') == null) {           
            navigate('/login');
        }
    })

    function salvarDados(e) {
        e.preventDefault();

        let dataAtual = new Date();

        dispatch(salvar({
            'descricao': descricao,
            'remedio': remedio,
            'dataCadastro': dataAtual.toISOString(),
            'dataAtualizacao': null
        }));

        setDescricao('');
        setRemedio('');
    }

    return(
        <div>
            <Header />
            <div className="content">
                <div>
                    <ToastContainer />
                </div>

                <Titulo2 nome="Cadastro Histórico Médico">
                    <CiMedicalClipboard color="#fff" size={24} />
                </Titulo2>

                <div className="container py-4">
                    <form className="form-perfil" onSubmit={salvarDados}>
                        <div className="row mt-3">
                            <div className="col">
                                <label className="form-label">Descrição</label>
                                <label className="form-label obrigatorio">*</label>
                                <input 
                                    type="text" 
                                    className="form-control"
                                    value={descricao}
                                    onChange={(e) => setDescricao(e.target.value)}                                    
                                    required 
                                /> 
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="col">
                                <label className="form-label">Remédio</label>
                                <label className="form-label obrigatorio">*</label>
                                <input 
                                    type="text" 
                                    className="form-control"
                                    value={remedio}
                                    onChange={(e) => setRemedio(e.target.value)}                                    
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
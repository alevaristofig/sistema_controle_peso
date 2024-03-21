import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CiMedicalClipboard } from "react-icons/ci";
import { useDispatch } from 'react-redux';
import { ToastContainer } from "react-toastify";

import Header from "../../compomentes/Headers";
import Titulo from "../../compomentes/Titulo";
import 'bootstrap/dist/css/bootstrap.css';

import useHistoricoMedico from "../../hooks/historicoMedicoHook";
import { atualizar } from "../../redux/historicomedico/slice";

export default function EditarHistoricoMedico() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [descricao,setDescricao] = useState('');
    const [remedio,setRemedio] = useState('');
    const [pessoaId,setPessoaId] = useState('');
    const [dataCadastro,setDataCadastro] = useState('');

    const { id } = useParams();
    const { buscar } = useHistoricoMedico();

    useEffect(() => {

        async function buscarDados() {
            let dados = await buscar(id);

            setDescricao(dados.descricao);
            setRemedio(dados.remedio);
            setPessoaId(dados.pessoa.id);
            setDataCadastro(dados.dataCadastro);

        }

        buscarDados();
    },[])

    function atualizarDados(e) {
        e.preventDefault();

        dispatch(atualizar({
            'id': id,
            'pessoaId': pessoaId,
            'descricao': descricao,
            'remedio': remedio,
            'dataCadastro': dataCadastro
        }));

        setDescricao('');
        setRemedio('');
        setDataCadastro('');
        setPessoaId('');

        navigate('/historicomedico', {replace: true})
    }

    return (
        <div>
            <Header />
            <div className="content">
                <div>
                    <ToastContainer />
                </div>

                <Titulo nome="Editar Histórico Médico">
                    <CiMedicalClipboard color="#000" size={24} />
                </Titulo>

                <div className="container py-4">
                    <form className="form-perfil" onSubmit={atualizarDados}>
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
                                <button type="submit" className="btn btn-primary">Atualizar</button>
                            </div>
                        </div> 
                    </form>
                </div>
            </div>
        </div>
    )
}
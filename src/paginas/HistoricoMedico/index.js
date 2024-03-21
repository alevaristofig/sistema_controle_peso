import { useState, useEffect } from "react";
import { CiMedicalClipboard } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch } from 'react-redux';
import { apagar } from '../../redux/historicomedico/slice';
import useHistoricoMedico from "../../hooks/historicoMedicoHook";

import { ToastContainer } from 'react-toastify';
import Header from "../../compomentes/Headers";
import Titulo from "../../compomentes/Titulo";
import 'bootstrap/dist/css/bootstrap.css';

export default function HistoricoMedico() {

    const dispatch = useDispatch();
    const { listar } = useHistoricoMedico();

    const [historicosMedico,setHistoricosMedico] = useState([]);
    const [loading,setLoading] = useState(true);

    useEffect(() => {

        async function listarHistoricosMedico() {
            let dados = await listar();

            setHistoricosMedico(dados);
        }

        listarHistoricosMedico();
        setLoading(false);
    },[loading]);

    function formatarData(dataFormatada) {
        let data = new Date(dataFormatada);

        return data.toLocaleDateString('pt-BR')
    }

    function apagarHistoricoMedico(id) {
        dispatch(apagar({
            'id': id
        }));

        setLoading(true);
    }

    return(
        <div>
            <Header />
            <div className="content">
                <Titulo nome="Histórico Médico">
                    <CiMedicalClipboard color="#000" size={24} />
                </Titulo>
                <div>
                    <ToastContainer />
                </div>

                <div className="container py-4">
                    <div className="row">
                        <div className="col">
                            <Link to="/cadastrohistoricomedico" className="btn btn-success">Novo Histórico Médico</Link>
                        </div>
                    </div>
                    {
                        loading 
                        ?
                            <div className="spinner-border text-primary mt-3" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        :
                            historicosMedico.length == 0
                            ?
                                <div className="row mt-4">
                                    <div className="col">
                                        <span>Nenhuma histórico médigo encontrado </span>                                    
                                    </div>
                                </div>
                            :
                                <div className="row mt-4">
                                    <div className="col">
                                        <table className="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Descrição</th>
                                                    <th>Remedio</th>
                                                    <th>Data Cadastro</th>
                                                    <th>Data Atualização</th>
                                                    <th>#</th>                                                        
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    historicosMedico.map((h,i) => {
                                                        return (
                                                            <tr key={i}>
                                                                <td>{h.id}</td>
                                                                <td>{h.descricao}</td>
                                                                <td>{h.remedio}</td>
                                                                <td>{formatarData(h.dataCadastro)}</td>
                                                                <td>{formatarData(h.dataAtualizacao)}</td>
                                                                <td>
                                                                    <Link to={`/editarhistoricomedico/${h.id}`} className="btn btn-info float-start me-4">Editar</Link>                                                                        
                                                                    <button type='button' 
                                                                                className="btn btn-danger float-start" 
                                                                                onClick={() => apagarHistoricoMedico(h.id)}>Apagar</button>

                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                    }
                </div>
            </div>
        </div>
    )
}
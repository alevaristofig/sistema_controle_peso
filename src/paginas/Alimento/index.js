import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import { listar, apagar } from "../../redux/alimento/slice";

import { ToastContainer } from 'react-toastify';
import { FaBowlFood } from 'react-icons/fa6';

import Header from "../../compomentes/Headers";
import Titulo from '../../compomentes/Titulo';
import 'bootstrap/dist/css/bootstrap.css';

import Paginacao from '../../compomentes/Paginacao';

export default function Alimento() {
    const { page } = useParams();
    const dispatch = useDispatch();
    const { alimentos, loading } = useSelector((rootReducer) => rootReducer.alimento);
    const navigate = useNavigate();

    useEffect(() => {

        if(sessionStorage.getItem('token') == null) {           
            navigate('/login');
        }

        dispatch(listar({
            'page': page
        }));

    },[]);

    function formatarData(dataFormatada) {
        let data = new Date(dataFormatada);

        return data.toLocaleDateString('pt-BR')
    }

    function apagarAlimento(id) {
        dispatch(apagar({
            'id': id
        })); 
        
        setTimeout(() => {
            window.location.reload()
        }, 7000);
    }

    return(
        <div>
            <Header />
            <div className="content">
                <Titulo nome="Alimento">
                    <FaBowlFood color="#fff" size={24} />
                </Titulo>

                <div>
                    <ToastContainer />
                </div>

                <div className="container py-4">
                    <div className="row">
                        <div className="col">
                            <Link to="/cadastroalimento" className="btn btn-success">Novo Alimento</Link>
                        </div>
                    </div>
                    {
                        loading
                        ?
                            <div className="spinner-border text-primary mt-3" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        : 
                            alimentos.dados.length == 0
                            ?
                                <div className="row mt-4">
                                    <div className="col">
                                        <span>Nenhuma alimento encontrado </span>                                    
                                    </div>
                                </div>
                            :
                                <div className="row mt-4">
                                    <div className="col">
                                        <table className="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Nome</th>
                                                    <th>Quantidade</th>
                                                    <th>Caloria</th>
                                                    <th>Data Cadastro</th>
                                                    <th>Data Atualização</th>
                                                    <th>#</th>                                                        
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    alimentos.dados.map((a,i) => {
                                                        return(
                                                            <tr key={i}>
                                                                <td>{a.id}</td>
                                                                <td>{a.nome}</td>
                                                                <td>{a.quantidade}</td>
                                                                <td>{a.calorias}</td>
                                                                <td>{formatarData(a.dataCadastro)}</td>
                                                                <td>{formatarData(a.dataAtualizacao)}</td>
                                                                <td>
                                                                    <Link to={`/editaralimento/${a.id}`} className="btn btn-info float-start me-4">Editar</Link>                                                                        
                                                                    <button type='button' 
                                                                            className="btn btn-danger float-start" 
                                                                            onClick={() => apagarAlimento(a.id)}>Apagar</button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                        {
                                            alimentos.paginacao.totalPages > 1
                                            ?
                                                <div className='row'>
                                                    <Paginacao dados={alimentos} />
                                                </div>
                                            :
                                                ''
                                        }
                                    </div>
                                </div>
                    }
                </div>
            </div>
        </div>
    )
}
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import { LiaRunningSolid  } from 'react-icons/lia';
import { ToastContainer } from 'react-toastify';

import { useDispatch, useSelector } from 'react-redux';
import { listar, remover } from "../../redux/exercicio/slice";

import Header from "../../compomentes/Headers";
import Titulo from '../../compomentes/Titulo';
import 'bootstrap/dist/css/bootstrap.css';

import Paginacao from '../../compomentes/Paginacao';

export default function Exercicio(){

    const dispatch = useDispatch();
    const { exercicios, loading } = useSelector((rootReducer) => rootReducer.exercicio);
    const { page } = useParams();
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
        let d = new Date(dataFormatada);

        return d.toLocaleDateString('pt-BR')
    }

    function removerExercicio(id) {
        dispatch(remover({
            "id": id
        })); 
        
        setTimeout(() => {
            window.location.reload()
        }, 7000);
    }

    return(
        <div>
            <Header />
            <div className="content">
                <Titulo nome="Exercício">
                    <LiaRunningSolid color="#fff" size={24} />
                </Titulo>

                <div>
                    <ToastContainer />
                </div>

                <div className="container py-4">
                    <div className="row">
                        <div className="col">
                            <Link to="/cadastroexercicio" className="btn btn-success">Novo Exercicio</Link>
                        </div>
                    </div>

                    {
                        loading
                        ?
                            <div className="spinner-border text-primary mt-3" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        :
                            exercicios.dados.length === 0
                            ?
                                <div className="row mt-4">
                                    <div className="col">
                                        <span>Nenhuma exercício encontrado </span>                                    
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
                                                        <th>Frequência</th>
                                                        <th>Tempo</th>
                                                        <th>Data Cadastro</th>
                                                        <th>Data Atualização</th>
                                                        <th>#</th>                                                        
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        exercicios.dados.map((m,i) => {
                                                            return(
                                                                <tr key={i}>
                                                                    <td>{m.id}</td>
                                                                    <td>{m.nome}</td>
                                                                    <td>{m.frequencia}</td>
                                                                    <td>{m.tempo}</td>
                                                                    <td>{formatarData(m.dataCadastro)}</td>
                                                                    <td>{formatarData(m.dataAtualizacao)}</td>
                                                                    <td>
                                                                    <td>
                                                                        <Link to={`/editarexercicio/${m.id}`} className="btn btn-info float-start me-4">Editar</Link>                                                                        
                                                                        <button type='button' 
                                                                                className="btn btn-danger float-start" 
                                                                                onClick={() => removerExercicio(m.id)}>Apagar</button>
                                                                    </td>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                </tbody>
                                        </table>
                                        {
                                            exercicios.paginacao.totalPages > 1
                                            ?
                                                <div className='row'>
                                                    <Paginacao dados={exercicios} />
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
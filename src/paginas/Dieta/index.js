import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { BiFoodMenu } from "react-icons/bi";
import { ToastContainer } from 'react-toastify';

import useDieta from "../../hooks/dietaHook";
import { apagar } from "../../redux/dieta/slice";

import Header from "../../compomentes/Headers";
import Titulo from "../../compomentes/Titulo";
import 'bootstrap/dist/css/bootstrap.css';

import Paginacao from '../../compomentes/Paginacao';

export default function Dieta() {
    const dispatch = useDispatch();

    const {listar} = useDieta();
    const { page } = useParams();

    const [dietas,setDietas] = useState([]);
    const [loadingApagar,setLoadingApagar] = useState(true);

    useEffect(() => {    

        async function listarDietas() {
            let dieta = await listar(page);
            setDietas(dieta);
        }
        
        listarDietas();
        setLoadingApagar(false);

    },[loadingApagar]);

    function apagarDieta(id) {
        dispatch(apagar({
            'id': id
        }));

        setLoadingApagar(true);
    }

    return(
        <div>
            <Header />
            <div className="content">
                <Titulo nome="Dieta">
                    <BiFoodMenu color="#000" size={24} />
                </Titulo>

                <div>
                    <ToastContainer />
                </div>

                <div className="container py-4">
                    <div className="row">
                        <div className="col">
                            <Link to="/cadastrodieta" className="btn btn-success">Nova Dieta</Link>
                        </div>
                    </div>
                    {
                        dietas.length == 0
                        ?
                            <div className="row mt-4">
                                <div className="col">
                                    <span>Nenhuma dieta encontrada </span>                                    
                                </div>
                            </div>
                        :
                            <div className="row mt-4">
                                <div className="col">
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>    
                                                <th scope="col">#</th>                                     
                                                <th scope="col">Nome</th>
                                                <th scope="col">Data Cadastro</th>
                                                <th scope="col">Data Atualização</th>
                                                <th scope="col">Ações</th>                                                                             
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                dietas.dados.map((d,i) => {
                                                    return(
                                                        <tr>
                                                            <td>{d.id}</td>
                                                            <td>{d.nome}</td>
                                                            <td>{d.dataCadastro}</td>
                                                            <td>{d.dataAtualizacao}</td>
                                                            <td>
                                                                <Link to={`/editardieta/${d.id}`} className="btn btn-info float-start me-4">Editar</Link>                                                                        
                                                                <button type='button' 
                                                                    className="btn btn-danger float-start" 
                                                                    onClick={() => apagarDieta(d.id)}>Apagar</button>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                    {
                                        dietas.paginacao.totalPages > 1
                                        ?
                                            <div className='row'>
                                                <Paginacao dados={dietas} />
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
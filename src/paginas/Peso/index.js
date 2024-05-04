import { useEffect, useState } from 'react';
import { LiaWeightHangingSolid } from 'react-icons/lia';
import { Link, useNavigate, useParams } from "react-router-dom";

import { useDispatch, useSelector } from 'react-redux';
import { listar, apagar, buscarPrimeiroPeso, buscarUltimoPeso } from '../../redux/peso/slice';

import { ToastContainer } from 'react-toastify';
import Header from "../../compomentes/Headers";
import Titulo from "../../compomentes/Titulo";
import 'bootstrap/dist/css/bootstrap.css';

import Paginacao from '../../compomentes/Paginacao';

export default function Peso() {

    const dispatch = useDispatch();
    const { pesos, loading, primeiroPeso, ultimoPeso } = useSelector((rootReducer) => rootReducer.peso);
    const navigate = useNavigate();
    const {page} = useParams();

    const [loadingDel,setLoadingDel] = useState(true);

    useEffect(() => {

        if(sessionStorage.getItem('token') == null) {           
            navigate('/login');
        }

        dispatch(listar({
            'page': page
        }));

        dispatch(buscarPrimeiroPeso());

        dispatch(buscarUltimoPeso());

        setLoadingDel(false);
    },[loadingDel]);

    function formatarData(dataFormatada) {
        let d = new Date(dataFormatada);

        return d.toLocaleDateString('pt-BR')
    }

    function apagarPeso(id) {
        dispatch(apagar({
            "id": id
        }));

        setLoadingDel(true);
    }

    return(
        <div>
            <Header />
            <div className="content">
                <Titulo nome="Pessoa">
                    <LiaWeightHangingSolid color="#000" size={24} />
                </Titulo>
                <div>
                    <ToastContainer />
                </div>

                <div className="container py-4">
                    <div className="row">
                        <div className="col">
                            <Link to="/cadastropeso" className="btn btn-success">Novo Peso</Link>
                        </div>
                    </div>                    
                    {
                        loading 
                            ? 
                                <div className="spinner-border text-primary mt-3" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            : 
                                pesos.length == 0
                                ?
                                    <div className="row mt-4">
                                        <div className="col">
                                            <span>Nenhuma peso encontrado </span>                                    
                                        </div>
                                    </div>
                                :                                
                                    <div className="row mt-4">
                                        <div className="col">
                                            <table className="table table-bordered">
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Peso</th>
                                                        <th>Imc</th>
                                                        <th>Data</th>
                                                        <th>Diferença Peso</th>
                                                        <th>#</th>                                                        
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {                                                        
                                                        pesos.dados.map((m,i) => {
                                                            return(
                                                                <tr key={i}>
                                                                    <td>{m.id}</td>
                                                                    <td>{m.valor}</td>
                                                                    <td>{m.imc}</td>
                                                                    <td>{
                                                                            formatarData(m.dataCadastro)
                                                                        }
                                                                    </td>
                                                                    <td>                                                                        
                                                                        {                                                                                                                                                
                                                                            i === 0
                                                                            ?
                                                                                0
                                                                            :
                                                                                (pesos.dados[i].valor - pesos.dados[i-1].valor) > 0
                                                                                 ?
                                                                                 <span className='text-danger'>
                                                                                    {(pesos.dados[i].valor - pesos.dados[i-1].valor).toFixed(2)}
                                                                                 </span>
                                                                                 :
                                                                                    <span className='text-success'>
                                                                                        {(pesos.dados[i].valor - pesos.dados[i-1].valor).toFixed(2)}
                                                                                    </span>
                                                                                    
                                                                        }
                                                                    </td>
                                                                    <td>
                                                                        <Link to={`/editarpeso/${m.id}`} className="btn btn-info float-start me-4">Editar</Link>                                                                        
                                                                        <button type='button' 
                                                                                className="btn btn-danger float-start" 
                                                                                onClick={() => apagarPeso(m.id)}>Apagar</button>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })
                                                        
                                                    }
                                                    <tr>
                                                        <td>Total Imc</td>
                                                        <td>
                                                            <span>
                                                                {primeiroPeso.imc} - {ultimoPeso.imc} = 
                                                            </span>
                                                            {
                                                                ultimoPeso.imc - primeiroPeso.imc < 0
                                                                ?
                                                                    <span className='text-success ms-1'>                                                                        
                                                                        {(ultimoPeso.imc - primeiroPeso.imc).toFixed(2)}
                                                                    </span>
                                                                :
                                                                <span className='text-danger ms-1'>
                                                                    {(ultimoPeso.imc - primeiroPeso.imc).toFixed(2)}
                                                                </span>
                                                                
                                                            }
                                                        </td>
                                                        <td>Total Peso Perdido</td>
                                                        <td colSpan={3}>
                                                            <span>
                                                                {primeiroPeso.valor} - {ultimoPeso.valor} = 
                                                            </span>
                                                            {
                                                                primeiroPeso.valor - ultimoPeso.valor > 0
                                                                ?
                                                                    <span className='text-success ms-2'>
                                                                        {(primeiroPeso.valor - ultimoPeso.valor).toFixed(2)}
                                                                    </span>
                                                                :
                                                                    <span className='text-danger ms-2'>
                                                                        {(primeiroPeso.valor - ultimoPeso.valor).toFixed(2)}
                                                                    </span>
                                                                
                                                            }
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            {
                                                pesos.paginacao.totalElements > 0
                                                ?
                                                    <div className='row'>
                                                        <Paginacao dados={pesos} />
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
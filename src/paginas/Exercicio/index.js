import { useEffect } from "react";
import { Link } from "react-router-dom";

import { LiaRunningSolid  } from 'react-icons/lia';
import { ToastContainer } from 'react-toastify';

import { useDispatch, useSelector } from 'react-redux';
import { listar } from "../../redux/exercicio/slice";

import Header from "../../compomentes/Headers";
import Titulo from "../../compomentes/Titulo";
import 'bootstrap/dist/css/bootstrap.css';

export default function Exercicio(){

    const dispatch = useDispatch();
    const { exercicios, loading } = useSelector((rootReducer) => rootReducer.exercicio);

    useEffect(() => {
        dispatch(listar());
    },[]);

    return(
        <div>
            <Header />
            <div className="content">
                <Titulo nome="Pessoa">
                    <LiaRunningSolid color="#000" size={24} />
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
                            exercicios.length == 0
                            ?
                                <div className="row mt-4">
                                    <div className="col">
                                        <span>Nenhuma exercício encontrado </span>                                    
                                    </div>
                                </div>
                            :
                                'dados'
                    }
                </div>
            </div>
        </div>
    )
}
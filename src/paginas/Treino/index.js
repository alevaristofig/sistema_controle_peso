import { useEffect, useState } from 'react';
import { GiWeightLiftingUp } from 'react-icons/gi';
import { ToastContainer } from 'react-toastify';

import { useDispatch, useSelector } from 'react-redux';
import { listar } from "../../redux/exercicio/slice";
import { listarTreino, salvar } from '../../redux/treino/slice';

import Header from "../../compomentes/Headers";
import Titulo from "../../compomentes/Titulo";
import Treinos from '../../compomentes/Treinos';
import 'bootstrap/dist/css/bootstrap.css';

export default function Treino() {

    const dispatch = useDispatch();
    const { exercicios, loading } = useSelector((rootReducer) => rootReducer.exercicio);
    const { treinos, loadingTreino } = useSelector((rootReducer) => rootReducer.treino);

    const [data,setData] = useState([]);
    const [diaSemana,setDiaSemana] = useState('');
    const [treino,setTreino] = useState(false);
    const [valoresTreino,setValoresTreino] = useState([]);
    const [loadingRegistro,setLoadingRegistro] = useState(true);

    function formatarDiaSemana(dataFormatacao) {
        switch(dataFormatacao.getDay()) {
            case 0:
                setDiaSemana('Domingo');
            break;

            case 1:
                setDiaSemana('Segunda-Feira');
            break;

            case 2:
                setDiaSemana('Terça-Feira');
            break;

            case 3:
                setDiaSemana('Quarta-Feira');
            break;

            case 4:
                setDiaSemana('Quinta-Feira');
            break;

            case 5:
                setDiaSemana('Sexta-Feira');
            break;

            case 6:
                setDiaSemana('Sabado');
            break;
        }
    }

    useEffect(() => {
        dispatch(listar());

        dispatch(listarTreino());

        let dataAtual = new Date();

        setData(dataAtual.toLocaleDateString());

        formatarDiaSemana(dataAtual);

       setLoadingRegistro(false);
    },[loadingRegistro]);

    function registrarValoresTreino(e) {

        let dados;
        let indice = valoresTreino.findIndex((i) => i.id == e.target.value);

        if(indice !== -1) {
            valoresTreino[indice].treino = e.target.checked ? 'S': 'N';
        } else {
            dados = {
                'id': e.target.value,
                'treino': e.target.checked ? 'S': 'N'
            };

            valoresTreino.push(dados)     
        }
         
        setValoresTreino(valoresTreino);
    }

    function registrarTreino(e) {
        e.preventDefault();

        let dataBanco = data.split('/');
        let dataAtual = new Date();

        dataBanco = dataBanco[2]+'-'+dataBanco[1]+'-'+dataBanco[0]+`T${dataAtual.toLocaleTimeString()}`;

        if(valoresTreino.length === 0) {
            exercicios.forEach(element => {
                dispatch(salvar({
                    'pessoaId': treinos[0].pessoaId.id,
                    'exercicioId': element.id,
                    'treino': 'N',
                    'data': dataBanco
                }));
            });
        } else if(valoresTreino.length === 1) {
            let indice = exercicios.findIndex((i) => i.id == valoresTreino[0].id);
          
            exercicios.forEach((e,i) => {
                if(i !== indice) {
                    dispatch(salvar({
                        'pessoaId': treinos[0].pessoaId.id,
                        'exercicioId': e.id,
                        'treino': 'N',
                        'data': dataBanco
                    }));
                }
            });

            dispatch(salvar({
                'pessoaId': treinos[0].pessoaId.id,
                'exercicioId': valoresTreino[0].id,
                'treino': valoresTreino[0].treino,
                'data': dataBanco
            }));
        } else {
            valoresTreino.forEach(element => {
                dispatch(salvar({
                    'pessoaId': treinos[0].pessoaId.id,
                    'exercicioId': element.id,
                    'treino': element.treino,
                    'data': dataBanco
                }));
            });
        }

        setLoadingRegistro(true);
    }

    function mostrarDivTreino() {
        if(treinos.length > 0) {

            let dataDivTreino = data.split('/');
            dataDivTreino = dataDivTreino[2]+'-'+dataDivTreino[1]+'-'+dataDivTreino[0];

            let result = treinos.findIndex((e) => e.data.substring(0,10) === dataDivTreino);

            return result;
        }
    }

    return(
        <>
            <Header />
            <div className="content">
                <Titulo nome="Pessoa">
                    <GiWeightLiftingUp color="#000" size={24} />
                </Titulo>

                <div>
                    <ToastContainer />
                </div>
                
                <div className="container py-4">
                    {
                        loading
                        ?
                            <div className="spinner-border text-primary mt-3" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        :  
                            <div className='row'>
                                <Treinos dados={treinos} />
                            </div>
                            
                        }

                        {                                                     
                            exercicios.length === 0
                            ?
                                <div className="row mt-4">
                                    <div className="col">
                                        <span>Nenhuma exercício encontrado </span>                                    
                                    </div>
                                </div>
                            :
                                <>
                                    <form method='post' onSubmit={registrarTreino}>
                                        <div className="row">                                    
                                            {                                        
                                                exercicios.map((e,i) => {     
                                                    if(mostrarDivTreino() === -1) {
                                                        
                                                         
                                                                               
                                                    return(                                                                                                       
                                                        <div className="col-sm-3 mb-4" key={i}>
                                                            <div className="card">
                                                                <div className="card-body">
                                                                    <h5 className="card-title">{e.nome}</h5>  
                                                                    <p>{diaSemana} - {data}</p>                                  
                                                                    <div className="form-check form-switch">
                                                                        <input 
                                                                            className="form-check-input" 
                                                                            type="checkbox"
                                                                            value={e.id}                                                                             
                                                                            onChange={(e) => registrarValoresTreino(e)}                                                                            
                                                                        />
                                                                        <label className="form-check-label">Feito</label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>                                                
                                                    )  
                                                    }                                          
                                                })                                        
                                            }                                                                                                      
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col">
                                                <button type="submit" className="btn btn-primary">Registrar</button>
                                            </div>
                                        </div>  
                                    </form>  
                                </>                                                                
                            
                    }

                    
                </div>
            </div>
        </>
    )
}
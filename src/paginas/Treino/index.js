import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GiWeightLiftingUp } from 'react-icons/gi';
import { ToastContainer } from 'react-toastify';

import { useDispatch, useSelector } from 'react-redux';
import { listarSemPaginacao } from "../../redux/exercicio/slice";
import { listarTreino, salvar } from '../../redux/treino/slice';

import Header from "../../compomentes/Headers";
import Titulo2 from '../../compomentes/Titulo/titulo2';
import Treinos from '../../compomentes/Treinos';
import 'bootstrap/dist/css/bootstrap.css';

import Paginacao from '../../compomentes/Paginacao';

export default function Treino() {

    const dispatch = useDispatch();

    const {page} = useParams();
    const { exerciciosSemPaginacao, loading } = useSelector((rootReducer) => rootReducer.exercicio);
    const { treinos, loadingTreino } = useSelector((rootReducer) => rootReducer.treino); 
    const navigate = useNavigate();   

    const [data,setData] = useState([]);
    const [diaSemana,setDiaSemana] = useState('');
    const [treino,setTreino] = useState(false);
    const [treinoFeito,setTreinoFeito] = useState('S');
    const [treinoNaoFeito,setTreinoNaoFeito] = useState('N');
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

        if(sessionStorage.getItem('token') == null) {           
            navigate('/login');
        }

        dispatch(listarSemPaginacao());

        dispatch(listarTreino({
            'page': page
        }));

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
    }

    function registrarTreino(e) {
        e.preventDefault();
        
        let dataBanco = data.split('/');
        let dataAtual = new Date();       

        exerciciosSemPaginacao.forEach(e => {
            let dados = {
                'pessoaId': 1,
                'exercicioId': e.id,                
                'dataCadastro': dataAtual.toISOString()
            };
            let indice = valoresTreino.findIndex((i) => i.id == e.id);

            if(indice != -1) {
                dados.treino = valoresTreino[indice].treino;
            } else {
                dados.treino = treinoNaoFeito;
            }
           
            dispatch(salvar({
                dados
            }));
        })

        navigate('/', {replace: true}); 
    }

    function mostrarDivTreino() {
        if(typeof treinos.dados == 'object') {

            let dataAtual = new Date();
            let dataDivTreino = dataAtual.toLocaleDateString().split('/');
            dataDivTreino = dataDivTreino[2]+'-'+dataDivTreino[1]+'-'+dataDivTreino[0];

            let result = treinos.dados.findIndex((e) => e.data.substring(0,10) === dataDivTreino);

            return result;
        }
    }

    return(
        <>
            <Header />
            <div className="content">
                <Titulo2 nome="Treino">
                    <GiWeightLiftingUp color="#fff" size={24} />
                </Titulo2>

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
                                <Treinos treinoDados={treinos} />                              
                            </div>
                            
                        }

                        {                                                     
                            exerciciosSemPaginacao.length === 0
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
                                                exerciciosSemPaginacao.map((e,i) => {     
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
                                        {      
                                            typeof treinos.paginacao == 'object'   
                                            ?
                                                treinos.paginacao.totalPages > 1
                                                ?
                                                    <div className='row'>
                                                        <Paginacao dados={treinos} />
                                                    </div>
                                                :
                                                    ''
                                            :
                                                ''                                                                       
                                        }
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
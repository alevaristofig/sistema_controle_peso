import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { BiFoodMenu } from "react-icons/bi";
import { ToastContainer, toast } from 'react-toastify';

import { salvarDietaAlimento, apagarAlimentoDieta, atualizarDietaAlimento } from '../../redux/dieta/slice';
import { listar } from '../../redux/alimento/slice';
import { atualizar } from '../../redux/dieta/slice';
import useDieta from "../../hooks/dietaHook";
import useAlimento from '../../hooks/alimentoHook';

import Header from "../../compomentes/Headers";
import Titulo from '../../compomentes/Titulo';
import 'bootstrap/dist/css/bootstrap.css';

export default function EditarDieta() {
    const dispatch = useDispatch();
    const { id } = useParams();

    const {salvar,buscar,buscarAlimentoDieta} = useDieta();
    const {listar} = useAlimento();
    const navigate = useNavigate();

    const [loading,setLoading] = useState(true);
    const [nome,setNome] = useState('');
    const [dietaId,setDietaId] = useState('');
    const [alimentos,setAlimentos] = useState([]);
    const [alimentosDieta,setAlimentosDieta] = useState([]);
    const [dadosAlimentos,setDadosAlimentos] = useState([]);
    const [isChecked,setIsChecked] = useState([]);
    const [dataCadastro,setDataCadastro] = useState('');
    const [dataAtualizacao,setDataAtualizacao] = useState('');
    const [numAlimentosDieta,setNumAlimentosDieta] = useState(0);
    const [buscarError,setBuscarErro] = useState(false);


    useEffect(() => {     
        
        if(sessionStorage.getItem('token') == null) {           
            navigate('/login');
        }

        let dadosAlimentos = '';

        async function buscarDadosDieta() {
            let alimentos = await listar();
            let dadosDieta = await buscar(id);

            if(typeof dadosDieta === 'string') {
                toast.error(dadosDieta);  
                setBuscarErro(true);                                                 
            } else {

                setNome(dadosDieta.nome);
                setDietaId(dadosDieta.id);
                setDataCadastro(dadosDieta.dataCadastro)
    
                dadosAlimentos = await buscarAlimentoDieta(dadosDieta.id);   
                setDadosAlimentos(dadosAlimentos);                             
                setNumAlimentosDieta(dadosAlimentos.length);
            }

            alimentos.forEach((e,i) => {                  
                if(typeof dadosAlimentos.find((d) => d.alimento.id == e.id) == 'object') {
                    isChecked[i] = true;

                    let dados = {
                        'idAlimento': e.id,
                    };

                    alimentosDieta.push(dados);
                } else {
                    isChecked[i] = false;
                }
            });

            setAlimentos(alimentos);
            setAlimentosDieta(alimentosDieta);
        }

        buscarDadosDieta();

        setIsChecked(isChecked);
        setLoading(false);
        
    },[]);

    function registrarValoresTreino(e) {
       let idAlimento = e.target.value;

        if(e.target.checked) {            
            let dados = {
                'idAlimento': idAlimento,
            };

            alimentosDieta.push(dados);
        } else {
            let indice = alimentosDieta.findIndex((a) => a.idAlimento == idAlimento);
            alimentosDieta.splice(indice,1);
        }

        setAlimentosDieta(alimentosDieta);
    }

    async function salvarDados(e) {
        e.preventDefault();

        let dataAtual = new Date();

        dispatch(atualizar({
            'id': id,
            'nome': nome,
            'dataCadastro': dataCadastro,
            'dataAtualizacao': dataAtual.toISOString()
        }));
        
        if(alimentosDieta.length > numAlimentosDieta) {           
            alimentosDieta.forEach(element => {              
                if(typeof dadosAlimentos.find((d) => d.alimento.id == element.idAlimento) !== 'object') {                    
                    dispatch(salvarDietaAlimento({
                        'dietaId': id,
                        'alimentoId': element.idAlimento,
                        'dataCadastro': dataCadastro,
                        'dataAtualizacao': null
                    }));
                }
            })  
        } else if(alimentosDieta.length < numAlimentosDieta) {                                    
            dadosAlimentos.forEach(element => {
                if(typeof alimentosDieta.find((d) => d.idAlimento == element.alimento.id) === 'undefined') {
                    dispatch(apagarAlimentoDieta({
                        'id': element.id,                        
                    }));
                }
            })
        } else if(alimentosDieta.length == numAlimentosDieta) {            
            alimentosDieta.forEach((element,i) => {                
                dispatch(atualizarDietaAlimento({
                    'id': dadosAlimentos[i].id,
                    'dietaId': id,
                    'alimentoId': element.idAlimento,
                    'dataCadastro': dataCadastro,
                    'dataAtualizacao': dataAtual.toISOString()
                }));
            })
        }

        navigate('/dieta/0', {replace: true});
    }

    return(
        <div>
            <Header />
            <div className="content">
                <Titulo nome="Editar Dieta">
                    <BiFoodMenu color="#fff" size={24} />
                </Titulo>

                <div>
                    <ToastContainer />
                </div>

                <div className="container py-4">
                    <form className="form-perfil" onSubmit={salvarDados}>
                        {
                            loading
                            ?
                                <div className="spinner-border text-primary mt-3" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            :
                                buscarError
                                ?
                                    <div className="container py-4">
                                        <div className="col">
                                            <Link to="/dieta" className="btn btn-info float-start me-4">Voltar</Link>   
                                        </div>                                                                     
                                    </div>
                                :                                
                                    alimentos.length === 0                                                                          
                                        ?
                                            <div className="row mt-4">
                                                <div className="col">
                                                    <span>Nenhuma alimento encontrado </span>                                    
                                                </div>
                                            </div>
                                        :                                            
                                            <>
                                                <div className="row mt-3">
                                                    <div className="col">
                                                        <label className="form-label">Nome</label>
                                                        <label className="form-label obrigatorio">*</label>
                                                        <input 
                                                            type='text'
                                                            className="form-control" 
                                                            value={nome}                                 
                                                            onChange={(e) => setNome(e.target.value)} 
                                                            required 
                                                        />  
                                                    </div>
                                                </div>
                                                <div className="row mt-3">
                                                    <div className="col">
                                                        <label className="form-label">Alimentos</label>
                                                    </div>
                                                </div>
                                                <div className="row mt-3">
                                                    
                                                        {
                                                            alimentos.map((a,i) => {                                                                
                                                                return(                                                                                                                                  
                                                                    <div className="col-sm-3 mb-4" key={i}>
                                                                        <div className="card">
                                                                            <div className="card-body">                                                                            
                                                                                <div className='form-check form-check-inline form-switch'>
                                                                                    <input 
                                                                                        className='form-check-input' 
                                                                                        type='checkbox' 
                                                                                        value={a.id} 
                                                                                        id={a.id}                                                                                        
                                                                                        defaultChecked={isChecked[i]}
                                                                                        onChange={(e) => registrarValoresTreino(e)}
                                                                                    /> 
                                                                                    <label className="form-check-label">{a.nome} - {a.quantidade}</label>
                                                                                </div>   
                                                                            </div> 
                                                                        </div>
                                                                    </div>                                                                                                                    
                                                                )                                                                
                                                            })
                                                        }
                                                    
                                                </div>
                                                <div className="row mt-3">
                                                    <div className="col">
                                                        <button 
                                                            type="submit" 
                                                            className="btn btn-primary"
                                                        >Atualizar</button>
                                                    </div>
                                                </div> 
                                            </>
                        }
                                                
                    </form>
                </div>
            </div>
        </div>
    )
}

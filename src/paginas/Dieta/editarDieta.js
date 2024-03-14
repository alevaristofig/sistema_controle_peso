import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { BiFoodMenu } from "react-icons/bi";
import { ToastContainer } from 'react-toastify';

import { salvarDietaAlimento } from '../../redux/dieta/slice';
import { listar } from '../../redux/alimento/slice';
import useDieta from "../../hooks/dietaHook";

import Header from "../../compomentes/Headers";
import Titulo from "../../compomentes/Titulo";
import 'bootstrap/dist/css/bootstrap.css';

export default function EditarDieta() {
    const dispatch = useDispatch();
    const { alimentos, loading } = useSelector((rootReducer) => rootReducer.alimento);
    const { id } = useParams();

    const {salvar,buscar,buscarAlimentoDieta} = useDieta();
    const navigate = useNavigate();

    const [nome,setNome] = useState('');
    const [dietaId,setDietaId] = useState('');
    const [alimentosDieta,setAlimentosDieta] = useState([]);
    const [dadosAlimentos,setDadosAlimentos] = useState([]);

    useEffect(() => {        
        dispatch(listar());

        async function buscarDadosDieta() {
            let dadosDieta = await buscar(id);

            setNome(dadosDieta.nome);
            setDietaId(dadosDieta.id);

            let dadosAlimentos = await buscarAlimentoDieta(dadosDieta.id);
            setDadosAlimentos(dadosAlimentos);
           // console.log(dadosAlimentos)
        }

        buscarDadosDieta();
        
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

        let dados = {
            'nome': nome
        };

        const idDieta = await salvar(dados);

        if(idDieta !== '') {
            if(alimentosDieta.length > 0) {
                alimentosDieta.forEach(element => {
                    dispatch(salvarDietaAlimento({
                        'dietaId': idDieta,
                        'alimentoId': element.idAlimento
                    }));
                })
            }
        }

        setNome('');

        navigate('/dieta', {replace: true})
    }

    return(
        <div>
            <Header />
            <div className="content">
                <Titulo nome="Editar Dieta">
                    <BiFoodMenu color="#000" size={24} />
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
                                                                                        defaultChecked={typeof dadosAlimentos.find((d) => d.alimento.id == a.id) == 'object' ? 'checked' : ''}
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
                                                        <button type="submit" className="btn btn-primary">Cadastrar</button>
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

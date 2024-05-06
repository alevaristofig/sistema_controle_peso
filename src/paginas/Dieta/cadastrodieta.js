import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { BiFoodMenu } from "react-icons/bi";
import { ToastContainer, toast } from 'react-toastify';

import { salvarDietaAlimento } from '../../redux/dieta/slice';
import { listarAlimentos } from '../../redux/alimento/slice';
import useDieta from "../../hooks/dietaHook";

import Header from "../../compomentes/Headers";
import Titulo from "../../compomentes/Titulo";
import 'bootstrap/dist/css/bootstrap.css';

export default function CadastroDieta() {
    const dispatch = useDispatch();
    const { alimentos, loading } = useSelector((rootReducer) => rootReducer.alimento);

    const {salvar} = useDieta();
    const navigate = useNavigate();

    const [nome,setNome] = useState('');
    const [alimentosDieta,setAlimentosDieta] = useState([]);

    useEffect(() => {

        if(sessionStorage.getItem('token') == null) {           
            navigate('/login');
        }

        dispatch(listarAlimentos());
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

        if(alimentosDieta.length > 0) {

            let dados = {
                'nome': nome,
                'dataCadastro': dataAtual.toISOString(),
                'dataAtualizacao': null
            };

             const resultDieta = await salvar(dados);

             if(typeof resultDieta !== 'string') {
                alimentosDieta.forEach(element => {
                    dispatch(salvarDietaAlimento({
                        'dietaId': resultDieta,
                        'alimentoId': element.idAlimento,
                        'dataCadastro': dataAtual.toISOString(),
                        'dataAtualizacao': null
                    }));
                })                 
             } else {
                toast.error(resultDieta);
             }

             setNome('');

        } else {
            toast.error("É necessário selecionar algum Alimento!");   
        }                   
    }

    return(
        <div>
            <Header />
            <div className="content">
                <Titulo nome="Cadastro Dieta">
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
                                                                                        onChange={(e) => registrarValoresTreino(e)}
                                                                                    /> 
                                                                                    <label class="form-check-label" for="inlineCheckbox1">{a.nome} - {a.quantidade}</label>
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

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { BiFoodMenu } from "react-icons/bi";
import { ToastContainer } from 'react-toastify';

import { salvarDietaAlimento } from '../../redux/dieta/slice';
import { listar } from '../../redux/alimento/slice';
import { atualizar } from '../../redux/dieta/slice';
import useDieta from "../../hooks/dietaHook";
import useAlimento from '../../hooks/alimentoHook';

import Header from "../../compomentes/Headers";
import Titulo from "../../compomentes/Titulo";
import 'bootstrap/dist/css/bootstrap.css';

export default function EditarDieta() {
    const dispatch = useDispatch();
    //const { alimentos, loading } = useSelector((rootReducer) => rootReducer.alimento);
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
    const [dadost,setDadosT] = useState(0);

    useEffect(() => {        
        //dispatch(listar());

       // setDadosT(alimentos.length);

        async function buscarDadosDieta() {
            let alimentos = await listar();
            let dadosDieta = await buscar(id);

            setNome(dadosDieta.nome);
            setDietaId(dadosDieta.id);

            let dadosAlimentos = await buscarAlimentoDieta(dadosDieta.id);
            setDadosAlimentos(dadosAlimentos);

            alimentos.forEach((e,i) => {
                if(typeof dadosAlimentos.find((d) => d.alimento.id == e.id) == 'object') {
                    isChecked[i] = true;
                } else {
                    isChecked[i] = false;
                }
            });

            console.log(isChecked);
            setAlimentos(alimentos);
           //setarValoresAlimento();
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



       // dispatch(atualizar({
          //  'id': id,
           // 'nome': nome
       // }));
        //const idDieta = await salvar(dados);
alert(alimentosDieta.length);
console.log(alimentosDieta)
        if(alimentosDieta.length === 0) {
                    
        }

        navigate('/dieta', {replace: true});

       /* if(idDieta !== '') {
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

        navigate('/dieta', {replace: true})*/
    }

    function setarValoresAlimento() {
        //console.log(id);
       // alert('carregou '+alimentos.length);
        console.log(alimentos.length);
        //return (typeof dadosAlimentos.find((d) => d.alimento.id == id) == 'object') ? true : false;
        //document.getElementById(id).checked = true;
       // alert(id)
       // if(document.getElementById(id) != null) {            
           // console.log(document.getElementById(id)).checked = true;
       // }
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
                                            //setarValoresAlimento(); 
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
                                                                                        //checked={(typeof dadosAlimentos.find((d) => d.alimento.id == a.id) == 'object') ? true : false}                                                                
                                                                                        //defaultChecked={(typeof dadosAlimentos.find((d) => d.alimento.id == a.id) == 'object') ? true : false}   
                                                                                        //defaultChecked={setarValoresAlimento(a.id)}
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

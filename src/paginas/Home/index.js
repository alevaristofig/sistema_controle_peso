import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { FiHome } from 'react-icons/fi';
import { VscPerson } from "react-icons/vsc";
import { LiaWeightHangingSolid } from 'react-icons/lia';
import { GiWeightLiftingUp } from 'react-icons/gi';
import { toast, ToastContainer } from 'react-toastify';

import { useDispatch, useSelector } from 'react-redux';

import { buscarPrimeiroPeso, buscarUltimoPeso } from '../../redux/peso/slice';
import usePessoa from "../../hooks/pessoaHook";
import useTreino from '../../hooks/treinoHook';
import useHome from '../../hooks/homeHook';

import Header from '../../compomentes/Headers';
import Titulo from "../../compomentes/Titulo";

import 'bootstrap/dist/css/bootstrap.css';

export default function Home() {

    const dispatch = useDispatch();

    const { primeiroPeso, ultimoPeso } = useSelector((rootReducer) => rootReducer.peso);
    const { buscar } = usePessoa();
    const { listarQuantidadeTreinos } = useTreino();
    const { listarUrls } = useHome();
    const navigate = useNavigate();

    const [nome,setNome] = useState('');
    const [altura,setAltura] = useState('');
    const [endereco,setEndereco] = useState('');
    const [treinosFeitos,setTreinosFeitos] = useState('');
    const [treinosNaoFeitos,setTreinosNaoFeitos] = useState([]);
    const [buscarError,setBuscarErro] = useState(false);

    useEffect(() => {
    
        if(sessionStorage.getItem('token') == null) {           
            navigate('/login');
        }

        async function setUrls() {
            let urls = await listarUrls();

            sessionStorage.setItem('urls',JSON.stringify(urls._links));
        }

        async function buscarDados() {
            let dados = await buscar(1);

            if(typeof dados === 'string') {
                toast.error(dados);  
                setBuscarErro(true);       
            } else {                
                setNome(dados.nome);               
                setAltura(dados.altura);   
                setEndereco(dados.endereco);             
            }
        }

        async function buscarQuantidadeTreinoFeito(treino) {
            let dados = await listarQuantidadeTreinos(treino);

            setTreinosFeitos(dados);
        }

        async function buscarQuantidadeTreinoNaoFeito(treino) {
            let dados = await listarQuantidadeTreinos(treino);

            setTreinosNaoFeitos(dados);
        }

        if(sessionStorage.getItem('urls') == null) {                       
            setUrls();
        }
       
        buscarDados();
        buscarQuantidadeTreinoFeito('S');
        buscarQuantidadeTreinoNaoFeito('N');
        dispatch(buscarPrimeiroPeso());
        dispatch(buscarUltimoPeso());
        
    },[])

    return(
        <div>
            <Header />
            <div className="content">
                <Titulo nome="Home">
                    <FiHome color="#fff" size={24} />
                </Titulo> 
                <div>
                    <ToastContainer />
                </div>

                <div className="container py-4">
                    {
                        buscarError
                        ?
                            <div className="container py-4">
                                <div className="col">
                                    Não foi possível carregar os dados   
                                </div>                                                                     
                            </div>
                        :
                            <div className="my-3 p-3 bg-body rounded shadow-sm">     
                                <div className='row'>                           
                                    <div className="text-body-secondary pt-3 col">
                                        <VscPerson color="#000" size={24} />
                                        <span className='ms-2'>{nome}</span>
                                        <span className='ms-2'>{altura}</span>m
                                        <span className='ms-3'>{endereco}</span>
                                        <span className='ms-3 float-end'>
                                            <Link to={`/pessoadados/1`} className="btn btn-info">Editar</Link>
                                        </span>
                                    </div>
                                    <hr />
                                </div>
                                <div className='row'>  
                                    <div className="text-body-secondary pt-3 col">
                                        <LiaWeightHangingSolid color="#000" size={24} />
                                        <span className='ms-2'>Peso Inicial: {primeiroPeso.valor}</span>
                                        <span className='ms-2'>Peso Atual: {ultimoPeso.valor}</span>
                                        <span className='ms-2'>
                                            {
                                                primeiroPeso.valor - ultimoPeso.valor > 0
                                                ?
                                                    <label>Perdeu: {(primeiroPeso.valor - ultimoPeso.valor).toFixed(2)} </label>
                                                :
                                                    <label>Ganhou: {(primeiroPeso.valor - ultimoPeso.valor).toFixed(2)} </label>
                                            }
                                        </span>
                                        <span className='ms-4'>IMC Inicial: {primeiroPeso.imc}</span>
                                        <span className='ms-2'>IMC Atual: {ultimoPeso.imc}</span>
                                        <span className='ms-2'>
                                            {
                                                primeiroPeso.imc - ultimoPeso.imc > 0
                                                ?
                                                    <label>Perdeu: {(primeiroPeso.imc - ultimoPeso.imc).toFixed(2)} </label>
                                                :
                                                    <label>Ganhou: {(primeiroPeso.imc - ultimoPeso.imc).toFixed(2)} </label>
                                            }
                                        </span>
                                        <span className='ms-3 float-end'>
                                            <Link to={`/peso/0`} className="btn btn-info">Ver Pesos</Link>
                                        </span>
                                    </div>
                                    <hr />
                                </div>
                                <div className='row'>                                    
                                    <div className="text-body-secondary pt-3 col">
                                        <GiWeightLiftingUp color="#000" size={24} />
                                        {
                                            treinosFeitos.length > 0
                                            ?
                                                treinosFeitos.map((t,i) => {
                                                    return (
                                                        <>
                                                        <span className='ms-2' >{t.nome}:</span>
                                                        <span className='ms-2' >
                                                            <label>Feitos: {t.quantidade} | Não Feitos: {treinosNaoFeitos[0].quantidade}</label>                                                        
                                                        </span>
                                                        </>
                                                    
                                                    )
                                                })
                                            :
                                             ''                                            
                                        }
                                        <span className='ms-3 float-end'>
                                            <Link to={`/treino`} className="btn btn-info">Ver Treinos</Link>
                                        </span>
                                    </div>
                                </div>
                            </div>
                    }
                </div>                               
            </div>
        </div>
    )
}
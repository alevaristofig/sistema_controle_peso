import { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { FiHome } from 'react-icons/fi';
import { VscPerson } from "react-icons/vsc";
import { LiaWeightHangingSolid } from 'react-icons/lia';
import { GiWeightLiftingUp } from 'react-icons/gi';
import { MdLibraryBooks } from 'react-icons/md';
import { toast, ToastContainer } from 'react-toastify';

import { useDispatch, useSelector } from 'react-redux';

import { buscarPrimeiroPeso, buscarUltimoPeso } from '../../redux/peso/slice';
import usePessoa from "../../hooks/pessoaHook";
import useTreino from '../../hooks/treinoHook';

import TreinoPessoa from '../../compomentes/Treinos/treinoPessoa';

import Header from '../../compomentes/Headers';
import Titulo from '../../compomentes/Titulo';

import 'bootstrap/dist/css/bootstrap.css';

export default function Home() {

    const dispatch = useDispatch();

    const { primeiroPeso, ultimoPeso } = useSelector((rootReducer) => rootReducer.peso);
    const { buscar } = usePessoa();
    const { listarQuantidadeTreinos } = useTreino();
    const navigate = useNavigate();

    const [nome,setNome] = useState('');
    const [altura,setAltura] = useState('');
    const [endereco,setEndereco] = useState('');
    const [treinosFeitos,setTreinosFeitos] = useState([]);
    const [treinosNaoFeitos,setTreinosNaoFeitos] = useState([]);
    const [dadosPessoa] = useState(JSON.parse(sessionStorage.getItem('dadosPessoa')));
    const [buscarError,setBuscarErro] = useState(false);

    useEffect(() => {
        if(sessionStorage.getItem('token') == null) {           
            navigate('/login');
        }

        async function buscarDados() {
            let dados = await buscar(dadosPessoa.id);

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
                                    <div className="text-body-secondary pt-3 col marginLinha">
                                        <VscPerson color="#000" size={24} />
                                        <span className='ms-2'>{nome}</span>
                                        <span className='ms-2'>{altura}</span>
                                        <span className='ms-3'>{endereco}</span>
                                        <span className='ms-3 float-end'>
                                            <Link to={`/pessoadados/1`} className="btn btn-info">Editar</Link>
                                        </span>
                                    </div>                                    
                                    <hr />
                                </div>
                                <div className='row'>  
                                    <div className="text-body-secondary pt-3 col marginLinha">
                                        <LiaWeightHangingSolid color="#000" size={24} />
                                        {
                                             primeiroPeso === ''
                                             ?
                                                <span className='ms-2 fst-italic'>Não existem registros de pesos para exibir</span>
                                             :
                                                <>
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
                                                </>
                                        }                                                                              
                                        <span className='ms-3 float-end'>
                                            <Link to={`/peso/0`} className="btn btn-info">Ver Pesos</Link>
                                        </span>
                                    </div>
                                    <hr />
                                </div>
                                <div className='row'>                                    
                                    <div className="text-body-secondary pt-3 col marginLinha">
                                        <GiWeightLiftingUp color="#000" size={24} className='float-start' />                                                                     
                                        <span className='ms-2 float-start'>
                                            <TreinoPessoa treinoFeitosDados={treinosFeitos} treinoNaoFeitosDados={treinosNaoFeitos} />                                                          
                                        </span>
                                        <span className='ms-3 float-end'>
                                            <Link to={`/treino/0`} className="btn btn-info">Ver Treinos</Link>
                                        </span>
                                    </div>
                                    <hr />
                                </div>
                                <div className='row'>
                                    <div className="text-body-secondary pt-3 col marginLinha">
                                        <MdLibraryBooks color="#000" size={24} className='float-start' />   
                                        <span className='ms-2 float-start'>   
                                            <a className='linkGuia' href='https://bvsms.saude.gov.br/bvs/publicacoes/guia_alimentar_populacao_brasileira_2ed.pdf' target='_blank'>
                                                Guia Alimentar Para a População Brasileira
                                            </a>
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
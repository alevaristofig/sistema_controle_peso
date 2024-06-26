import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { LiaWeightHangingSolid } from 'react-icons/lia';
import InputMask from 'react-input-mask';

import usePeso from '../../hooks/pesoHook';

import { useDispatch } from 'react-redux';
import { atualizar } from '../../redux/peso/slice';

import { toast,  ToastContainer } from 'react-toastify';
import Header from "../../compomentes/Headers";
import Titulo from '../../compomentes/Titulo';
import 'bootstrap/dist/css/bootstrap.css';

export default function EditarPeso() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const {buscar,formatarPeso,calcularImc} = usePeso();
    const [inputPeso, setInputPeso] = useState('');
    const [altura,setAltura] = useState('');
    const [imc, setImc] = useState('');
    const [data,setData] = useState('');
    const [idPessoa,setIdPessoa] = useState('');
    const [loading,setLoading] = useState(true);
    const [buscarError,setBuscarErro] = useState(false);

    useEffect(() => {

        if(sessionStorage.getItem('token') == null) {           
            navigate('/login');
        }

        async function buscarPeso() {
            let result = await buscar(id);

            if(typeof result === 'string') {
                toast.error(result); 
                setBuscarErro(true);
            } else {
                setInputPeso(result.valor);
                setImc(result.imc);
                setAltura(result.pessoa.altura);
                setIdPessoa(result.pessoa.id);

                let dataPeso = new Date(result.dataCadastro)
                setData(dataPeso.toLocaleDateString('pt-BR'));
            }
            
            setLoading(false);
        }

        buscarPeso();
    },[]);


    function salvarDados(e) {
        e.preventDefault();

        if(validar()) {

            let dataBanco = data.split('/');
            let dataAtual = new Date();

            let dataAtualizacao = new Date(dataBanco[2]+'-'+dataBanco[1]+'-'
                                    +dataBanco[0]
                                    +`T${dataAtual.toLocaleTimeString()}`);            

            dispatch(atualizar({
                'id': id,
                'valor': inputPeso,
                'imc': imc,
                'dataCadastro': dataAtualizacao.toISOString(),
                'dataAtualizacao': dataAtual.toISOString(), 
                'pessoa': {
                    'id': idPessoa
                }
            }));

            setIdPessoa('');
            setImc('');

            navigate('/peso/0', {replace: true})
        }
        
    }

    function mascaraPeso(peso) {
       setInputPeso(formatarPeso(peso));
    }

    function calcularImcPessoa(valor) {           
        setImc(calcularImc(valor,altura));  
    }

    function validar() {

        if(inputPeso === '0.00') {
            toast.error("Os campos não podem ficar em branco!");   
            return false;
        }

        return true;
    }

    return(
        <div>
            <Header />
            <div className="content">
                <Titulo nome="Editar Pessoa">
                    <LiaWeightHangingSolid color="#fff" size={24} />
                </Titulo>

                <div>
                    <ToastContainer />
                </div>
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
                                    <Link to="/peso" className="btn btn-info float-start me-4">Voltar</Link>   
                                </div>                                                                     
                            </div>
                        :
                            <div className="container py-4">   
                                <form className="form-perfil" onSubmit={salvarDados}>                                
                                    <div className="row mt-3">
                                        <div className="col">
                                            <label className="form-label">Peso</label>
                                            <label className="form-label obrigatorio">*</label>
                                            <input 
                                                type='text' 
                                                id='inputPeso'
                                                className="form-control"
                                                value={inputPeso}                                             
                                                onChange={(e) => mascaraPeso(e.target.value)} 
                                                onBlur={(e) => calcularImcPessoa(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col">
                                            <label className="form-label">Imc</label>
                                            <label className="form-label obrigatorio">*</label>
                                            <input 
                                                type='text' 
                                                className="form-control"
                                                value={imc}      
                                                readOnly                                                                              
                                            />
                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col">
                                            <label className="form-label">Data</label>
                                            <label className="form-label obrigatorio">*</label>
                                            <InputMask 
                                                mask="99/99/9999" 
                                                name="data" 
                                                value={data}
                                                className="form-control" 
                                                onChange={ event => setData(event.target.value)}
                                                required
                                            /> 
                                        </div>
                                    </div> 
                                    <div className="row mt-3">
                                        <div className="col">
                                            <button 
                                                type="submit" 
                                                className="btn btn-primary" 
                                                onClick={salvarDados}>Atualizar</button>
                                        </div>
                                    </div>  
                                </form>                 
                            </div>
                }
                
            </div>
        </div>
    )
}
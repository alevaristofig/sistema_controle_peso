import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { LiaWeightHangingSolid } from 'react-icons/lia';
import { ToastContainer } from 'react-toastify';
import InputMask from 'react-input-mask';

import { useDispatch } from 'react-redux';
import { salvar } from '../../redux/peso/slice';

import usePeso from '../../hooks/pesoHook';

import Header from "../../compomentes/Headers";
import Titulo from '../../compomentes/Titulo';
import 'bootstrap/dist/css/bootstrap.css';

export default function CadastroPeso() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const inputRef = useRef(null);
    const {formatarPeso} = usePeso();

    const [pesoValor,setPesoValor] = useState('0.00');
    const [imc,setImc] = useState('0.00');
    const [dataCadastro,setDataCadastro] = useState('');
    const [dataAtualizacao,setDataAtualizacao] = useState(null);
    const [dadosPessoa] = useState(JSON.parse(sessionStorage.getItem('dadosPessoa')));

    useEffect(() => {
        if(sessionStorage.getItem('token') == null) {           
            navigate('/login');
        }
    },[])   

    function salvarDados(e) {
        e.preventDefault();

        let dataBanco = dataCadastro.split('/');
        let dataAtual = new Date();

        let dataCadastroBanco = new Date(dataBanco[2]+'-'+dataBanco[1]+'-'
                                    +dataBanco[0]
                                    +`T${dataAtual.toLocaleTimeString()}`);

        let dados = {
            'valor': pesoValor,
            'imc': imc,
            'dataCadastro': dataCadastroBanco.toISOString(),
            'dataAtualizacao': dataAtualizacao,
            'pessoa': {
                'id': dadosPessoa.id
            }
        }

        dispatch(salvar({
            dados
        }));

        setPesoValor('');
        setImc('');
        setDataCadastro('');
        inputRef.current.setInputValue('');        
    }

    function calcularImc(valor) {
        let imcValor = valor / (1.70 * 1.70);
        setImc(imcValor.toFixed(2));        
    }

    function mascaraPeso(peso) {
        setPesoValor(formatarPeso(peso));
     }

    return(
        <div>
            <Header />
            <div className="content">
                <div>
                    <ToastContainer />
                </div>

                <Titulo nome="Cadastro de Peso">
                    <LiaWeightHangingSolid color="#fff" size={24} />
                </Titulo>

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
                                    value={pesoValor}                                                                                 
                                    onChange={(e) => mascaraPeso(e.target.value)} 
                                    onBlur={(e) => calcularImc(e.target.value)}
                                    required
                                />                               
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="col">
                                <label className="form-label">Imc</label>
                                <label className="form-label obrigatorio">*</label>
                                <input 
                                    type="text" 
                                    className="form-control"
                                    value={imc}                                    
                                    required />                                
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="col">
                                <label className="form-label">Data</label>
                                <label className="form-label obrigatorio">*</label>
                                <InputMask 
                                    mask="99/99/9999" 
                                    name="data" 
                                    className="form-control" 
                                    onChange={ event => setDataCadastro(event.target.value)}
                                    ref={inputRef}
                                    required
                                /> 
                            </div>
                        </div> 

                        <div className="row mt-3">
                            <div className="col">
                                <button type="submit" className="btn btn-primary">Cadastrar</button>
                            </div>
                        </div>                        
                    </form>
                </div>
            </div>
        </div>
    )
}
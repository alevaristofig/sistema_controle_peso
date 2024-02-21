import { useState, useEffect } from 'react';
import { LiaWeightHangingSolid } from 'react-icons/lia';
import { ToastContainer } from 'react-toastify';
import InputMask from 'react-input-mask';
import CurrencyInput from 'react-currency-masked-input';

import { useDispatch, useSelector } from 'react-redux';
import { listar } from '../../redux/pessoa/slice';
import { salvar } from '../../redux/peso/slice';
import usePeso from '../../hooks/pesoHook';

import Header from "../../compomentes/Headers";
import Titulo from "../../compomentes/Titulo";
import 'bootstrap/dist/css/bootstrap.css';

export default function CadastroPeso() {

    const dispatch = useDispatch();
    const {pessoas,loading} = useSelector((rootReducer) => rootReducer.pessoa)

    const [nomes,setNomes] = useState([]);
    const [pesoValor,setPesoValor] = useState('0.00');
    const [imc,setImc] = useState('0.00');
    const [data,setData] = useState('');
    const [validar] = usePeso();

    useEffect(() => {
        dispatch(listar());
    },[])

    function salvarDados(e) {
        e.preventDefault();

        let dados = {
            'nome': nomes,
            'valor': pesoValor,
            'imc': imc,
            'data': data
        }
        
        if(validar(dados)) {

            let dataBanco = data.split('/');

            dados.data = dataBanco[2]+'-'+dataBanco[1]+'-'+dataBanco[0];

            dados.pessoa = {
                'id': pessoas[0].id
            }

            dispatch(salvar({
                dados
            }));

           setPesoValor('');
           setImc('');
           setData('');
        }
    }

    function calcularImc(valor) {
        setPesoValor(valor);
        let imcValor = valor / (pessoas[0].altura * pessoas[0].altura);
        setImc(imcValor.toFixed(2));
    }

    return(
        <div>
            <Header />
            <div className="content">
                <div>
                    <ToastContainer />
                </div>

                <Titulo nome="Cadastro de Peso">
                    <LiaWeightHangingSolid color="#000" size={24} />
                </Titulo>

                <div className="container py-4">
                    <form className="form-perfil" onSubmit={salvarDados}>
                        <div className="row mt-3">
                            <div className="col">
                                <label className="form-label">Pessoa</label>
                                <lable className="form-label obrigatorio">*</lable>
                                <select                                     
                                    className="form-select"
                                    value={nomes}
                                    onChange={(e) => setNomes(e.target.value)} 
                                > 
                                    <option value='' disabled>Selecione uma Opção</option>
                                    {
                                        !loading
                                        ?
                                            pessoas.map((p,i) => {
                                                return <option value={p.id} key={i}>{p.nome}</option>
                                            })                                          
                                        :    
                                            ''                                    
                                    }
                                </select>
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="col">
                                <label className="form-label">Peso</label>
                                <lable className="form-label obrigatorio">*</lable>
                                <CurrencyInput 
                                    name="myinput" 
                                    className="form-control"                                    
                                    onBlur={(e) => calcularImc(e.target.value)} 
                                    required />                                
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="col">
                                <label className="form-label">Imc</label>
                                <lable className="form-label obrigatorio">*</lable>
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
                                <lable className="form-label obrigatorio">*</lable>
                                <InputMask 
                                    mask="99/99/9999" 
                                    name="data" 
                                    className="form-control" 
                                    onChange={ event => setData(event.target.value)}
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
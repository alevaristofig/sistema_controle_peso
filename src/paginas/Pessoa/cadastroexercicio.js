import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { LiaRunningSolid  } from 'react-icons/lia';

import Header from "../../compomentes/Headers";
import Titulo from "../../compomentes/Titulo";
import 'bootstrap/dist/css/bootstrap.css';

export default function CadastroExercicio() {

    const [nome,setNome] = useState('');
    const [frequencia,setFrequencia] = useState('');
    const [tempo,setTempo] = useState('');

    return(
        <div>
            <Header />
            <div className="content">
                <div>
                    <ToastContainer />
                </div>

                <Titulo nome="Cadastro de Exercícios">
                    <LiaRunningSolid color="#000" size={24} />
                </Titulo>

                <div className="container py-4">
                    <form className="form-perfil">
                        <div className="row mt-3">
                            <div className="col">
                                <label className="form-label">Nome</label>
                                <lable className="form-label obrigatorio">*</lable>
                                <input 
                                    type='text'
                                    className="form-control"                                  
                                    onBlur={(e) => setNome(e.target.value)} 
                                    required 
                                />                                
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="col">
                                <label className="form-label">Frequência(em semanas)</label>
                                <lable className="form-label obrigatorio">*</lable>
                                <input 
                                    type='text'
                                    className="form-control"                                  
                                    onBlur={(e) => setFrequencia(e.target.value)} 
                                    required 
                                />                                
                            </div>
                        </div>

                        <div className="row mt-3">
                            <div className="col">
                                <label className="form-label">Tempo(em minutos)</label>
                                <lable className="form-label obrigatorio">*</lable>
                                <input 
                                    type='text'
                                    className="form-control"                                  
                                    onBlur={(e) => setTempo(e.target.value)} 
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
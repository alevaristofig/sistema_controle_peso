import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { VscPerson } from "react-icons/vsc";
import { Link } from "react-router-dom";
import Header from "../../compomentes/Headers";
import Titulo2 from '../../compomentes/Titulo/titulo2';

import usePessoa from "../../hooks/pessoaHook";

import 'bootstrap/dist/css/bootstrap.css';

export default function Pessoa() {

    const [pessoas,setPessoas] = useState('');
    const {buscar} = usePessoa();
    const navigate = useNavigate();

    useEffect(() => {    

        if(sessionStorage.getItem('token') == null) {           
            navigate('/login');
        }

        async function buscarPessoa() {
            let pessoa = [await buscar(1)];            
            setPessoas(pessoa);
        }
        
        buscarPessoa();

    },[]);


    return(
        <div>
            <Header />
            <div className="content">
                <Titulo2 nome="Pessoa">
                    <VscPerson color="#fff" size={24} />
                </Titulo2>

                <div className="container py-4">
                    {    
                                     
                        //pessoas.length == 0
                        pessoas == ''
                        ?
                            <div className="row mt-4">
                                <div className="col">
                                    <span>Nenhuma pessoa encontrada </span>                                    
                                </div>
                            </div>
                            
                        :
                            <div className="row mt-4">
                            <div className="col">
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>                                        
                                            <th scope="col">Nome</th>
                                            <th scope="col">Altura</th>
                                            <th scope="col">E-mail</th>
                                            <th scope="col">Endereço</th> 
                                            <th>#</th>                                                                              
                                        </tr>
                                    </thead>

                                    <tbody>
                                    {                                        
                                        pessoas.map((p,i) => {
                                            return(
                                                <tr key={i}>
                                                    <td>{p.nome}</td>
                                                    <td>{p.altura}</td>
                                                    <td>{p.email}</td>
                                                    <td>{p.endereco}</td>
                                                    <td>
                                                        <Link to={`/pessoadados/${p.id}`} className="btn btn-info">Editar</Link>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    }                    
                </div>
            </div>
        </div>
    )
}
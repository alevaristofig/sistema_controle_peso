import { useState } from "react";

import { VscPerson } from "react-icons/vsc";

import Header from "../../compomentes/Headers"
import Titulo from "../../compomentes/Titulo"

import './pessoa.css';

export default function Pessoa() {
    const [nome,setNome] = useState('');
    const [email,setEmail] = useState('');
    const [altura,setAltura] = useState('');
    const [endereco,setEndereco] = useState('');


    return(
        <div>
            <Header />
            <div className="content">
                <Titulo nome="Pessoa">
                    <VscPerson color="#000" size={24} />
                </Titulo>

                <div className="container">
                    <form className="form-perfil">
                        <label>Nome</label>
                        <input 
                            type="text" 
                            onChange={(e) => setNome(e.target.value)} 
                        />      

                        <label>E-mail</label>
                        <input 
                            type="text" 
                            onChange={(e) => setEmail(e.target.value)} 
                        /> 

                        <label>Altura</label>
                        <input 
                            type="text" 
                            onChange={(e) => setAltura(e.target.value)} 
                        />   

                        <label>Endereço</label>
                        <input 
                            type="text" 
                            onChange={(e) => setAltura(e.target.value)} 
                        />                     
                    </form>
                </div>
            </div>
        </div>
    )
}
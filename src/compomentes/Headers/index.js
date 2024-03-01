import { Link } from 'react-router-dom';
import { FiHome } from 'react-icons/fi';
import { VscPerson } from "react-icons/vsc";
import { LiaWeightHangingSolid, LiaRunningSolid  } from 'react-icons/lia';
import { GiWeightLiftingUp } from 'react-icons/gi';

import './header.css';
import avatarImg from '../../assets/avatar.png';

export default function Header(){
    return (
        <div className='sidebar'>
            <div>
                <img src={avatarImg} alt='Foto do Usuário'    />            
            </div>

            <Link to="/">
                <FiHome color="#fff" size={24} /> Home
            </Link>

            <Link to="/pessoa">
                <VscPerson color="#fff" size={24} /> Pessoa
            </Link>

            <Link to="/peso">
                <LiaWeightHangingSolid color="#fff" size={24} /> Peso
            </Link>

            <Link to="/exercicio">
                <LiaRunningSolid  color="#fff" size={24} /> Exercício
            </Link>

            <Link to="/treino">
                <GiWeightLiftingUp  color="#fff" size={24} /> Treino
            </Link>
        </div>
    )
}
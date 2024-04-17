import { Link } from 'react-router-dom';
import { FiHome } from 'react-icons/fi';
import { VscPerson } from "react-icons/vsc";
import { LiaWeightHangingSolid, LiaRunningSolid  } from 'react-icons/lia';
import { GiWeightLiftingUp } from 'react-icons/gi';
import { FaBowlFood } from 'react-icons/fa6';
import { BiFoodMenu } from "react-icons/bi";
import { CiMedicalClipboard } from "react-icons/ci";

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

            <Link to="/peso/0">
                <LiaWeightHangingSolid color="#fff" size={24} /> Peso
            </Link>

            <Link to="/exercicio/0">
                <LiaRunningSolid  color="#fff" size={24} /> Exercício
            </Link>

            <Link to="/treino/0">
                <GiWeightLiftingUp  color="#fff" size={24} /> Treino
            </Link>

            <Link to="/alimento/0">
                <FaBowlFood  color="#fff" size={24} /> Alimento
            </Link>

            <Link to="/dieta/0">
                <BiFoodMenu  color="#fff" size={24} /> Dieta
            </Link>

            <Link to="/historicomedico/0">
                <CiMedicalClipboard color='#fff' size={24} /> Histórico Médico
            </Link>
        </div>
    )
}
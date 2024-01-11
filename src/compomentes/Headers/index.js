import { Link } from 'react-router-dom';
import { FiHome } from 'react-icons/fi';

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
        </div>
    )
}
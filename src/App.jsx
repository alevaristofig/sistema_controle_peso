import { createBrowserRouter } from 'react-router-dom';

import Home from './paginas/Home';
import Pessoa from './paginas/Pessoa';
import CadastroPessoa from './paginas/Pessoa/cadastropessoa';
import PessoaDados from './paginas/Pessoa/pessoadados';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/pessoa',
    element: <Pessoa />
  },
  {
    path: '/cadastropessoa',
    element: <CadastroPessoa />
  },
  {
    path: 'pessoadados/:id',
    element: <PessoaDados />
  }
])

export { router };

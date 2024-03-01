import { createBrowserRouter } from 'react-router-dom';

import Home from './paginas/Home';
import Pessoa from './paginas/Pessoa';
import CadastroPessoa from './paginas/Pessoa/cadastropessoa';
import PessoaDados from './paginas/Pessoa/pessoadados';
import Peso from './paginas/Peso';
import CadastroPeso from './paginas/Peso/cadastroPeso';
import EditarPeso from './paginas/Peso/editarPeso';
import Exercicio from './paginas/Exercicio';
<<<<<<< HEAD
import CadastroExercicio from './paginas/Pessoa/cadastroexercicio';
=======
import CadastroExercicio from './paginas/Exercicio/cadastroexercicio';
import EditarExercicio from './paginas/Exercicio/editarExercicio';
>>>>>>> f016b46caf9b4255a5ae925747d046d07c9e4985
import Treino from './paginas/Treino';

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
  },
  {
    path: '/peso',
    element: <Peso />
  },
  {
    path: '/cadastropeso',
    element: <CadastroPeso />
  },
  {
    path: '/editarpeso/:id',
    element: <EditarPeso />
  },
  {
    path: '/exercicio',
    element: <Exercicio />
  },
  {
    path: '/cadastroexercicio',
    element: <CadastroExercicio />
  },
  {
    path: '/editarexercicio/:id',
    element: <EditarExercicio />
  },
  {
    path: '/treino',
    element: <Treino />
  }
])

export { router };

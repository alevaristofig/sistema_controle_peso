import { createBrowserRouter } from 'react-router-dom';

import Login from './paginas/Login';
import Home from './paginas/Home';
import Pessoa from './paginas/Pessoa';
import CadastroPessoa from './paginas/Pessoa/cadastropessoa';
import EditarPessoa from './paginas/Pessoa/editarpessoa';
import Peso from './paginas/Peso';
import CadastroPeso from './paginas/Peso/cadastroPeso';
import EditarPeso from './paginas/Peso/editarPeso';
import Exercicio from './paginas/Exercicio';
import CadastroExercicio from './paginas/Exercicio/cadastroexercicio';
import EditarExercicio from './paginas/Exercicio/editarExercicio';
import Treino from './paginas/Treino';
import Alimento from './paginas/Alimento';
import CadastroAlimento from './paginas/Alimento/cadastroalimento';
import EditarAlimento from './paginas/Alimento/editarAlimentos';
import Dieta from './paginas/Dieta';
import CadastroDieta from './paginas/Dieta/cadastrodieta';
import EditarDieta from './paginas/Dieta/editarDieta';
import HistoricoMedico from './paginas/HistoricoMedico';
import CadastroHistoricoMedico from './paginas/HistoricoMedico/cadastrohistoricomedico';
import EditarHistoricoMedico from './paginas/HistoricoMedico/editarHistoricoMedico';
import Logout from './paginas/Logout';
import Senha from './paginas/Senha';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/recuperarsenha',
    element: <Senha />
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
    element: <EditarPessoa />
  },
  {
    path: '/peso/:page',
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
    path: '/exercicio/:page',
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
    path: '/treino/:page',
    element: <Treino />
  },
  {
    path: '/alimento/:page',
    element: <Alimento />
  },
  {
    path: '/cadastroalimento',
    element: <CadastroAlimento />
  },
  {
    path: '/editaralimento/:id',
    element: <EditarAlimento />
  },
  {
    path: '/dieta/:page',
    element: <Dieta />
  },
  {
    path: '/cadastrodieta',
    element: <CadastroDieta />
  },
  {
    path: '/editardieta/:id',
    element: <EditarDieta />
  },
  {
    path: '/historicomedico/:page',
    element: <HistoricoMedico />
  },
  {
    path: '/cadastrohistoricomedico',
    element: <CadastroHistoricoMedico />
  },
  {
    path: '/editarhistoricomedico/:id',
    element: <EditarHistoricoMedico />
  },
  {
    path: '/logout',
    element: <Logout />
  }
])

export { router };

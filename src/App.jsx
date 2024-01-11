import { createBrowserRouter } from 'react-router-dom';

import Home from './paginas/Home';
import Pessoa from './paginas/Pessoa';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/pessoa',
    element: <Pessoa />
  }
])

export { router };

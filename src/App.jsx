import { createBrowserRouter } from 'react-router-dom';

import Home from './paginas/Home';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  }
])

export { router };

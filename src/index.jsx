import React from 'react';
import ReactDom  from 'react-dom/client';
import { router } from './App';
import { RouterProvider } from 'react-router-dom';
import { store } from './redux/store';
import { Provider } from 'react-redux';

import './index.css';

ReactDom.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
      <RouterProvider router={router} />
  </Provider>
)
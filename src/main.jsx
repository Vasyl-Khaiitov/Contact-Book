import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App/App';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { StyledEngineProvider } from '@mui/material/styles';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <StyledEngineProvider injectFirst>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </StyledEngineProvider>
  </Provider>,
);

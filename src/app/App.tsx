import { AppRoutes } from './routes';
import { UsuarioLogadoProvider } from './shared/contexts';

import './App.css';

export const App = () => {
  return (
    <div className="App">
      <UsuarioLogadoProvider>
        <AppRoutes />
      </UsuarioLogadoProvider>
    </div>
  );
}

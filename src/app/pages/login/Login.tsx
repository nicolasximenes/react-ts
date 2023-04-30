import { useCallback, useMemo, useRef, useState } from 'react';

import { InputLogin } from './components/InputLogin';
import { ButtonLogin } from './components/ButtonLogin';
import { useUsuarioLogado } from '../../shared/hooks';

export const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const inputPasswordRef = useRef<HTMLInputElement>(null);

  const emailLength = useMemo(() => {
    console.log('Executou');
    return email.length * 10;
  }, [email.length]);

  // useEffect(() => {
  //   console.log(email);
  // }, [email]);

  // useEffect(() => {
  //   console.log(password);
  // }, [password]);

  const handleEntrar = useCallback(() => {
    console.log(`email: ${email}`);
    console.log(`senha: ${password}`);
  }, [email, password]);

  const { nomeDoUsuario } = useUsuarioLogado();

  return (
    <div>

      <div className="mb-3">
        <h1>Login</h1>
        <h2>{nomeDoUsuario}</h2>
      </div>
      
      <form>
        
        <div className="mb-3">
          <p>Quantidade de caracteres no email: {emailLength}</p>
          <small>Simulando uma operação complexa com o <strong>useMemo</strong></small>
        </div>
        
        <div className="mb-3">
          <InputLogin
            label="Email"
            type="email"
            value={email}
            onChange={newValue => setEmail(newValue)}
            onPressEnter={() => inputPasswordRef.current?.focus()}
          />
        </div>
        
        <div className="mb-3">
          <InputLogin
            label="Senha"
            type="password"
            value={password}
            ref={inputPasswordRef}
            onChange={newValue => setPassword(newValue)}
          />
        </div>

        <div className="mb-3">
          <ButtonLogin type="button" onClick={handleEntrar}>
            Entrar
          </ButtonLogin>
        </div>
        

      </form>
      
    </div>
  );
}
import { useState } from 'react';

export const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleEntrar = () => {
    console.log(`email: ${email}`);
    console.log(`senha: ${password}`);
  }

  return (
    <div>
      <h1>Entrar</h1>
      
      <form>
        <div>
          <label htmlFor="email">Email</label>
          <br />
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
        </div>

        <br />
        
        <div>
          <label htmlFor="senha">Senha</label>
          <br />
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </div>

        <br />
        <button type="button" onClick={handleEntrar}>Entrar</button>
        
      </form>
    </div>
  );
}
// src/Telas/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    setIsError(false);

    setTimeout(() => {
      setIsLoading(false);
      
      if (email === "teste@site.com" && password === "123456") {
        navigate('/home');
        setIsError(false);
      } else { 
        setMessage("Erro: Email ou senha inválidos. Tente 'teste@site.com' / '123456'.");
        setIsError(true);
      }
    }, 2000);
  };

  return (
    <div className="login-container">
      {/* O resto do seu JSX de formulário... (como no código que enviei) */}
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-title">Acesse o Sistema</h2>
        
        {message && (
          <div className={`message-box ${isError ? 'error' : 'success'}`}>
            {message}
          </div>
        )}

        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Senha</label>
          <input
            id="password"
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
          />
        </div>

        <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? (
                <>
                <svg className="spinner" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Carregando...
                </>
            ) : (
                'Entrar'
            )}
        </button>
        
        <div className="footer-links">
          <a href="/forgot-password">Esqueceu a senha?</a>
          <a href="/register">Criar conta</a>
        </div>
      </form>
    </div>
  );
}

export default Login;
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

const  LoginPage = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [usuario, setUsuario] = useState(null);
  const [logado, setLogado] = useState(false);
  const navigate = useNavigate();

  useEffect(()=>{
    if (logado) {
      navigate("/");
    }
  },);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSenhaChange = (e) => {
    setSenha(e.target.value);
  };

  const handleLogin = async () => {
    const loggedIn = await login();
    if (loggedIn) {
      setLogado(true);
      navigate('/');
    }
  };
  
  const login = async () => {
    try {
      const response = await axios.post(apiUrl + 'user/login', {
        email: email,
        senha: senha,
      });
      setUsuario(response.data.usuario);
      localStorage.setItem('usuario', JSON.stringify(response.data.usuario)); 
      localStorage.setItem('token', response.data.usuario.token); 
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  return (
    <Container className="d-flex justify-content-center align-items-center mt-5"> 
      <Card className="w-50"> 
        <Card.Body>
          <Form>
              <Form.Group controlId='formBasicEmail'>
                <Form.Label>Email: </Form.Label>
                <Form.Control type='text' placeholder='insira o seu e-mail' value={email} onChange={handleEmailChange}/>
              </Form.Group>

              <Form.Group controlId='formBasicPassword'>
                <Form.Label>Senha: </Form.Label>
                <Form.Control type='password' placeholder='digite sua senha' value={senha} onChange={handleSenhaChange}/>
              </Form.Group>

              <Button className='mt-3' type='button' onClick={handleLogin} variant='primary'>Entrar</Button>
          </Form>
        </Card.Body>
      </Card>
      {usuario && (
        <div>
          <p>Email: {usuario.email}</p>
        </div>
      )}
    </Container>
  );
}

export default LoginPage;

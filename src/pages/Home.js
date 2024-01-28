import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const apiUrl = process.env.REACT_APP_API_URL;

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState('');
  const [searchedUser, setSearchedUser] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    const usuario = localStorage.getItem('usuario');
    const token = localStorage.getItem('token');
    if (usuario && token) {
      setIsLoggedIn(true);
    }
  }, []);


  const handleListUsers = async () => {
    try {
      const response = await axios.get(apiUrl+ 'users'); 
      setUsers(response.data.users);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  };

  const handleSearchByEmail = async () => {
    try {
      const response = await axios.get( apiUrl+ `user/${email}`); 
      setSearchedUser(response.data.usuario);
    } catch (error) {
      console.error('Erro ao buscar usuário por email:', error);
    }
  };

  const handleLogin = () => {
    navigate('/login')
  };

  const handleClearSearch = () => {
    setSearchedUser(null); // Limpa o resultado da busca anterior
  };

  return (
    <div className="container mt-4">
      <h1>Página Inicial</h1>
      {!isLoggedIn ? (
        <Button variant="primary" onClick={handleLogin}>
          Fazer Login
        </Button>
      ) : (
        <Card className="mt-4">
          <Card.Body>
            <Card.Title>Opções do Usuário</Card.Title>
            <Button variant="primary" className="mr-2" onClick={handleListUsers}>
              Listar Usuários
            </Button>
            <Button variant="primary" onClick={handleClearSearch}> {/* Adiciona a função handleClearSearch ao botão */}
              Buscar Usuário por Email
            </Button>
            {searchedUser && (
              <div className="mt-4">
                <h5>Usuário Encontrado:</h5>
                <p>Email: {searchedUser.email}, Criado em: {searchedUser.createdAt}</p>
              </div>
            )}
            {users.length > 0 && (
              <div className="mt-4">
                <h5>Lista de Usuários:</h5>
                <ul>
                  {users.map(user => (
                    <li key={user.id}>
                        Email: {user.email}, Criado em: {user.createdAt}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {searchedUser === null && users.length === 0 && (
              <div className="mt-4">
                <p>Nenhum usuário encontrado.</p>
              </div>
            )}
            <Form className="mt-4">
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Digite o email:</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Digite o email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" onClick={handleSearchByEmail}>
                Buscar
              </Button>
            </Form>
          </Card.Body>
        </Card>
      )}
    </div>
  );
}

export default Home;

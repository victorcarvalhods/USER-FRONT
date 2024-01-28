import React, { useState } from "react";
import { Container, Card, Button, Form, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [emailValido, setEmailValido] = useState(true);
  const [senhaValida, setSenhaValida] = useState(true);
  const [senhaConfirmada, setSenhaConfirmada] = useState(true);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailValido(true);
  };

  const handleSenhaChange = (e) => {
    setSenha(e.target.value);
    setSenhaValida(true);
  };

  const handleConfirmarSenhaChange = (e) => {
    setConfirmarSenha(e.target.value);
    setSenhaConfirmada(true);
  };

  const handleRegister = async () => {
    if (!validateEmail(email)) {
      setEmailValido(false);
      return;
    }

    if (senha.length < 8) {
      setSenhaValida(false);
      return;
    }

    if (senha !== confirmarSenha) {
      setSenhaConfirmada(false);
      return;
    }

    try {
      const response = await axios.post(apiUrl + 'user/criar', {
        email: email,
        senha: senha,
      });
      localStorage.setItem('usuario', JSON.stringify(response.data.usuario)); 
      localStorage.setItem('token', response.data.usuario.token); 
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const validateEmail = (email) => {
    // Simple email validation
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  return (
    <Container className="d-flex justify-content-center align-items-center mt-5">
      <Card className="w-50">
        <Card.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email: </Form.Label>
              <Form.Control
                type="text"
                placeholder="insira o seu e-mail"
                value={email}
                onChange={handleEmailChange}
              />
              {!emailValido && <Alert variant="danger">Email inválido</Alert>}
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Senha: </Form.Label>
              <Form.Control
                type="password"
                placeholder="digite sua senha"
                value={senha}
                onChange={handleSenhaChange}
              />
              {!senhaValida && <Alert variant="danger">A senha deve ter pelo menos 8 caracteres</Alert>}
            </Form.Group>

            <Form.Group controlId="formBasicConfirmPassword">
              <Form.Label>Confirmar Senha: </Form.Label>
              <Form.Control
                type="password"
                placeholder="confirme sua senha"
                value={confirmarSenha}
                onChange={handleConfirmarSenhaChange}
              />
              {!senhaConfirmada && <Alert variant="danger">As senhas não coincidem</Alert>}
            </Form.Group>

            <Button
              className="mt-3"
              type="button"
              onClick={handleRegister}
              variant="primary"
            >
              Registrar
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default RegisterPage;

import React, { useEffect, useState } from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const IndexPage = () => {
    const navigate = useNavigate();
    const [logado, setLogado] = useState(false);

    useEffect(() => {
        const usuario = JSON.parse(localStorage.getItem('usuario'));
        if (usuario && usuario.token) {
            setLogado(true);
        } else {
            setLogado(false);
        }
    }, []);

    const handleLoginNavigate = () => {
        navigate('/login');
    };

    const handleLogout = () => {
        localStorage.removeItem('usuario');
        localStorage.removeItem('token');
        setLogado(false);
    }

    const handleRegistroNavigate = () => {
        navigate('/registro');
    };

    return (
        <Container className="d-flex justify-content-center align-items-center mt-5">
            {logado ? (
                <Card className='mt-5'>
                    <Card.Body>Olá {localStorage.getItem('usuario')}</Card.Body>
                    <Button type='button' variant='primary' onClick={handleLogout}>Logout</Button>
                </Card>
            ) : (
                <Card className='mt-5'>
                    <h3>Escolha uma das opções abaixo para realizar o login</h3>
                    <Container className='space-between'>
                        <Row>
                            <Col>
                                <Button type='button' variant='primary' onClick={handleLoginNavigate}>Login</Button>
                            </Col>
                            <Col className=''>
                                <Button type='button' variant='success' onClick={handleRegistroNavigate}>Registrar-se</Button>
                            </Col>
                            
                        </Row>
                    </Container>
                </Card>
            )}
        </Container>
    );
};

export default IndexPage;

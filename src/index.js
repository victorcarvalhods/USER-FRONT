import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import LoginPage from './pages/Login';
import IndexPage from './pages/Home';
import RegisterPage from './pages/Registro';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const root = document.getElementById('root');

// Use createRoot instead of ReactDOM.render
const rootElement = createRoot(root);

rootElement.render(
  <Router>
    <Routes> 
      <Route exact path='/' element={<IndexPage />} /> 
      <Route path='/login' element={<LoginPage />} /> 
      <Route path='/registro' element={<RegisterPage/>}/>
    </Routes> 
  </Router>
);

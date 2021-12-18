import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './Home'
import Wrapped from './Wrapped'

import './index.css';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="wrapped" element={<Wrapped/>} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

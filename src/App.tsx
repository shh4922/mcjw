import React, { useEffect, useState } from 'react';
import { AuthProvider, useAuth } from './AuthContext';
import { Route, Routes } from 'react-router-dom';

import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Header from './components/Header/Header';
import Write from './components/Write/Write';

import './App.css';

function App() {


  return (
    <AuthProvider>
      <div className="App">
        <Header />
        <Routes>
          <Route path='/write' element={<Write />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
        </Routes>

      </div>
    </AuthProvider>

  );
}

export default App;

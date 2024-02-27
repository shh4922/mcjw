import React, { useEffect, useState } from 'react';
import { useAuth } from './context/AuthContext';
import { Route, Routes, useNavigate } from 'react-router-dom';

import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Header from './components/Header/Header';
import Write from './components/Write/Write';
import Mypage from './components/My/Mypage';
import Crew from './components/Crews/Crew';

import './App.css';

import { customAxios } from './api/customApi';
import { User } from './interface/User';
import { API } from './api/config';
import PostDetail from './components/PostDetail/PostDetail';
import Board from './components/Board/Board';
import Update from './components/Update/Update';

function App() {

  const { setIsLogin, setCurrentUser } = useAuth();
  const navigator = useNavigate()

  useEffect(() => {
    if (localStorage.getItem("accessToken") === null) {
      return;
    }
    const fetchUser = async () => {
      try {

        const result = await customAxios.get<User>(`${API.BASE_URL}${API.FETCH_USER}`)
        setIsLogin(true)
        setCurrentUser(result.data)

      } catch (error) {
        if (error === "402") {
          localStorage.removeItem("accessToken")
          setIsLogin(false)
          setCurrentUser(null)
          alert("세션이 만료되었습니다. 다시로그인해주세요.")
          navigator("/login")
        }
      }
    }
    fetchUser()
  }, [])

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<h1>Main임</h1>}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/write' element={<Write />}></Route>
        <Route path='/my' element={<Mypage />}></Route>
        <Route path='/board' element={<Board />}></Route>
        <Route path='/crews' element={<Crew />}></Route>
        <Route path='/detail/:postId' element={<PostDetail />}></Route>
        <Route path='/update/:postId' element={<Update />}></Route>
        <Route path={'*'} element={<h1>이상한곳 들어오셨어요</h1>}></Route>
      </Routes>
    </div>
  );
}

export default App;

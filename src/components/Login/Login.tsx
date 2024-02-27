import React, { useState } from "react";
import "./login.css"
import { Link, useNavigate } from "react-router-dom";
import {API} from "../../api/config"
import { customAxios } from "../../api/customApi";
import { useAuth } from "../../context/AuthContext";
import {User} from "../../interface/User";

function Login() {
    const [userId, setUserId] = useState("")
    const [password, setPassword] = useState("")

    const { setIsLogin, setCurrentUser, currentUser } = useAuth();
    const navigator = useNavigate()
    
    const handleUserId = (e: React.ChangeEvent<HTMLInputElement>) => {
        const copyUserId = e.target.value
        setUserId(copyUserId)
    }
    const handleUserPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        const copyUserPassword = e.target.value
        setPassword(copyUserPassword)
    }
    
    // 로그인버튼 클릭
    const handleLogin = () => {
        if(userId === "" || password ==="") {
            alert("입력 후 시도하세요")
            return
        }   
        login()
    }
    
    // 로그인 Post
    const login = async () => {
        try {
            const body = await { userid: userId, password: password}
            const result = await customAxios.post(`${API.BASE_URL}${API.LOGIN}`, body)

            if(result.status === 200) {
                localStorage.setItem("accessToken", result.data.accessToken)
                setIsLogin(true) 
                setCurrentUser(result.data.user)
                navigator("/")
            }

        } catch(error) {
            console.error(error)
        }
    }

    return (
        <div className="login">
            <div className="login-content">
                <span className="login-title">LoginPage</span>
                <input defaultValue={userId} placeholder="McId" onChange={handleUserId}></input>
                <input defaultValue={password} placeholder="password" onChange={handleUserPassword}></input>
                <span>계정이 없다면 매니저에게 문의해주세요.</span>
                <button onClick={handleLogin}>login</button>
            </div>
        </div>
    )
}

export default Login
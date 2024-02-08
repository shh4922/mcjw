import React, { useState } from "react";
import "./login.css"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {API} from "../../api/config"
import { customAxios } from "../../api/customApi";
import { useAuth } from "../../AuthContext";
import User from "../../interface/User";

function Login() {
    const { isLogin, user, setIsLogin, setUser } = useAuth();

    const [userId, setUserId] = useState("")
    const [password, setPassword] = useState("")
    const navigator = useNavigate()
    
    const handleUserId = (e: React.ChangeEvent<HTMLInputElement>) => {
        const copyUserId = e.target.value
        setUserId(copyUserId)
    }
    const handleUserPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        const copyUserPassword = e.target.value
        setPassword(copyUserPassword)
    }
    
    const handleLogin = () => {
        if(userId === "" || password ==="") {
            alert("입력 후 시도하세요")
            return
        }
        const login = async () => {
            try {
                const body = await { userid: userId, password: password}
                const result = await customAxios.post(`${API.BASE_URL}${API.LOGIN}`, body)

                localStorage.setItem("accessToken", result.data.accessToken)
                
                const userData: User = {
                    name: result.data.user.name,
                    userid: result.data.user.userid,
                    auth: result.data.user.auth,
                }
                
                await setIsLogin(`${localStorage.getItem("accessToken")}`)
                
                setUser(userData)
                navigator("/my")
            } catch(error) {
                if(error === 403) {
                    alert("유저정보가 없습니다.")
                }
                
            }

        }
        login()
    }
    return (
        <div className="wrap">
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
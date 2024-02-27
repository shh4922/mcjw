import React, { ReactElement, useEffect, useState } from "react";
import "./register.css"
import { customAxios } from "../../api/customApi"
import { API } from "../../api/config"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Register() {
    const [userName, setUserName] = useState("")
    const [userId, setUserId] = useState("")
    const [password, setPassword] = useState("")
    const [auth, setAuth] = useState("crew")

    const { currentUser } = useAuth()
    const navigator = useNavigate()

    const handleUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
        const copyUserName = e.target.value
        setUserName(copyUserName)
    }
    const handleUserId = (e: React.ChangeEvent<HTMLInputElement>) => {
        const copyUserId = e.target.value
        setUserId(copyUserId)
    }
    const handleUserPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        const copyUserPassword = e.target.value
        setPassword(copyUserPassword)
    }
    const handleUserRank = (e: React.ChangeEvent<HTMLInputElement>) => {
        const copyAuth = e.target.value
        setAuth(copyAuth)
    }

    const handleRegister = () => {
        if (userName === "" || userId === "" || password === "" ) {
            alert("입력을 확인헤주세요")
            return
        }
        register()
    }

    const register = async () => {        
        try {
            const body = {
                name: userName,
                userId: userId,
                password: password,
                auth: auth
            }

            const result = await customAxios.post(`${API.BASE_URL}${API.REGISTER}`,body)
            if(result.status === 201) {
                alert("중복된 계정이 있습니다.")
                return
            } else if(result.status === 200) {
                alert("가입 완료 되었습니다.")
                navigator("/crews")
            }
            
        } catch (error) {
            console.log(error)
        }
    }
    // 회원가입은 manager || storemanager 만 가입 가능
    // 권한 확인을 위해.
    useEffect(() => {
        if(currentUser?.auth === "crew") {
            alert("권한이없습니다")
            navigator("/")
            return
        }
    },[])

    return (
        <div className="register">
            <div className="register-content">
                <span className="register-title">RegisterPage</span>
                <input defaultValue={userName} placeholder="name" onChange={handleUserName}></input>
                <input defaultValue={userId} placeholder="McId" onChange={handleUserId}></input>
                <input defaultValue={password} placeholder="password" onChange={handleUserPassword} type="password"></input>
                <div className="radio">
                    <input type="radio" name="rank" value="manager" onChange={handleUserRank}/>manager
                    <input type="radio" name="rank" value="crew" onChange={handleUserRank} defaultChecked/>crew
                </div>
                <button onClick={handleRegister}>Register</button>
            </div>
            
        </div>
    )
}

export default Register
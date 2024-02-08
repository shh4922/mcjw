import React, { ReactElement, useState } from "react";
import "./register.css"
import { customAxios } from "../../api/customApi"
import {API} from "../../api/config"

function Register() {
    const [userName, setUserName] = useState("")
    const [userId, setUserId] = useState("")
    const [password, setPassword] = useState("")
    
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

    const handleRegister = () => {
        if(userName === "" || userId === "" || password === "") {
            alert("입력을 확인헤주세요")
            return
        }
        
        const register = async () => {
            try {
                const result = await customAxios.post(API.REGISTER)

            } catch(error) {
                console.log(error)    
            }
        }

        register()
    }

    return (
        <div className="register">
            <div className="register-content">
                <span className="register-title">RegisterPage</span>
                <input defaultValue={userName} placeholder="name" onChange={handleUserName}></input>
                <input defaultValue={userId} placeholder="McId" onChange={handleUserId}></input>
                <input defaultValue={password} placeholder="password" onChange={handleUserPassword} type="password"></input>
                <button onClick={handleRegister}>Register</button>
            </div>
        </div>
    )
}

export default Register
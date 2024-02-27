import React, { useEffect } from "react";
import "./header.css"
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Header() {
    // 로그인 유무에 따라 로그아웃&로그인을 보여주기 위해
    // 현재 유저의 권한에 따라 links를 다르게 보여줘야 하기 위해
    const { isLogin, setIsLogin, currentUser, setCurrentUser } = useAuth()
    const navigater = useNavigate()
    
    const handelLogout = () => {
        localStorage.removeItem("accessToken")
        setIsLogin(false)
        setCurrentUser(null)
        navigater("/")
    }

    const renderContent = () => {
        switch (currentUser?.auth) {
            case "storemanager":
                return (
                    <>
                        <li><NavLink to="/board?page=1">Board</NavLink></li>
                        <li><NavLink to="/crews">crews</NavLink></li>
                        <li><NavLink to="/register">register</NavLink></li>
                    </>
                )
            case "manager":
                return (
                    <>
                        <li><NavLink to="/crews">crews</NavLink></li>
                        <li><NavLink to="/register">register</NavLink></li>
                    </>
                )

            case "crew":
                return (
                    <>
                        <li><NavLink to={"/write"}>write</NavLink></li>
                        <li><NavLink to={"/my?page=1"} >my</NavLink></li>
                    </>
                )
            default:
                return null
        }
    }


    return (
        <header>
            <div className="content">
                <nav>
                    <div className="nav-left">
                        <h1>MCJW</h1>
                        <span>_익명보장</span>
                    </div>

                    <div className="nav-right">
                        {
                            isLogin === false
                                ? (<Link to={"/login"} className="login">login</Link>)
                                : (<button className="logout" onClick={handelLogout}>Logout</button>)
                        }
                    </div>
                </nav>
                <ul className="links">
                    {renderContent()}
                </ul>
            </div>
        </header>
    )
}

export default Header
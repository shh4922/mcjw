import React, { useEffect } from "react";
import "./header.css"
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../AuthContext";

function Header() {
    const { isLogin, setIsLogin, user } = useAuth()

    const handelLogout = () => {
        setIsLogin("");
        localStorage.removeItem("accessToken")
    }

    const renderContent = () => {
        switch (user?.auth) {
            case "storemanager":
                return (
                    <>
                        <li><NavLink to="/board">Board</NavLink></li>
                        <li><NavLink to="/crews">crews</NavLink></li>
                    </>
                )
            case "manager":
                return <li><NavLink to="/crews">crews</NavLink></li>
            case "crew":
                return (
                    <>
                        <li><NavLink to={"/write"}>write</NavLink></li>
                        <li><NavLink to={"/my"} >my</NavLink></li>
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
                        <h1>MCjw</h1>
                        <span>_익명보장</span>
                    </div>

                    <div className="nav-right">
                        {
                            isLogin === null || isLogin === ""
                                ? (<Link to={"/login"} className="login">login</Link>)
                                : ( <button className="logout" onClick={handelLogout}>Logout</button>)
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
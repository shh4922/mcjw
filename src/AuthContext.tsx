import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { customAxios } from './api/customApi';
import { API } from './api/config';
import { useNavigate } from 'react-router-dom';
import User from './interface/User';

// 인터페이스를 정의하여 Context의 타입을 명시
interface AuthContextProps {
    isLogin: string|null;
    user: User|null
    setIsLogin: React.Dispatch<React.SetStateAction< string|null >>;
    setUser: React.Dispatch<React.SetStateAction< User|null >>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isLogin, setIsLogin] = useState<string|null>(localStorage.getItem("accessToken"));
    const [user, setUser] = useState<User|null>(null);
    const navigator = useNavigate()

    const contextValue: AuthContextProps = {
        isLogin,
        user,
        setIsLogin,
        setUser,
    };

    useEffect(() => {
        if (isLogin === null || isLogin === undefined) {
            console.log("return")
            return;
        } 
        const fetchUser = async () => {    
            try {
                const result = await customAxios.get(`${API.BASE_URL}${API.FETCH_USER}`)
                setUser(result.data)
                console.log(user)
            } catch (error) {
                if (error === "402") {
                    setIsLogin(null)
                    alert("세션이 만료되었습니다. 다시로그인해주세요.")
                    navigator("/login")
                }
            }
        }
        fetchUser()
    }, [])

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextProps => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
};
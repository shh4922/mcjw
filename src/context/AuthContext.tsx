import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import {User} from '../interface/User';

// 인터페이스를 정의하여 Context의 타입을 명시
interface AuthContextProps {
    isLogin: boolean;
    currentUser: User|null
    setIsLogin: React.Dispatch<React.SetStateAction< boolean >>;
    setCurrentUser: React.Dispatch<React.SetStateAction< User|null >>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = (): AuthContextProps => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isLogin, setIsLogin] = useState<boolean>(false);
    const [currentUser, setCurrentUser] = useState<User|null>(null);
    
    const navigator = useNavigate()

    const contextValue: AuthContextProps = {
        isLogin,
        currentUser,
        setIsLogin,
        setCurrentUser,
    };


    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

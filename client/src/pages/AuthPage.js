import { useState } from "react";
import "./AuthPage.css";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="auth-page">
            <div className="auth-box">
                <div className="auth-tabs">
                    <button
                        className={isLogin ? "tab active" : "tab"}
                        onClick={() => setIsLogin(true)}
                    >
                        Login
                    </button>
                    <button
                        className={!isLogin ? "tab active" : "tab"}
                        onClick={() => setIsLogin(false)}
                    >
                        Register
                    </button>
                </div>

                {isLogin ? <LoginForm /> : <RegisterForm />}
            </div>
        </div>
    );
}
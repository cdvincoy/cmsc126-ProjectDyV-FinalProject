import { useState } from "react";
import "./AuthPage.css";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import facebookIcon from "../assets/facebook.svg";
import messengerIcon from "../assets/messenger.svg";
import githubIcon from "../assets/github.svg";
import linkedinIcon from "../assets/linkedin.svg";
import logoImg from "../assets/LIKHA.png";
import heroImg from "../assets/hero.jpg";

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="auth-page">
            <div className="auth-main">
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

                <div className="auth-image">
                    <img src={heroImg} alt="Hero" />
                </div>
            </div>

            <footer className="auth-footer">
                <div className="footer-left">
                    <div className="footer-logo">
                        <img src={logoImg} alt="Likha" />
                    </div>
                    <div className="footer-copy">© 2026 Likha. All Rights Reserved</div>
                </div>
                <div className="footer-icons">
                    <img src={facebookIcon} alt="Facebook" />
                    <img src={messengerIcon} alt="Messenger" />
                    <img src={githubIcon} alt="GitHub" />
                    <img src={linkedinIcon} alt="LinkedIn" />
                </div>
            </footer>
        </div>
    );
}
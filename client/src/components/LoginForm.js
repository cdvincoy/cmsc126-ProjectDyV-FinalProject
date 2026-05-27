import { useState } from "react";

function LoginForm() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Login submitted:", formData);
    };

    return (
        <div className="form-container">
            <h2>Welcome Back!</h2>
            <p className="subtitle">Please log in to continue.</p>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    name="email"
                    placeholder="email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="password"
                    value={formData.password}
                    onChange={handleChange}
                />
                <span className="forgot-password">Forgot password?</span>
                <button type="submit">Log in</button>
            </form>
        </div>
    );
}

export default LoginForm;
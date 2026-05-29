import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginForm() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.message || "Login failed");
                return;
            }

            console.log("Logged in user:", data);
            localStorage.setItem("user", JSON.stringify(data)); // ← ADD THIS

            alert("Login successful!");

            navigate("/dashboard");

        } catch (err) {
            console.error(err);
        }
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

import { useState } from "react";
import { useNavigate } from "react-router-dom";

function RegisterForm() {
    const [formData, setFormData] = useState({
        name: "",
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
            const response = await fetch("http://localhost:5000/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
        

        const data = await response.json();
        console.log(data);
        alert("Registered successfully!");
        
        setFormData({
            name: "",
            email: "",
            password: "",
        });
        navigate("/");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="form-container">
            <h2>No account yet?</h2>
            <p className="subtitle">Build. Showcase. Connect. Register now!</p>
            <form onSubmit={handleSubmit} className="register-form">
                <input
                    type="text"
                    name="name"
                    placeholder="name"
                    value={formData.name}
                    onChange={handleChange}
                />
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
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default RegisterForm;
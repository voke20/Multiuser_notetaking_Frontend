import React, {useState} from 'react';
import AuthLayout from '../../Components/AuthLayout/AuthLayout'
import './LoginPage.css'
import { useNavigate} from 'react-router-dom';
import {loginUser} from '../../services/authservices';
import useAuthStore from '../../store/authstore';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { setTokens } = useAuthStore();
    const navigate = useNavigate();

    const ValidateForm = () => {
        if(!email) {
            setError("Email is required");
            return false;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            setError("Enter a valid email");
            return false;
        }
        if (!password) {
            setError("Password is required");
            return false;
        }
        if (password.length<8) {
            setError("Password must be at least 8 characters");
            return false;
        }
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        console.log("Form submitten")
        if (!ValidateForm()) {
            console.log('Validation failed');  // ← add this
            return;
        }

        // if (!ValidateForm()) return;
        console.log('Calling API...');

        setLoading(true);
        setError('');

        try {
            const data = await loginUser({ email, password });
            setTokens(data.access, data.refresh);
            navigate('/');
        } catch (err: any) {
            setError(err.message || "Login Failed");
        } finally {
            setLoading(false);
        }

    };
 
    return (
        <AuthLayout>
            <div className="login-form-container">
                <h1>Welcome Back</h1>
                <p>Please enter your details to sign in</p>

                {error && <p className = "error-message">{error}</p>}

                {/* <div className="social-buttons">
                    <button className="btn-social">
                        <img src="https://www.google.com/favicon.ico" alt="Google" />
                        Google
                    </button>
                    <button className="btn-social">
                        <img src="" alt="" />
                        🍎 Apple
                    </button>
                </div> 

                <div className="divider">
                    <span>Or EMAIL</span>
                </div> */}

                <form action="" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email</label>
                        <input 
                            type="email"
                            value={email}
                            onChange={(e)=> setEmail(e.target.value)}
                            placeholder='Enter your email' />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input 
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='Enter your password' />
                    </div>

                    <div className="form-options">
                        <label>
                            <input type="checkbox" /> Remember Me
                        </label>
                        <a href="">Forgot Password</a>
                    </div>

                    <button type='submit' className="btn-primary" disabled= {loading}>
                        {loading ? 'Signing in...': 'Sign In'}
                    </button>
                </form>

                <p className="auth-switch">
                    Don't have an account? 
                    <a href="/register"> Register</a>
                </p>
            </div>
        </AuthLayout>
    );
};

export default Login;
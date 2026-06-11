import React, {useState} from 'react';
import AuthLayout from '../../Components/AuthLayout/AuthLayout'
import './RegisterPage.css'
import { registerUser } from '../../services/authservices';
import { useNavigate } from 'react-router-dom';

const Register=() => {
    const [phone_number, setPhone_Number] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('')
    const [loading, setLoading]= useState(false);
    const [error, setError]= useState('');
    const navigate = useNavigate();
    const [agreedToTerms, setAgreedToTerms] = useState(false);

    const validationform = () => {
        if (!email) {
            setError("Email is required");
            return false;
        }
        if(!/\S+@\S+\.\S+/.test(email)) {
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
        if (password !== confirmpassword) {
            setError("Passwords do not match");
            return false;
        }
        if (!agreedToTerms){
            setError("You muct agree to Terms and Conditions");
            return false;
        }
        if (phone_number && !/^\+?[\d\s\-]{10,15}$/.test(phone_number)) {
            setError("Please enter a valid phone number");
            return false;
        }
        return true;
    }

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitten")
    if (!validationform()) {
        console.log('Validation failed');  // ← add this
        return;
    }

    console.log('Calling API...');
    
    setLoading(true);
    setError('');
    
    try {
        await registerUser({ email, password, phone_number });
        navigate('/login');
    } catch (err: any) {
        setError(err.message || 'Registration failed');
    } finally {
        setLoading(false);
    }
    };

    return (
        <AuthLayout>
            <div className="register-form-container">
                <h1>Create Account</h1>
                <p>Join our workspace and start capturing ideas</p>

                {error && <p className='error-message'>{error}</p>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input 
                            type="email"
                            value={email}
                            onChange={(e)=> setEmail(e.target.value)}
                            placeholder='Enter your email' />
                    </div>

                    <div className="form-group">
                        <label>Phone Number</label>
                        <input 
                            type="tel"
                            value={phone_number}
                            onChange={(e)=> setPhone_Number(e.target.value)}
                            placeholder='Enter your phone number' />
                    </div>

                    <div className="check-password">
                        <div className="form-group">
                            <label>Password</label>
                            <input 
                                type="password"
                                value={password}
                                onChange={(e)=> setPassword(e.target.value)}
                                placeholder='Enter Password' />
                        </div>

                        <div className="form-group">
                            <label>Confirm Password</label>
                            <input 
                                type="password"
                                value={confirmpassword}
                                onChange={(e)=> setConfirmPassword(e.target.value)}
                                placeholder='Confirm Password' />
                        </div>
                    </div> 

                    <div className="form-options">
                        <label>
                            <input 
                                type="checkbox"
                                onChange={(e) => setAgreedToTerms(e.target.checked)} />  
                             I agree to the <a href="">Terms of Service </a> 
                            and <a href=""> Privacy Policy</a>
                        </label>
                    </div>

                    <button type="submit" className='btn-primary' disabled={loading}>
                        {loading ? 'Registering...': 'Register'}  
                    </button>
                </form>

                {/* <div className="divider">
                    <span>Create Account Using</span>
                </div>

                <div className="social-buttons">
                    <button className="btn-social">
                        <img src="https://www.google.com/favicon.ico" alt="Google" />
                        Google
                    </button>

                    <button className="btn-social">
                        <img src="" alt="" />
                        🍎 Apple
                    </button>
                </div> */}

                <p className="auth-switch">
                    Already have an account? 
                    <a href="/login"> Sign In</a>
                </p>
            </div>
        </AuthLayout>
    );
};

export default Register
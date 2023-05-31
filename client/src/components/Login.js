import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { handleLogin } from "../utils/resource";

const Login = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		if (username.trim() && password.trim()) {
			e.preventDefault();
			handleLogin(username, password, navigate);
			setPassword("");
			setUsername("");
		}
	};

	return (
		<main className='container'>
  <form className='block' onSubmit={handleSubmit}>
    <h2 className='login__title form-title'>Log into your account</h2>
    <div className="form-field">
      <label htmlFor='username'>Username</label>
      <input
        id='username'
        name='username'
        type='text'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className='username form-input'
      />
    </div>
    <div className="form-field">
      <label htmlFor='password'>Password</label>
      <input
        id='password'
        type='password'
        name='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className='password form-input'
      />
    </div>
    <button className='loginButton form-button'>LOG IN</button>
    <p className="form-footer">
      Don't have an account?{" "}
      <Link className='link' to='/register'>
        Create one
      </Link>
    </p>
  </form>
</main>

	);
};

export default Login;

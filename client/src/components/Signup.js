import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { handleRegister } from "../utils/resource";

const Signup = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		if (username.trim() && password.trim() && email.trim()) {
			handleRegister(email, username, password, navigate);
			setPassword("");
			setUsername("");
			setEmail("");
		}
	};

	return (
		<main className='signup container'>
  <form className='block' onSubmit={handleSubmit}>
    <h2 className='signup__title form-title'>Create an account</h2>
    <div className="form-field">
      <label htmlFor='email'>Email Address</label>
      <input
        id='email'
        name='email'
        type='email'
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="form-input"
      />
    </div>
    <div className="form-field">
      <label htmlFor='username'>Username</label>
      <input
        id='username'
        name='username'
        required
        type='text'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="form-input"
      />
    </div>
    <div className="form-field">
      <label htmlFor='password'>Password</label>
      <input
        id='password'
        type='password'
        name='password'
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="form-input"
      />
    </div>
    <button className='signupButton form-button'>REGISTER</button>
    <p className="form-footer">
      Already have an account?{" "}
      <Link className='link' to='/'>
        Sign in
      </Link>
    </p>
  </form>
</main>

	);
};

export default Signup;

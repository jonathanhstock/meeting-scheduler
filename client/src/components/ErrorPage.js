import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = ({ error }) => {
	return (
		<div className='container'>
			<div className='errorContainer'>
				<h2 style={{ marginBottom: "30px" }}>{error}</h2>
				<Link to='/'>Go Home</Link>
			</div>
		</div>
	);
};

export default ErrorPage;

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./components/Profile";
import BookUser from "./components/BookUser";
import Calculate from "./components/Calculate";
import ViewAll from "./components/ViewAll";

const App = () => {
	return (
		<div>
			<BrowserRouter>
				<Routes>
					<Route path='/' element={<Login />} />
					<Route path='/register' element={<Signup />} />
					<Route path='/dashboard' element={<Dashboard />} />
					<Route path='/profile/:id' element={<Profile />} />
					<Route path='/book/:user' element={<BookUser />} />
					<Route path='/calculate/:id' element={<Calculate />} />
					<Route path='/viewall/:id' element={<ViewAll />} />
				</Routes>
			</BrowserRouter>
			<ToastContainer />
		</div>
	);
};

export default App;

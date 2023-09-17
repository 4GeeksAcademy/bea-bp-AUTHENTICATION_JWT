import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const [form, setForm] = React.useState({ username: "", password: ""});
	const navigate = useNavigate()

	const handleChange = (e) => {
		const key = e.target.name;
		const value = e.target.value;
		setForm(prev => ({ ...prev, [key]: value }));
	}

	const onSubmit = async (e) => {
		e.preventDefault()
		const apiURL = `${process.env.BACKEND_URL}api/login`
		try {
			const res = await fetch(apiURL, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(form)
			})
			const data = await res.json()
			localStorage.setItem("token", data?.token)
			navigate("/demo")
			
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div className="text-center mt-5">
			<h1>Welcome!</h1>

			<form onSubmit={onSubmit}>
				<input
					placeholder="email"
					value={form.username}
					name="username"
					onChange={handleChange}
					required
				/>
				<input
					placeholder="password"
					value={form.password}
					name="password"
					onChange={handleChange}
					required
				/>

				<button type="submit">Login</button>
			</form>
		</div>
	);
};

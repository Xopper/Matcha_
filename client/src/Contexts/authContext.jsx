import React, { useState, createContext, useEffect, useContext } from 'react';

export const AuthContexts = createContext();

function AuthProvider(props) {
	const [auth, setAuth] = useState({});

	useEffect(() => {
		const token = localStorage.getItem('token');
		const isCompleted = localStorage.getItem('isCompleted');
		// TODO >> check token from backend
		// note => i dont need spinner loader till the moment
		// if the check from the backend takes time then i need to add a spinner
		console.log('comes from authContext >> ', token);
		setAuth({ token, isCompleted });
	}, []);
	return <AuthContexts.Provider value={{ auth, setAuth }}>{props.children}</AuthContexts.Provider>;
}

export const IsLoggedfn = () => {
	const {
		auth: { token }
	} = useContext(AuthContexts);
	return token;
};

export const IsCompletedfn = () => {
	const {
		auth: { isCompleted }
	} = useContext(AuthContexts);
	return isCompleted;
};

export default AuthProvider;

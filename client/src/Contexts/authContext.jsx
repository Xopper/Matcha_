import React, { useState, createContext, useEffect, useContext } from 'react';

export const AuthContexts = createContext();

function AuthProvider(props) {
	const [auth, setAuth] = useState({});

	useEffect(() => {
		const token = localStorage.getItem('token');
		// TODO >> check token from backend
		// note => i dont need spinner loader till the moment
		// if the check from the backend takes time then i need to add a spinner
		console.log('comes from authContext >> ', token);
		setAuth({ token });
	}, []);
	return <AuthContexts.Provider value={{ auth, setAuth }}>{props.children}</AuthContexts.Provider>;
}

export const IsLogged = () => {
	const { auth } = useContext(AuthContexts);
	return auth.token;
};

export default AuthProvider;

import React, { useState, createContext, useEffect } from 'react';

export const AuthContexts = createContext();

function AuthProvider(props) {
	const [auth, setAuth] = useState({});

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
			setAuth({ token });
		}
	}, []);
	return <AuthContexts.Provider value={{ auth, setAuth }}>{props.children}</AuthContexts.Provider>;
}

export default AuthProvider;

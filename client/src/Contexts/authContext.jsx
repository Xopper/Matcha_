import React, { useState, createContext, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

export const AuthContexts = createContext();

function AuthProvider(props) {
	const history = useHistory();
	const [auth, setAuth] = useState({});

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
			const isValid = async () => {
				const {
					data: { status, complited }
				} = await axios.post('http://localhost:5000/authToken/authTokenValidation', {
					authToken: token
				});
				console.log(status);
				if (status === 0) {
					console.log('tach');
					setAuth({ token, isCompleted: complited });
				} else {
					console.log(':(');
					setAuth(oldValue => {
						return { ...oldValue, token: null };
					});
					localStorage.clear();
				}
			};
			isValid();
		} else {
			setAuth(oldValue => {
				return { ...oldValue, token: null };
			});
		}
	}, [history]);
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

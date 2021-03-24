import React, { useState, createContext, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import socketIOClient from 'socket.io-client';

export const AuthContexts = createContext();
export const socket = socketIOClient('http://localhost:5000');

function AuthProvider(props) {
	const history = useHistory();
	const [auth, setAuth] = useState({});

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (token) {
			// im gonna expect the username from the backend :)
			const isValid = async () => {
				const {
					data: { status, complited, ...args }
				} = await axios.post('http://localhost:5000/authToken/authTokenValidation', {
					authToken: token
				});
				if (status === 0) {
					const { userName: loggedUser, userId: loggedID } = args;
					console.log(args);
					setAuth({ token, isCompleted: complited, loggedUser, socketID: socket, loggedID });
					socket.emit('usersConnected', loggedUser);
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

/**
 * in general cases I dont need to check the local storage
 */
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

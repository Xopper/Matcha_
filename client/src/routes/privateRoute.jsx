import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { IsLoggedfn, IsCompletedfn } from '../Contexts/authContext';

export default function PrivateRoute({ component: Component, ...args }) {
	const isLogged = IsLoggedfn();
	const isCompleted = IsCompletedfn();
	return (
		<Route
			{...args}
			render={props => {
				// Check if the users is Logged and completed his profile to redirect him to init form
				if (typeof isLogged === 'string' && isCompleted === 0) return <Redirect to='/init' />;
				if (typeof isLogged === 'string') return <Component {...props} />;
				if (typeof isLogged === typeof null) return <Redirect to='/auth' />;
				return null;
			}}
		/>
	);
}

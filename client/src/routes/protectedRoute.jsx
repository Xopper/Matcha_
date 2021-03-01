import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { IsLoggedfn } from '../Contexts/authContext';

export default function ProtectedRoute({ component: Component, ...args }) {
	const isLogged = IsLoggedfn();
	return (
		<Route
			{...args}
			render={props => {
				// check if the user is alredy is logged to redict him to his account
				if (typeof isLogged === 'string') return <Redirect to='/account' />;
				if (typeof isLogged === typeof null) return <Component {...props} />;
				return null;
			}}
		/>
	);
}

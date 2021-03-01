import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { IsLoggedfn, IsCompletedfn } from '../Contexts/authContext';

export default function PrivilegesRoute({ component: Component, ...args }) {
	const isLogged = IsLoggedfn();
	const isCompleted = parseInt(IsCompletedfn());
	return (
		<Route
			{...args}
			render={props => {
				// for logged users
				// just checking if there is token or not used for /init
				if (typeof isLogged !== 'undefined' && typeof isCompleted !== 'undefined') {
					if (typeof isLogged === 'string' && isCompleted === 1) return <Redirect to='/account' />;
					if (typeof isLogged === 'string') return <Component {...props} />;
					if (typeof isLogged === typeof null) return <Redirect to='/auth' />;
				}
				return null;
			}}
		/>
	);
}

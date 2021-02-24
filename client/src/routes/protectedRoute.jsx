import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { IsLogged } from '../Contexts/authContext';

export default function ProtectedRoute({ component: Component, ...args }) {
	let isLogged = IsLogged();
	return (
		<Route
			{...args}
			render={props => {
				// console.log(isLogged);
				if (typeof isLogged === 'string') return <Redirect to='/account' />;
				if (typeof isLogged === typeof null) return <Component {...props} />;
				return null;
			}}
		/>
	);
}

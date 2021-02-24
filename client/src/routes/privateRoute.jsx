import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { IsLogged } from '../Contexts/authContext';

export default function PrivateRoute({ component: Component, ...args }) {
	let isLogged = IsLogged();
	return (
		<Route
			{...args}
			render={props => {
				// console.log(isLogged);
				if (typeof isLogged === 'string') return <Component {...props} />;
				if (typeof isLogged === typeof null) return <Redirect to='/auth' />;
				return null;
			}}
		/>
	);
}

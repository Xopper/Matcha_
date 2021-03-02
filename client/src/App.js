import './App.css';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Home from './Pages/Home';
import NavBar from './assets/Navbar';
import Init from './Pages/init';
import Account from './Pages/account';
import Profile from './Pages/profile';
import Auth from './Pages/auth';
import { useState } from 'react';
import MyFooter from './assets/myFooter';
import AuthProvider from '../src/Contexts/authContext';

function App() {
	const [displayToggle, SetDisplayToggle] = useState(false);
	return (
		<Router>
			<div className='container'>
				<NavBar parentDisplay={displayToggle} SetDisplayToggle={SetDisplayToggle} />
				<div className={`app ${displayToggle ? 'open' : ''}`}>
					<Switch>
						<Route path='/u/:username' component={Profile} />
						<Route path='/init' component={Init} />
						<Route path='/account' component={Account} />
						<Route path='/auth' component={Auth} />
						<Route exact path='/' component={Home} />
					</Switch>
				</div>
			</div>
			<MyFooter openStatus={`app ${displayToggle ? 'open' : ''}`} />
		</Router>
	);
}

function AppWithStore() {
	return (
		<AuthProvider>
			<App />
		</AuthProvider>
	);
}

export default AppWithStore;

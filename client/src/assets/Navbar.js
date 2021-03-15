import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContexts } from '../Contexts/authContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faHistory } from '@fortawesome/free-solid-svg-icons';
import { ReactComponent as BellIcon } from '../icons/bell.svg';
import { ReactComponent as CogIcon } from '../icons/cog.svg';
import { ReactComponent as MessengerIcon } from '../icons/messenger.svg';
// import { ReactComponent as CaretIcon } from '../icons/caret.svg';
import { ReactComponent as BoltIcon } from '../icons/bolt.svg';
import { ReactComponent as PlusIcon } from '../icons/plus.svg';
import { ReactComponent as InfosIcon } from '../icons/infos.svg';

function NavItem({ handleClick, icon, open, children, notifCount }) {
	return (
		<li style={{ position: 'relative' }}>
			<div className='nav__icons clickable' onClick={handleClick}>
				{icon}
			</div>
			{notifCount && <span className='notif__cercl'>{notifCount}</span>}
			{open && children}
		</li>
	);
}

function DropDownMenu(props) {
	function DropDownItem(props) {
		return (
			<div className='menu-item'>
				<span className='sub__nav__icons'>{props.leftIcon}</span>
				{props.children}
			</div>
		);
	}
	return (
		<div className='drop-down'>
			<Link to='/account' onClick={props.handleClick}>
				<DropDownItem leftIcon={<InfosIcon className='sub_icon_btn' />}>Edit Infos</DropDownItem>
			</Link>
			<Link to='/account/preferences' onClick={props.handleClick}>
				<DropDownItem leftIcon={<CogIcon className='sub_icon_btn' />}>Edit Preferences</DropDownItem>
			</Link>
			<Link to='/account/password' onClick={props.handleClick}>
				<DropDownItem leftIcon={<BoltIcon className='sub_icon_btn' />}>Edit Password</DropDownItem>
			</Link>
			<Link to='/account/pictures' onClick={props.handleClick}>
				<DropDownItem leftIcon={<PlusIcon className='sub_icon_btn' />}>Edit Photos</DropDownItem>
			</Link>
		</div>
	);
}

function NavBar({ parentDisplay, SetDisplayToggle }) {
	const [toggleClass, setToggleClass] = useState(false);
	const [open, setOpen] = useState(false);
	const handleClick = () => {
		setToggleClass(toggleClass => !toggleClass);
		SetDisplayToggle(parentDisplay => !parentDisplay);
	};

	const { auth, setAuth } = useContext(AuthContexts);

	return (
		<nav className='navbar_wraper'>
			<div className='navbar__siteName'>
				<h1>
					<Link to='/'>MatchaV2.</Link>
				</h1>
			</div>
			<div>
				<span href='#' className='toggle-button' onClick={() => handleClick()}>
					<span className='bar' />
					<span className='bar' />
					<span className='bar' />
				</span>
			</div>
			<div>
				<ul className={`navbar__list ${toggleClass ? 'open' : ''}`}>
					{(auth.token === null && (
						<>
							<li>
								<Link onClick={() => handleClick()} to='/auth'>
									Sign In
								</Link>
							</li>
							<li>
								<Link to='/auth/register'>
									<button onClick={() => handleClick()}>Sign up</button>
								</Link>
							</li>
						</>
					)) ||
						(auth.token && (
							<>
								<NavItem
									icon={
										<FontAwesomeIcon
											icon={faHistory}
											size='lg'
											className='clickable'
											style={{ color: 'aquamarine', width: 20, height: 20 }}
										/>
									}
								/>
								<NavItem icon={<MessengerIcon className='icon_btn' />} notifCount='2' />
								<NavItem icon={<BellIcon className='icon_btn' />} notifCount='9+' />
								<NavItem
									open={open}
									handleClick={() => setOpen(!open)}
									icon={<CogIcon className='icon_btn' />}
								>
									<DropDownMenu handleClick={() => setOpen(!open)} />
								</NavItem>
								<NavItem
									icon={
										<FontAwesomeIcon
											icon={faSignOutAlt}
											size='lg'
											className='clickable'
											onClick={() => {
												localStorage.clear();
												setAuth({ token: null });
											}}
											style={{ color: 'aquamarine', width: 20, height: 20 }}
										/>
									}
								/>
							</>
						))}
				</ul>
			</div>
		</nav>
	);
}

export default NavBar;

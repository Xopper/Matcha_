import React, { useState, useContext, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { AuthContexts, socket } from '../Contexts/authContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faHistory, faUser, faTrashRestoreAlt } from '@fortawesome/free-solid-svg-icons';
import { faFirefoxBrowser } from '@fortawesome/free-brands-svg-icons';
import { ReactComponent as BellIcon } from '../icons/bell.svg';
import { ReactComponent as CogIcon } from '../icons/cog.svg';
import { ReactComponent as MessengerIcon } from '../icons/messenger.svg';
import { ReactComponent as BoltIcon } from '../icons/bolt.svg';
import { ReactComponent as PlusIcon } from '../icons/plus.svg';
import { ReactComponent as InfosIcon } from '../icons/infos.svg';

/**
 * @link https://stackoverflow.com/questions/32553158/detect-click-outside-react-component
 * @param {*} ref
 * @param {*} handleClick
 */
function useOutsideHandler(ref, handleClick) {
	useEffect(() => {
		function handleClickOutside(event) {
			if (ref.current && !ref.current.contains(event.target)) {
				handleClick();
			}
		}
		// Bind the event listener
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			// Unbind the event listener on clean up
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [ref, handleClick]);
}

function NavItem({ handleClick, icon, open, children, notifCount, text }) {
	return (
		<li className='nav__item--control' style={{ position: 'relative' }}>
			<div className='nav__icons clickable' onClick={handleClick}>
				{icon}
			</div>
			<span>{text}</span>
			{notifCount && notifCount !== '0' && <span className='notif__cercl'>{notifCount}</span>}
			{open && children}
		</li>
	);
}

function DropDownMenu(props) {
	const dropDown = useRef(null);
	useOutsideHandler(dropDown, props.handleClick);
	function DropDownItem(props) {
		return (
			<div className='menu-item'>
				<span className='sub__nav__icons'>{props.leftIcon}</span>
				{props.children}
			</div>
		);
	}
	return (
		<div className='drop-down' ref={dropDown}>
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
	const [notifCount, setNotifCount] = useState(0);
	const [notifMsg, setnotifMsg] = useState(0);
	const { auth, setAuth } = useContext(AuthContexts);
	const { loggedUser } = auth;
	useEffect(() => {
		socket.on('viewd_profile', function (data) {
			console.log('data', data);
			if (data === true) {
				setNotifCount(old => old + 1);
			}
		});
		socket.on('notifMsg', function (data) {
			if (data === true) {
				setnotifMsg(old => old + 1);
				console.log('test');
			}
		});
		return () => {
			setNotifCount(0);
			setnotifMsg(0);
		};
	}, []);
	const [toggleClass, setToggleClass] = useState(false);
	const [open, setOpen] = useState(false);
	const handleClick = () => {
		setToggleClass(toggleClass => !toggleClass);
		SetDisplayToggle(parentDisplay => !parentDisplay);
	};

	return (
		<nav className='navbar_wraper'>
			<div className='navbar__siteName'>
				<h1>
					<Link to='/'>MatchaV2.</Link>
				</h1>
			</div>
			<div></div>
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
								<Link to='/blocked'>
									<NavItem
										text='blocked'
										icon={
											<FontAwesomeIcon
												icon={faTrashRestoreAlt}
												size='lg'
												className='clickable'
												style={{ color: 'aquamarine', width: 20, height: 20 }}
											/>
										}
									/>
								</Link>
								<Link to={`/u/${auth.loggedUser}`}>
									<NavItem
										text='profile'
										icon={
											<FontAwesomeIcon
												icon={faUser}
												size='lg'
												className='clickable'
												style={{ color: 'aquamarine', width: 20, height: 20 }}
											/>
										}
									/>
								</Link>
								<Link to='/browse'>
									<NavItem
										text='browse'
										icon={
											<FontAwesomeIcon
												icon={faFirefoxBrowser}
												size='lg'
												className='clickable'
												style={{ color: 'aquamarine', width: 20, height: 20 }}
											/>
										}
									/>
								</Link>
								<Link to='/history'>
									<NavItem
										text='history'
										icon={
											<FontAwesomeIcon
												icon={faHistory}
												size='lg'
												className='clickable'
												style={{ color: 'aquamarine', width: 20, height: 20 }}
											/>
										}
									/>
								</Link>
								<Link to='/messanger'>
									<NavItem
										text='messages'
										icon={<MessengerIcon className='icon_btn' />}
										notifCount={`${notifMsg}`}
									/>
								</Link>
								<Link to='/notifications'>
									<NavItem
										text='notifications'
										icon={<BellIcon className='icon_btn' />}
										notifCount={`${notifCount}`}
									/>
								</Link>
								<NavItem
									open={open}
									handleClick={() => setOpen(!open)}
									icon={<CogIcon className='icon_btn' />}
								>
									<DropDownMenu handleClick={() => setOpen(!open)} />
								</NavItem>
								<NavItem
									text='logout'
									icon={
										<FontAwesomeIcon
											icon={faSignOutAlt}
											size='lg'
											className='clickable'
											onClick={() => {
												socket.emit('logOut', loggedUser);
												localStorage.removeItem('token');
												if (!!localStorage.getItem('token') === false) {
													console.log('local storage is empty');
												} else {
													console.log('hmmmmm');
												}
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

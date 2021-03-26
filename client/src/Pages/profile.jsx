import React, { useState, useEffect, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { capitalizeFirstLetter, getInstance } from '../helpers/helpers';
import HalfRating from '../assets/profileRating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faFlag, faUserTimes } from '@fortawesome/free-solid-svg-icons';
import SimpleSlider from '../Inc/extra/Slider';
import { AuthContexts, socket } from '../Contexts/authContext';
import { getAge } from '../helpers/helpers';
import Moment from 'react-moment';
import Swal from 'sweetalert2';

async function getData(strname, token) {
	const response = await getInstance(token).post('http://localhost:5000/profileUserInfos/userInfos', {
		userNameLokingFor: strname
	});
	return response;
}

const isLogged = !!localStorage.getItem('token');

function Profile() {
	const [isLiked, setIsLiked] = useState(0);
	const { username } = useParams();
	const { auth } = useContext(AuthContexts);
	const { token, loggedUser } = auth;
	const [userStatus, setUserStatus] = useState(false);
	const history = useHistory();

	const [data, setData] = useState({
		biography: '',
		birthday: '',
		blocked: '',
		fameRating: '',
		firstName: '',
		gender: '',
		imgOne: '',
		imgTwo: '',
		imgThree: '',
		imgFour: '',
		lastName: '',
		liked: '',
		profileImg: '',
		reported: '',
		sexualPreference: '',
		tags: [],
		userName: '',
		country: '',
		last_seen: ''
	});

	useEffect(() => {
		(async () => {
			const {
				data: { allUserInfos, status }
			} = await getData(username, token);
			if (status === 0 && allUserInfos.imBlocked === 0 && allUserInfos.blocked === 0) {
				if (loggedUser !== username) {
					socket.emit('OnlineUser', username);
					/**
					 * sift l back end bach i9iyed had l visit f notification
					 */
					const res = await getInstance(token).post('http://localhost:5000/setNotifications/messages', {
						to: username,
						type: 5
					});
				}
				const keys = Object.keys(allUserInfos);
				keys.forEach(el => {
					if (el === 'birthday') {
						const age = getAge(allUserInfos[el]);
						setData(oldData => ({ ...oldData, [el]: age }));
					} else if (el === 'sexualPreference' && allUserInfos[el] === 'bi') {
						setData(oldData => ({ ...oldData, [el]: 'bisexual' }));
					} else if (el === 'liked') {
						setIsLiked(allUserInfos[el]);
					} else {
						setData(oldData => ({ ...oldData, [el]: allUserInfos[el] }));
					}
				});
			} else {
				history.push('/account');
			}
		})();
		socket.on('usersIsOnline', function (data) {
			if (data === username) {
				setUserStatus(true);
				console.log('usersIsOnline', data);
			}
		});
		socket.on('usersIsOffline', function (data) {
			if (data === username) {
				setUserStatus(false);
			}
		});
	}, [username, token, history, loggedUser]);

	/**
	 * please try to standrize the back-ends calls
	 * for all Actions {handleLike }
	 */

	async function handleLike() {
		console.log('like Clicked');
		const res = await getInstance(token).post('http://localhost:5000/likeEndPoint/like', {
			userName: data.userName
		});
		if (res.data.status === 0) {
			/**
			 * send like notification
			 */
			socket.emit('like', data.userName);
			setIsLiked(oldStatus => !oldStatus);
			if (!!!isLiked) {
				Swal.fire({
					title: 'YAAAAAP!',
					text: `You liked this profile!`,
					icon: 'success',
					confirmButtonText: 'close'
				});
				setData(oldVals => ({ ...oldVals, fameRating: data.fameRating + 0.1 }));
			} else {
				Swal.fire({
					title: 'OUUUUUUCH!',
					text: `You Dislike this profile!`,
					icon: 'warning',
					confirmButtonText: 'close'
				});
				setData(oldVals => ({ ...oldVals, fameRating: data.fameRating - 0.1 }));
			}
		}
	}

	/**
	 * remove clgs :)
	 */
	function handleReport() {
		console.log('report clicked');
		Swal.fire({
			title: 'Are you sure?',
			text: 'Report as Fake account ?',
			icon: 'question',
			showCancelButton: true,
			confirmButtonText: `Report`
		}).then(async ({ isConfirmed }) => {
			if (isConfirmed) {
				const res = await getInstance(token).post('http://localhost:5000/reportEndPoint/report', {
					userName: data.userName
				});
				if (res.data.status) {
					console.log(res.data);
					Swal.fire({
						title: 'OUUUUUUCH!',
						text: res.data.errors,
						icon: 'warning',
						confirmButtonText: 'close'
					});
					// Swal.fire(res.data.errors, '', 'warning');
				} else {
					Swal.fire({
						title: 'YAAAAAP!',
						text: `Account has been reported!`,
						icon: 'success',
						confirmButtonText: 'close'
					});
					setData(oldVals => ({ ...oldVals, fameRating: data.fameRating - 0.1 }));
				}

				// if response is 0 {no errors}
				// swal succes
				// if response is1 {error}
				// show the error and 1005 it gonna be that you are already reported this account before :)
			}
		});
	}

	function handleBlock() {
		console.log('Block Clicked');
		Swal.fire({
			title: 'Are you sure?',
			text: 'Block this account ?',
			icon: 'question',
			showCancelButton: true,
			confirmButtonText: `Block`
		}).then(async ({ isConfirmed }) => {
			if (isConfirmed) {
				const res = await getInstance(token).post('http://localhost:5000/blockEndPoint/block', {
					userName: data.userName
				});
				console.log(res);
				// normaly if the user is blocke we are not gonna be generating this page
				// but we gonna treat it like the "Like" action
				if (res.data.status) {
					console.log(res.data);
					Swal.fire({
						title: 'OUUUUUUCH!',
						text: res.data.errors,
						icon: 'warning',
						confirmButtonText: 'close'
					});
				} else {
					Swal.fire({
						title: 'YAAAAAP!',
						text: `Account has been blocked!`,
						icon: 'success',
						confirmButtonText: 'close'
					});
					// a way to refresh the page
					// history.go(0);
					history.replace('/account');
				}
			}
		});
	}

	if (!data.userName) return null;
	return (
		<div className='profile__container'>
			<div className='profile__wrapper'>
				<section className='profile__content'>
					<section className='profile__nav'>
						<div className='profile__rating'>
							<HalfRating fameRating={data.fameRating && data.fameRating.toFixed(1)} />
						</div>
						{loggedUser !== data.userName && (
							<div className='profile__actions'>
								{/**must be conditional if this is the logged user or an other user */}
								<FontAwesomeIcon
									icon={faHeart}
									size='lg'
									className={isLiked ? 'clickable isLiked' : 'clickable'}
									onClick={() => (isLogged ? handleLike() : history.go())}
									style={{ color: '#ccc', width: 20, height: 20 }}
								/>
								<FontAwesomeIcon
									icon={faFlag}
									size='lg'
									className='clickable'
									onClick={() => (isLogged ? handleReport() : history.go())}
									style={{ color: '#ccc', width: 20, height: 20 }}
								/>
								<FontAwesomeIcon
									icon={faUserTimes}
									size='lg'
									className='clickable'
									onClick={() => (isLogged ? handleBlock() : history.go())}
									style={{ color: 'crimson', width: 20, height: 20 }}
								/>
							</div>
						)}
					</section>
					<section className='profile__heeder'>
						<div className='img__wrapper'>
							<img src={data.profileImg} alt='tacos' />
							{loggedUser !== data.userName && (
								<span
									className={userStatus ? `profile__status online` : `profile__status offline`}
								></span>
							)}
						</div>
						<div className='profile__fullname'>
							{`${capitalizeFirstLetter(data.userName)}, ${data.birthday}`}{' '}
							{/**use last seen here if hes of line */}
							<span className='profile__lastSeen'>
								{userStatus || loggedUser === data.userName ? (
									''
								) : (
									<Moment fromNow>{data.last_seen}</Moment>
								)}
							</span>
						</div>
						<div className='profile__fieldset'>
							<div className='profile__fieldset--key'>
								<p>Fullname.</p>
								<span></span>
							</div>
							<div className='profile__fieldset--value'>{`${capitalizeFirstLetter(
								data.firstName
							)} ${capitalizeFirstLetter(data.lastName)}`}</div>
						</div>
						<div className='profile__fieldset'>
							<div className='profile__fieldset--key'>
								<p>Gender.</p>
								<span></span>
							</div>
							<div className='profile__fieldset--value'>{capitalizeFirstLetter(data.gender)}</div>
						</div>
						<div className='profile__fieldset'>
							<div className='profile__fieldset--key'>
								<p>Interestes.</p>
								<span></span>
							</div>
							<div className='profile__fieldset--value'>
								{capitalizeFirstLetter(data.sexualPreference)}
							</div>
						</div>
						<div className='profile__fieldset'>
							<div className='profile__fieldset--key'>
								<p>Country.</p>
								<span></span>
							</div>
							<div className='profile__fieldset--value'>{data.country}</div>
						</div>
						<div className='profile__fieldset'>
							<div className='profile__fieldset--key'>
								<p>Tags.</p>
								<span></span>
							</div>
							<div className='profile__fieldset--value'>{data.tags.toString().replace(/,/g, ', ')}</div>
						</div>
						<div className='profile__fieldset'>
							<div className='profile__fieldset--key'>
								<p>Biography.</p>
								<span></span>
							</div>
							<div className='profile__fieldset--value'>{data.biography}</div>
						</div>
					</section>
					<section className='profile__footer'>
						<SimpleSlider
							slides={[data.profileImg, data.imgOne, data.imgTwo, data.imgThree, data.imgFour]}
						/>
					</section>
				</section>
			</div>
		</div>
	);
}

export default Profile;

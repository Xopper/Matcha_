import React, { useState, useEffect, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { capitalizeFirstLetter } from '../helpers/helpers';
import HalfRating from '../assets/profileRating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faFlag, faBan } from '@fortawesome/free-solid-svg-icons';
import SimpleSlider from '../Inc/extra/Slider';
import { AuthContexts } from '../Contexts/authContext';
import { getAge } from '../helpers/helpers';
import axios from 'axios';
import Swal from 'sweetalert2';

async function getData(strname, token) {
	const instance = axios.create({
		headers: { Authorization: `Bearer ${token}` }
	});
	const response = await instance.post('http://localhost:5000/profileUserInfos/userInfos', {
		userNameLokingFor: strname
	});
	return response;
}

function Profile() {
	const [isLiked, setIsLiked] = useState(0);
	const { username } = useParams();
	const { auth } = useContext(AuthContexts);
	const { token } = auth;
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
		country: ''
	});

	useEffect(() => {
		const data = async () => {
			const {
				data: { allUserInfos, status }
			} = await getData(username, token);
			if (status === 0) {
				console.log(allUserInfos);
				const keys = Object.keys(allUserInfos);
				keys.forEach(el => {
					if (el === 'birthday') {
						const age = getAge(allUserInfos[el]);
						setData(oldData => ({ ...oldData, [el]: age }));
					} else if (el === 'sexualPreference' && allUserInfos[el] === 'bi') {
						setData(oldData => ({ ...oldData, [el]: 'bisexual' }));
					} else if (el === 'liked') {
						console.log('mebenz >> ', allUserInfos[el]);
						setIsLiked(allUserInfos[el]);
					} else {
						setData(oldData => ({ ...oldData, [el]: allUserInfos[el] }));
					}
				});
			} else {
				history.push('/account');
			}
		};
		data();
	}, [username, token, history]);

	async function handleLike() {
		console.log('like clicked');
		const instance = axios.create({
			headers: { Authorization: `Bearer ${token}` }
		});
		const res = await instance.post('http://localhost:5000/likeEndPoint/like', {
			userName: data.userName
		});
		if (res.data.status === 0) {
			setIsLiked(oldStatus => !oldStatus);
			if (!!!isLiked) {
				Swal.fire({
					title: 'YAAAAAP!',
					text: `You liked this profile!`,
					icon: 'success',
					confirmButtonText: 'close'
				});
			} else {
				Swal.fire({
					title: 'OUUUUUUCH!',
					text: `You Dislike this profile!`,
					icon: 'warning',
					confirmButtonText: 'close'
				});
			}
		}
	}

	function handleReport() {
		console.log('report clicked');
		Swal.fire({
			title: 'Are you sure?',
			text: 'Report as Fake account ?',
			icon: 'question',
			showCancelButton: true,
			confirmButtonText: `Report`
		}).then(({ isConfirmed }) => {
			if (isConfirmed) {
				Swal.fire('Account has been reported!', '', 'success');
				// if response is 0 {no errors}
				// swal succes
				// if response is1 {error}
				// show the error and 1005 it gonna be that you are already reported this account before :)
			}
		});
	}

	function handleBlock() {
		console.log('block cicked');
		Swal.fire({
			title: 'Deleted!',
			text: 'Your row has been deleted.',
			button: 'Close', // Text on button
			icon: 'success', //built in icons: success, warning, error, info
			timer: 3000, //timeOut for auto-close
			buttons: {
				confirm: {
					text: 'OK',
					value: true,
					visible: true,
					className: '',
					closeModal: true
				},
				cancel: {
					text: 'Cancel',
					value: false,
					visible: true,
					className: '',
					closeModal: true
				}
			}
		});
	}

	if (!data.userName) return <div />;
	return (
		<div className='profile__container'>
			<div className='profile__wrapper'>
				<section className='profile__content'>
					<section className='profile__nav'>
						<div className='profile__rating'>
							<HalfRating fameRating={data.fameRating && data.fameRating.toFixed(1)} />
						</div>
						<div className='profile__actions'>
							{/**must be conditional if this is the logged user or an other user */}
							<FontAwesomeIcon
								icon={faHeart}
								size='lg'
								className={isLiked ? 'clickable isLiked' : 'clickable'}
								onClick={handleLike}
								style={{ color: '#ccc', width: 20, height: 20 }}
							/>
							<FontAwesomeIcon
								icon={faFlag}
								size='lg'
								className='clickable'
								onClick={handleReport}
								style={{ color: '#ccc', width: 20, height: 20 }}
							/>
							<FontAwesomeIcon
								icon={faBan}
								size='lg'
								className='clickable'
								onClick={handleBlock}
								style={{ color: 'crimson', width: 20, height: 20 }}
							/>
						</div>
					</section>
					<section className='profile__heeder'>
						<div className='img__wrapper'>
							<img src={data.profileImg} alt='tacos' />
							<span className='profile__status'></span>
						</div>
						<div className='profile__fullname'>
							{`${capitalizeFirstLetter(data.userName)}, ${data.birthday}`}{' '}
							{/**use last seen here if hes of line */}
							<span className='profile__lastSeen'>(last seen: 1 day ago)</span>
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
								<p>Contry.</p>
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

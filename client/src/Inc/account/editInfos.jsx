import React, { Fragment, useState, useContext, useEffect } from 'react';
import MapWithAMarker from './extra/streetMap';
import { formatDate } from '../../helpers/helpers';
import useForm from '../../helpers/useForm';
import validate from '../../validators/validateEdit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { AuthContexts } from '../../Contexts/authContext';
import axios from 'axios';
import Swal from 'sweetalert2';

async function getData(token) {
	const instance = axios.create({
		headers: { Authorization: `Bearer ${token}` }
	});
	const response = await instance.get('http://localhost:5000/getInfos/infos');
	return response;
}

export default function EditInfos() {
	const [formSchema, setFormSchema] = useState({
		firstName: '',
		lastName: '',
		username: '',
		email: '',
		birthDay: '',
		biography: ''
	});

	const { auth, setAuth } = useContext(AuthContexts);
	const { token } = auth;
	const { handleSubmit, handleChange, values, errors } = useForm(submit, validate, formSchema, setFormSchema);
	const { firstName, lastName, username, email, birthDay, biography } = values;
	const [errors_, setErrors_] = useState({ email: '', username: '' });
	// needs to be add
	const [center, setCenter] = useState({ lat: 3.2, lng: 3.6 });
	const [country, setCountry] = useState('unknown');

	const [popupIsOpen, setPopupIsOpen] = useState(false);

	useEffect(() => {
		const data = async () => {
			const {
				data: { userInfos }
			} = await getData(token);
			console.log(userInfos);
			const { lat, lng } = userInfos[0];
			// console.log(' >> ', lat, ' >> ', lng);
			userInfos[0].birthDay = formatDate(userInfos[0].birthDay);
			setFormSchema(userInfos[0]);
			setCenter({ lat, lng });
		};
		data();
	}, [token]);

	function submit() {
		console.log({ ...values, ...center, country });
		// console.log({ ...values, ...center });

		const { token } = auth;
		const instance = axios.create({
			headers: { Authorization: `Bearer ${token}` }
		});

		instance
			.post('http://localhost:5000/editProfileInfo/infoValidator', { ...values, ...center, country })
			.then(res => {
				console.log('hahahahah');
				const { data } = res;
				console.log(res);
				if (data.status === 0) {
					const { newAuthToken } = data;
					localStorage.removeItem('token');
					localStorage.setItem('token', newAuthToken);
					setAuth(oldContext => ({
						...oldContext,
						token: newAuthToken
					}));
					setErrors_({ email: '', username: '' });
					Swal.fire({
						title: 'YAAAP!',
						text: 'Your profile updated successfully!',
						icon: 'success',
						confirmButtonText: 'close'
					});
				} else {
					const { newEmailAlreadyExists: email, newUserNameAlreadyExists: username } = data.errors;
					setErrors_({ email, username });
				}
			})
			.catch(err => {});
	}

	function handleKey(e) {
		if (e.key === 'Enter') {
			e.preventDefault();
		}
	}

	function handleClassName(field, classList = null) {
		if (errors[field] || errors_[field]) {
			return classList ? classList + ' danger' : 'danger';
		}
		return classList ? classList : '';
	}

	return (
		<Fragment>
			<h2>Be in Matcha.</h2>
			<p>You Are Never Too Old To Set Another Goal Or To Dream A New Dream.</p>
			<form onSubmit={handleSubmit} noValidate>
				<label htmlFor='firstName'>
					<strong>First name.</strong>
					<input
						className={handleClassName('firstName')}
						name='firstName'
						type='text'
						id='firstName'
						placeholder='enter you first name'
						value={firstName}
						onChange={handleChange}
						onKeyDown={e => handleKey(e)}
					/>
					<h5>{errors.firstName && `${errors.firstName}`}</h5>
				</label>
				<label htmlFor='lastName'>
					<strong>Last name.</strong>
					<input
						className={handleClassName('lastName')}
						name='lastName'
						type='text'
						id='lastName'
						placeholder='please enter your last name'
						value={lastName}
						onChange={handleChange}
						onKeyDown={e => handleKey(e)}
					/>
					<h5>{errors.lastName && `${errors.lastName}`}</h5>
				</label>
				<label htmlFor='username'>
					<strong>Username.</strong>
					<input
						className={handleClassName('username')}
						name='username'
						type='text'
						id='username'
						placeholder='username to connect'
						value={username}
						onChange={handleChange}
						onKeyDown={e => handleKey(e)}
					/>
					<h5>{(errors.username && `${errors.username}`) || (errors_.username && `${errors_.username}`)}</h5>
				</label>
				<label htmlFor='Email'>
					<strong>Your e-mail.</strong>
					<input
						type='email'
						className={handleClassName('email')}
						id='Email'
						name='email'
						placeholder='name@e-mail.com'
						value={email}
						onChange={handleChange}
						onKeyDown={e => handleKey(e)}
					/>
					<h5>{(errors.email && `${errors.email}`) || (errors_.email && `${errors_.email}`)}</h5>
				</label>
				<label>
					<strong>Biography.</strong>
					<textarea
						name='biography'
						value={biography}
						className={handleClassName('biography', 'textArea')}
						onChange={handleChange}
						onKeyDown={e => handleKey(e)}
					/>
					<h5>{errors.biography && `${errors.biography}`}</h5>
				</label>
				<label>
					<strong>Date of birth.</strong>
					<input
						type='date'
						value={birthDay}
						name='birthDay'
						className={handleClassName('birthDay')}
						onChange={handleChange}
						onKeyDown={e => handleKey(e)}
					/>
					<h5>{errors.birthDay && `${errors.birthDay}`}</h5>
				</label>
				<div className='marker__wrapper '>
					<button
						className='marker__btn clickable'
						onClick={e => {
							e.preventDefault();
							setPopupIsOpen(true);
						}}
					>
						{'Update your Location '}
						<FontAwesomeIcon icon={faMapMarkerAlt} />
					</button>
				</div>
				{/** Pop up section */}
				{popupIsOpen && (
					<div className='popup'>
						<div>
							<MapWithAMarker
								containerElement={<div style={{ height: `400px` }} />}
								mapElement={<div style={{ height: `100%` }} />}
								handlePosition={setCenter}
								handleCountry={setCountry}
								center={center}
							/>
							<button
								className='popup__btn clickable'
								onClick={e => {
									e.preventDefault();
									setPopupIsOpen(false);
								}}
							>
								{'Close'}
							</button>
						</div>
					</div>
				)}
				<div>
					<input className='submit__btn' type='submit' value='Save changes' />
				</div>
			</form>
		</Fragment>
	);
}

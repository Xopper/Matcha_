import React, { Fragment, useState , useContext, useEffect} from 'react';
import MapWithAMarker from './extra/streetMap';
import useForm from '../../helpers/useForm';
import validate from '../../validators/validateEdit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import {AuthContexts} from "../../Contexts/authContext"
import axios from "axios"

export default function EditInfos() {
	const formSchema = {
		firstName: 'tach',
		lastName: 'de Bled',
		username: 'heus',
		email: 'only@fans.com',
		birthDay: '2020-02-14',
		biography: 'allo M. constateur'
	};

	const {auth} = useContext(AuthContexts);
	const { handleSubmit, handleChange, values, errors } = useForm(submit, validate, formSchema);
	const { firstName, lastName, username, email, birthDay, biography } = values;
	// get it from db :)
	const [center, setCenter] = useState({ lat: null, lng: null });

	const [popupIsOpen, setPopupIsOpen] = useState(false);
	// const errors = {};

	// function handlesubmit(e) {
	// 	e.preventDefault();
	// 	console.log(values);
	// }

	// function handleChange(e) {
	// 	const { name, value } = e.target;
	// 	setValues({ ...values, [name]: value });
	// }

	function submit() {
		console.log({ ...values, ...center });
		const { token } = auth;
		const instance = axios.create({
			headers: { Authorization: `Bearer ${token}` }
		});

		instance.post('http://localhost:5000/editProfileInfo/infoValidator', {values, center}).then(res => {
			console.log("hey");
		}).catch(err => {
			console.log(err);
		})
	}
	function handleKey(e) {
		if (e.key === 'Enter') {
			e.preventDefault();
		}
	}

	function handleClassName(field, classList = null) {
		if (errors[field]) {
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
					<h5>{errors.username && `${errors.username}`}</h5>
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
					<h5>{errors.email && `${errors.email}`}</h5>
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
								onClick={e => {
									// edit country
									setCenter({ lat: e.latLng.lat(), lng: e.latLng.lng() });
								}}
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

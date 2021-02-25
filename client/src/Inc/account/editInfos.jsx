import React, { Fragment, useState } from 'react';
import MapWithAMarker from './extra/streetMap';
import useForm from '../../helpers/useForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

export default function EditInfos() {
	const [values, setValues] = useState({
		firstName: 'tach',
		lastName: 'de Bled',
		username: 'heus',
		email: 'only@fans.com',
		birthDay: '2020-02-14',
		biography: 'allo M. constateur'
	});

	const { firstName, lastName, username, email, birthDay, biography } = values;
	const [center, setCenter] = useState({ lat: null, lng: null });
	// const { handleSubmit, handleChange, values, errors } = useForm(submit, validate, values);
	const [popupIsOpen, setPopupIsOpen] = useState(false);
	const errors = {};

	function handlesubmit(e) {
		e.preventDefault();
		console.log(values);
	}

	function handleChange(e) {
		const { name, value } = e.target;
		setValues({ ...values, [name]: value });
	}

	return (
		<Fragment>
			<h2>Be in Matcha.</h2>
			<p>You Are Never Too Old To Set Another Goal Or To Dream A New Dream.</p>
			<form onSubmit={e => handlesubmit(e)} noValidate>
				<label htmlFor='firstName'>
					<strong>First name.</strong>
					<input
						// className={handleClassName('firstName')}
						name='firstName'
						type='text'
						id='firstName'
						placeholder='enter you first name'
						value={firstName}
						onChange={e => handleChange(e)}
					/>
					<h5>{errors.firstName && `${errors.firstName}`}</h5>
				</label>
				<label htmlFor='lastName'>
					<strong>Last name.</strong>
					<input
						// className={handleClassName('lastName')}
						name='lastName'
						type='text'
						id='lastName'
						placeholder='please enter your last name'
						value={lastName}
						onChange={e => handleChange(e)}
					/>
					<h5>{errors.lastName && `${errors.lastName}`}</h5>
				</label>
				<label htmlFor='username'>
					<strong>Username.</strong>
					<input
						// className={handleClassName('username')}
						name='username'
						type='text'
						id='username'
						placeholder='username to connect'
						value={username}
						onChange={e => handleChange(e)}
					/>
					<h5>{errors.username && `${errors.username}`}</h5>
				</label>
				<label htmlFor='Email'>
					<strong>Your e-mail.</strong>
					<input
						type='email'
						// className={handleClassName('email')}
						id='Email'
						name='email'
						placeholder='name@e-mail.com'
						value={email}
						onChange={e => handleChange(e)}
					/>
					<h5>{errors.email && `${errors.email}`}</h5>
				</label>
				<label>
					<strong>Biography.</strong>
					<textarea name='biography' value={biography} className='textArea' onChange={e => handleChange(e)} />
					<h5>{errors.email && `${errors.email}`}</h5>
				</label>
				<label>
					<strong>Date of birth.</strong>
					<input type='date' value={birthDay} name='birthDay' onChange={e => handleChange(e)} />
					<h5>{errors.email && `${errors.email}`}</h5>
				</label>
				{/* <div>
					{center.lat} {center.lng}
				</div> */}
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

import React, { Fragment, useState } from 'react';
import MapWithAMarker from '../streetMap';

export default function EditInfos() {
	const [ values, setValues ] = useState({
		firstName: 'tach',
		lastName: 'de Bled',
		username: 'heus',
		email: 'only@fans.com',
		birthDay: '2020-02-14',
		biography: 'allo M. constateur'
	});

	const { firstName, lastName, username, email, birthDay, biography } = values;
	const [ center, setCenter ] = useState({ lat: null, lng: null });
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
			<form onSubmit={(e) => handlesubmit(e)} noValidate>
				<label htmlFor="firstName">
					First name
					<input
						// className={handleClassName('firstName')}
						name="firstName"
						type="text"
						id="firstName"
						placeholder="enter you first name"
						value={firstName}
						onChange={(e) => handleChange(e)}
					/>
					<h5>{errors.firstName && `${errors.firstName}`}</h5>
				</label>
				<label htmlFor="lastName">
					Last name
					<input
						// className={handleClassName('lastName')}
						name="lastName"
						type="text"
						id="lastName"
						placeholder="please enter your last name"
						value={lastName}
						onChange={(e) => handleChange(e)}
					/>
					<h5>{errors.lastName && `${errors.lastName}`}</h5>
				</label>
				<label htmlFor="username">
					Username
					<input
						// className={handleClassName('username')}
						name="username"
						type="text"
						id="username"
						placeholder="username to connect"
						value={username}
						onChange={(e) => handleChange(e)}
					/>
					<h5>{errors.username && `${errors.username}`}</h5>
				</label>
				<label htmlFor="Email">
					Your e-mail
					<input
						type="email"
						// className={handleClassName('email')}
						id="Email"
						name="email"
						placeholder="name@e-mail.com"
						value={email}
						onChange={(e) => handleChange(e)}
					/>
					<h5>{errors.email && `${errors.email}`}</h5>
				</label>
				<label>
					Biography:
					<textarea
						name="biography"
						value={biography}
						className="textArea"
						onChange={(e) => handleChange(e)}
					/>
					<h5>{errors.email && `${errors.email}`}</h5>
				</label>
				<label>
					Date of birth:
					<input type="date" value={birthDay} name="birthDay" onChange={(e) => handleChange(e)} />
					<h5>{errors.email && `${errors.email}`}</h5>
				</label>
				<MapWithAMarker
					containerElement={<div style={{ height: `400px` }} />}
					mapElement={<div style={{ height: `100%` }} />}
					onClick={(e) => {
						setCenter({ lat: e.latLng.lat(), lng: e.latLng.lng() });
					}}
					center={center}
				/>
				<div>
					{center.lat} {center.lng}
				</div>
				<div>
					<input type="submit" value="Save changes" />
				</div>
			</form>
		</Fragment>
	);
}

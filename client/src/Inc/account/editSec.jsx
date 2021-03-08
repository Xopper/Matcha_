import React, { Fragment, useState } from 'react';
import validate from '../../validators/validateEditSec';
// import axios from 'axios'

export default function EditSec() {
	const [values, setValues] = useState({
		oldPassword: '',
		newPassword: '',
		confNewPassword: ''
	});

	const { oldPassword, newPassword, confNewPassword } = values;

	const [errors, setErrors] = useState({});

	function handlesubmit(e) {
		e.preventDefault();
		const newErrors = validate(values);
		setErrors(validate(values));
		if (Object.keys(newErrors).length === 0) {
			console.log('goood');
		} else {
			console.log(':(');
		}
	}

	function handleChange(e) {
		const { name, value } = e.target;
		setValues({ ...values, [name]: value });
	}

	function handleClassName(field) {
		if (errors[field]) {
			return 'danger';
		}
		return '';
	}

	return (
		<Fragment>
			<h2>Be in Matcha.</h2>
			<p>Security Is Mostly A Superstition. Life Is Either A Daring Adventure Or Nothing.</p>
			<form onSubmit={e => handlesubmit(e)} noValidate>
				<label htmlFor='Password'>
					<strong>Password.</strong>
					<input
						className={handleClassName('oldPassword')}
						name='oldPassword'
						type='password'
						id='oldPassword'
						placeholder='Insert current password'
						value={oldPassword}
						onChange={handleChange}
					/>
					<h5>{errors.oldPassword && `${errors.oldPassword}`}</h5>
				</label>
				<label htmlFor='Password'>
					<strong>New password.</strong>
					<input
						className={handleClassName('newPassword')}
						name='newPassword'
						type='password'
						id='newPassword'
						placeholder='at least 8 characters'
						value={newPassword}
						onChange={handleChange}
					/>
					<h5>{errors.newPassword && `${errors.newPassword}`}</h5>
				</label>
				<label htmlFor='Password'>
					<strong>Confirm new password.</strong>
					<input
						className={handleClassName('confNewPassword')}
						name='confNewPassword'
						type='password'
						id='confNewPassword'
						placeholder='at least 8 characters'
						value={confNewPassword}
						onChange={handleChange}
					/>
					<h5>{errors.confNewPassword && `${errors.confNewPassword}`}</h5>
				</label>
				<div>
					<input className='submit__btn' type='submit' value='Save Changes' />
				</div>
			</form>
		</Fragment>
	);
}

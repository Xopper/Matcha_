import React, { Fragment, useState } from 'react';

export default function EditSec() {
	const [values, setValues] = useState({
		oldPassword: '',
		newPassword: '',
		confNewPassword: ''
	});

	const { oldPassword, newPassword, confNewPassword } = values;

	const errors = {};

	function handlesubmit(e) {
		e.preventDefault();
		console.log(values);
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
					Password
					<input
						className={handleClassName('password')}
						name='oldPassword'
						type='password'
						id='oldPassword'
						placeholder='at least 8 characters'
						value={oldPassword}
						onChange={handleChange}
					/>
					<h5>{errors.oldPassword && `${errors.oldPassword}`}</h5>
				</label>
				<label htmlFor='Password'>
					New Password
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
					Confirm New Password
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

import React, { Fragment, useState } from 'react';

export default function ForgetForm() {
	const [values, setValues] = useState({
		email: ''
	});

	// TODO  => email verification
	const { email } = values;

	const errors = {};

	function handlesubmit(e) {
		e.preventDefault();
		alert(JSON.stringify(values));
	}

	function handleChange(e) {
		const { name, value } = e.target;
		setValues({ ...values, [name]: value });
	}

	function handleClassName(field) {
		if (errors[field]) return 'danger';
		return '';
	}

	return (
		<Fragment>
			<h2>Be in Matcha.</h2>
			<p>Please fill all data before start matching.</p>
			<form onSubmit={e => handlesubmit(e)} noValidate>
				<label htmlFor='Email'>
					Your e-mail
					<input
						type='email'
						className={handleClassName('email')}
						id='Email'
						name='email'
						placeholder='name@e-mail.com'
						value={email}
						onChange={handleChange}
					/>
					<h5>{errors.email && `${errors.email}`}</h5>
				</label>
				<div>
					<input className='submit__btn' type='submit' value='Send' />
				</div>
			</form>
		</Fragment>
	);
}

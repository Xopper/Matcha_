import React, { Fragment, useState } from 'react';
import useForm from '../../helpers/useForm';
import validate from '../../validators/validateForget';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function ForgetForm() {
	const [values, setValues] = useState({
		email: ''
	});

	const history = useHistory();

	const { handleSubmit, handleChange, errors } = useForm(submit, validate, values, setValues);
	const { email } = values;

	const [errors_, setErrors_] = useState({ email: '' });

	async function submit() {
		try {
			const { data } = await axios.post('http://localhost:5000/forgetPwdEmailChecker/emailchecker', values);
			if (data.status === 1) {
				const {
					errors: { email }
				} = data;
				setErrors_(oldErrs => ({ ...oldErrs, email }));
			} else {
				setErrors_(oldErrs => ({ ...oldErrs, email: '' }));
				Swal.fire({
					title: 'Cool!',
					text: 'Please check your e-mail to reset your account!',
					icon: 'success',
					confirmButtonText: 'close'
				});
				history.replace('/auth');
			}
		} catch (e) {}
	}

	function handleClassName(field) {
		if (errors[field] || errors_[field]) {
			return 'danger';
		}
		return '';
	}

	return (
		<Fragment>
			<h2>Reset Your Account.</h2>
			<p>Please fill the input with your email to reset your account.</p>
			<form onSubmit={e => handleSubmit(e)} noValidate>
				<label htmlFor='Email'>
					<strong>email.</strong>
					<input
						type='email'
						className={handleClassName('email')}
						id='Email'
						name='email'
						placeholder='name@e-mail.com'
						value={email}
						onChange={handleChange}
					/>
					<h5>{(errors.email && `${errors.email}`) || (errors_.email && `${errors_.email}`)}</h5>
				</label>
				<div>
					<input className='submit__btn' type='submit' value='Send' />
				</div>
			</form>
		</Fragment>
	);
}

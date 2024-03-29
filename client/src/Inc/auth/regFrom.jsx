import React, { Fragment, useState } from 'react';
import useForm from '../../helpers/useForm';
import validate from '../../validators/validateRegister';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

function RegForm() {
	const history = useHistory();

	// you can acces an arrow function before declared but you can acces a normal function :\
	// const submit = () => {
	// 	console.log("Form submitted");
	// };

	const [formSchema, setformSchema] = useState({
		email: '',
		username: '',
		lastName: '',
		firstName: '',
		password: ''
	});

	const { handleSubmit, handleChange, values, errors } = useForm(submit, validate, formSchema, setformSchema);
	const [errors_, setErrors_] = useState({ email: '', username: '' });

	async function submit() {
		try {
			const { data } = await axios.post('http://localhost:5000/auth/validate/register', { values });
			if (data.status === 1) {
				const { email, username } = data.errors;
				setErrors_({ email, username });
			} else {
				setErrors_({ email: '', username: '' });
				Swal.fire({
					title: 'Cool!',
					text: 'Please check your e-mail to verify your account!',
					icon: 'success',
					confirmButtonText: 'close'
				});
				history.replace('/auth');
			}
		} catch (e) {}
	}

	const { email, username, password, firstName, lastName } = values;

	function handleClassName(field) {
		if (errors[field] || errors_[field]) {
			return 'danger';
		}
		return '';
	}

	return (
		<Fragment>
			<h2>Sign up.</h2>
			<p>You Don’t Have To Be Great To Start, But You Have To Start To Be Great.</p>
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
					/>
					<h5>{(errors.email && `${errors.email}`) || (errors_.email && `${errors_.email}`)}</h5>
				</label>
				<label htmlFor='Password'>
					<strong>Password.</strong>
					<input
						className={handleClassName('password')}
						name='password'
						type='password'
						id='Password'
						placeholder='at least 8 characters'
						value={password}
						onChange={handleChange}
					/>
					<h5>{errors.password && `${errors.password}`}</h5>
				</label>
				{/* <label className="checkbox">
					<input type="checkbox" />
					<span>keep me logged in</span>
				</label> */}
				<div>
					<input className='submit__btn' type='submit' value='Create Account' />
				</div>
			</form>
		</Fragment>
	);
}

export default RegForm;

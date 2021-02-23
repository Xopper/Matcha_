import React, { Fragment, useState } from 'react'; //rfc
import useForm from '../useForm';
import validate from '../validateRegister';
import axios from 'axios';
import Swal from 'sweetalert2';

function RegForm() {
	// you can acces an arrow function before declared but you can acces a normal function :\
	// const submit = () => {
	// 	console.log("Form submitted");
	// };

	const formSchema = {
		email: '',
		username: '',
		lastName: '',
		firstName: '',
		password: ''
	};

	const { handleSubmit, handleChange, values, errors } = useForm(submit, validate, formSchema);
	const [errors_, setErrors_] = useState({ email: '', username: '' });

	async function submit() {
		try {
			const res = await axios.post('http://localhost:5000/auth/validate/register', { values });
			const { data } = res;
			console.log(res);
			if (data.status === 1) {
				const { email, username } = data.errors;
				setErrors_({ email, username });
			} else {
				setErrors_({ email: '', username: '' });
				Swal.fire({
					title: 'Cool!',
					text: 'Save token and redirect to browse page',
					icon: 'success',
					confirmButtonText: 'close'
				});
				console.log(data);
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
					First name
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
					Last name
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
					Username
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
					<h5>{(errors.email && `${errors.email}`) || (errors_.email && `${errors_.email}`)}</h5>
				</label>
				<label htmlFor='Password'>
					Password
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
					<input type='submit' value='Create Account' />
				</div>
			</form>
		</Fragment>
	);
}

export default RegForm;

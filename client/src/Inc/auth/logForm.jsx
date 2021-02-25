import React, { Fragment, useContext } from 'react'; //rfc
import useForm from '../../helpers/useForm';
import validate from '../../validators/validateLogin';
import axios from 'axios';
import Swal from 'sweetalert2';
import { AuthContexts } from '../../Contexts/authContext';

function LogForm(props) {
	// you can acces an arrow function before declared but you can acces a normal function :\
	// const submit = () => {
	// 	console.log("Form submitted");
	// };

	const formSchema = {
		username: '',
		password: ''
	};

	const { handleSubmit, handleChange, values, errors, firstHitSubmit } = useForm(submit, validate, formSchema);
	const authContext = useContext(AuthContexts);

	async function submit() {
		try {
			const { data } = await axios.post('http://localhost:5000/authLogin/validate/login', { values });
			if (data.status === 1) {
				Swal.fire({
					title: 'Error!',
					text: data.errors.userNameOrPasswordError,
					icon: 'error',
					confirmButtonText: 'close'
				});
			} else {
				Swal.fire({
					title: 'Cool!',
					text: 'Save token and redirect to browse page',
					icon: 'success',
					confirmButtonText: 'close'
				});
				localStorage.setItem('token', data.authToken);
				authContext.setAuth({ token: data.authToken });
				console.log(data.authToken);
			}
		} catch (e) {}
	}

	const { username, password } = values;

	function handleClassName(field) {
		if (errors[field]) {
			return 'danger';
		} else if (!errors[field] && firstHitSubmit) {
			return '';
		}
		return '';
	}

	return (
		<Fragment>
			<h2>Sign in.</h2>
			<p>There Are No Limits To What You Can Accomplish, Except The Limits You Place On Your Own Thinking.</p>
			<form onSubmit={handleSubmit} noValidate>
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
					<h5>{errors.username && `${errors.username}`}</h5>
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
					<input className='submit__btn' type='submit' value='Login in' />
				</div>
			</form>
		</Fragment>
	);
}

export default LogForm;

import React, { Fragment, useState, useContext } from 'react';
import useForm from '../../helpers/useForm';
import validate from '../../validators/validateLogin';
import axios from 'axios';
import Swal from 'sweetalert2';
import { AuthContexts, socket } from '../../Contexts/authContext';
import { Link } from 'react-router-dom';

function LogForm() {
	const [formSchema, setFormSchema] = useState({
		username: '',
		password: ''
	});

	const { handleSubmit, handleChange, errors } = useForm(submit, validate, formSchema, setFormSchema);
	const authContext = useContext(AuthContexts);

	async function submit() {
		const values = { ...formSchema };
		try {
			const {
				data: { status, authToken, dataProfileIsComplited, errors, userName: loggedUser, userid }
			} = await axios.post('http://localhost:5000/authLogin/validate/login', { values });
			if (status === 1) {
				Swal.fire({
					title: 'Error!',
					text: errors.userNameOrPasswordError,
					icon: 'error',
					confirmButtonText: 'close'
				});
			} else {
				Swal.fire({
					toast: true,
					icon: 'success',
					title: 'Signed in Successfully',
					position: 'top-right',
					showConfirmButton: false,
					timer: 3000,
					timerProgressBar: true,
					didOpen: toast => {
						toast.addEventListener('mouseenter', Swal.stopTimer);
						toast.addEventListener('mouseleave', Swal.resumeTimer);
					}
				});

				// {Canceld} set the user as verified -- madam anaho dkhel donc rah verified
				// {Canceld} and check if the user has changed his verified status in the protected routes
				// and if his is completed his profile stor location credentials and tags
				// and change them evry time they changed
				// i think this the hard way , but any way we go for it
				// and finnaly stor the user's username and update it whenever the user change his username

				// update username auth token and location in one time is verified
				// update tags

				// lets work with the easy way BITCH
				// im gonna

				localStorage.setItem('token', authToken);
				authContext.setAuth(oldVals => ({
					...oldVals,
					token: authToken,
					isCompleted: dataProfileIsComplited,
					loggedUser,
					loggedID: userid
				}));
				socket.emit('usersConnected', loggedUser);
			}
		} catch (e) {}
	}

	const { username, password } = formSchema;

	function handleClassName(field) {
		if (errors[field]) {
			return 'danger';
		} else if (!errors[field]) {
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
				<div>
					<div className='forget__pass--text'>
						<Link to='/auth/forgetpass'>{`froget password ?`}</Link>
					</div>
					<input className='submit__btn' type='submit' value='Login in' />
				</div>
			</form>
		</Fragment>
	);
}

export default LogForm;

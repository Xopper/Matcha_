import React, { Fragment, useState, useEffect } from 'react';
import validate from '../../validators/validateResetAcc';
import axios from 'axios';
import { useHistory, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function ResetPass() {
	const history = useHistory();
	const params = useParams();
	const [userName, setUserName] = useState('');
	const [values, setValues] = useState({
		newPassword: '',
		confNewPassword: ''
	});

	useEffect(() => {
		const isValid = async () => {
			const { data } = await axios.get(
				`http://localhost:5000/passwordverification/passwordtokenverification/${params.token}`
			);
			console.log(data);
			if (data.status === 0) {
				setUserName(data.userName);
			} else {
				Swal.fire({
					title: 'Error!',
					text: 'Something went wrong!',
					icon: 'error',
					confirmButtonText: 'close'
				});
				history.replace('/auth');
			}
		};
		isValid();
	}, [params.token, history]);

	const { newPassword, confNewPassword } = values;

	const [errors, setErrors] = useState({});

	async function handlesubmit(e) {
		e.preventDefault();
		const newErrors = validate(values);
		setErrors(validate(values));
		if (Object.keys(newErrors).length === 0) {
			const { data } = await axios.post('http://localhost:5000/resetPassword/resetPasswordValidation', {
				userName,
				newPassword,
				confNewPassword
			});
			if (data.status === 0) {
				Swal.fire({
					title: 'YAAAP!',
					text: 'Password updated successfully!',
					icon: 'success',
					confirmButtonText: 'close'
				});
				history.replace('/auth');
			} else {
				// swal something went wrong
			}
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
			<h2>Reset Account.</h2>
			<p>Security Is Mostly A Superstition. Life Is Either A Daring Adventure Or Nothing.</p>
			<form onSubmit={e => handlesubmit(e)} noValidate>
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

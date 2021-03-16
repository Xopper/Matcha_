import React, { Fragment, useState, useContext } from 'react';
import validate from '../../validators/validateEditSec';
import axios from 'axios';
import { AuthContexts } from '../../Contexts/authContext';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function EditSec() {
	const history = useHistory();
	const [values, setValues] = useState({
		oldPassword: '',
		newPassword: '',
		confNewPassword: ''
	});

	const { oldPassword, newPassword, confNewPassword } = values;

	const [errors, setErrors] = useState({});
	const [errors_, setErrors_] = useState({ oldPassword: '' });

	const { auth } = useContext(AuthContexts);
	const { token } = auth;

	async function handlesubmit(e) {
		e.preventDefault();
		const newErrors = validate(values);
		setErrors(validate(values));
		if (Object.keys(newErrors).length === 0) {
			const instance = axios.create({
				headers: { Authorization: `Bearer ${token}` }
			});
			// console.log(`Bearer ${token}`);
			const { data } = await instance.post('http://localhost:5000/editPwd/editPwdValidator', values);
			if (data.status === 1) {
				const {
					errors: { oldPassword }
				} = data;
				setErrors_({ oldPassword });
			} else {
				setErrors_({ oldPassword: '' });
				Swal.fire({
					title: 'YAAAP!',
					text: 'Password updated successfully!',
					icon: 'success',
					confirmButtonText: 'close'
				});
				history.replace('/account/');
			}
		}
		// console.log(':(');
		// something went wrong
		// alredy set under inputs
	}

	function handleChange(e) {
		const { name, value } = e.target;
		setValues({ ...values, [name]: value });
	}

	function handleClassName(field) {
		if (errors[field] || errors_[field]) {
			return 'danger';
		}
		return '';
	}

	return (
		<Fragment>
			<h2>Editing Password.</h2>
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
					<h5>
						{(errors.oldPassword && `${errors.oldPassword}`) ||
							(errors_.oldPassword && `${errors_.oldPassword}`)}
					</h5>
					{/* <h5>{(errors.oldPassword && `${errors.oldPassword}`)}</h5> */}
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

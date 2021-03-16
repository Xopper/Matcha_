import React, { Fragment, useState, useContext, useEffect } from 'react'; //rfc
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import validate from '../../validators/validatePrefs';
import { AuthContexts } from '../../Contexts/authContext';
import axios from 'axios';
import Swal from 'sweetalert2';

async function getData(token) {
	const instance = axios.create({
		headers: { Authorization: `Bearer ${token}` }
	});
	// console.log(`Bearer ${token}`);
	const response = await instance.get('http://localhost:5000/getPreferences/prefs');
	return response;
}

function EditPrefs(props) {
	const [values, setValues] = useState({
		gender: '',
		interests: '',
		tags: []
	});

	// const [values, setValues] = useState({
	// 	gender: 'male',
	// 	interests: 'bi',
	// 	tags: ['tach', 'haw', 'TOTO']
	// });

	const [errors, setErrors] = useState({});

	const { auth } = useContext(AuthContexts);
	const { token } = auth;

	useEffect(() => {
		const data = async () => {
			const {
				data: {
					userPrefs: { gender, sexual_preference: interests },
					userTags: tags
				}
			} = await getData(token);
			setValues({
				gender,
				interests,
				tags
			});
			// console.log(gender, ' >> ', interests, ' >> ', tags);
		};
		data();
	}, [token]);

	async function handlesubmit(e) {
		e.preventDefault();
		const newErrors = validate(values);
		setErrors(validate(values));
		if (!Object.keys(newErrors).length) {
			const instance = axios.create({
				headers: { Authorization: `Bearer ${token}` }
			});
			// console.log(`Bearer ${token}`);
			const {
				data: { status }
			} = await instance.post('http://localhost:5000/editPrefs/prefsValidator', values);
			if (status === 0) {
				Swal.fire({
					title: 'YAAAP!',
					text: 'Preferences updated successfully!',
					icon: 'success',
					confirmButtonText: 'close'
				});
			} else {
				Swal.fire({
					title: 'NOOOPE!',
					text: 'Something went wrong. Try Again!',
					icon: 'error',
					confirmButtonText: 'close'
				});
			}
		} else {
			// console.log('Daaaamn :(');
		}
	}

	function addTag(e) {
		e.preventDefault();
		const { value: tag } = e.target;
		if (
			tag.trim() !== '' &&
			tag.trim().length <= 20 &&
			!values.tags.includes(tag.trim()) &&
			values.tags.length <= 4
		) {
			e.target.value = '';
			const oldTags = [...values.tags];
			setValues({ ...values, tags: [...oldTags, tag] });
		} else {
			e.target.value = '';
		}
		return;
	}

	function delTag(index) {
		let oldTags = [...values.tags];
		oldTags = oldTags.filter((val, i) => i !== index);
		setValues({ ...values, tags: [...oldTags] });
	}

	function handleChange(e) {
		const { name, value } = e.target;
		setValues({ ...values, [name]: value });
	}

	return (
		<Fragment>
			<h2>Be in Preferences.</h2>
			<p>When you choose your friends, don't be short-changed by choosing personality over character.</p>
			<form onSubmit={e => handlesubmit(e)} noValidate>
				<label className='labelSelect'>
					<strong>Choose your gender.</strong>
					<select value={values.gender} name='gender' className='select' onChange={e => handleChange(e)}>
						<option value='male'>Male</option>
						<option value='female'>Female</option>
					</select>
				</label>
				<label className='labelSelect'>
					<strong>Choose your interests.</strong>
					<select
						value={values.interests}
						name='interests'
						className='select'
						onChange={e => handleChange(e)}
					>
						<option value='bi'>bisexual</option>
						<option value='male'>Male</option>
						<option value='female'>Female</option>
					</select>
				</label>
				<label className='labelSelect'>
					<strong>Tags.</strong>
					<div className='tagsContainer'>
						<ul>
							{values.tags.map((tag, index) => (
								<li key={index}>
									<span>{tag} </span>
									<FontAwesomeIcon
										icon={faTimesCircle}
										className='clickable'
										onClick={() => delTag(index)}
									/>
								</li>
							))}
						</ul>
						{values.tags.length <= 4 && (
							<input
								type='text'
								placeholder='Press enter to add tags'
								onKeyPress={e => {
									e.key === 'Enter' && e.preventDefault();
									e.key === 'Enter' && addTag(e);
								}}
							/>
						)}
					</div>
					<h5>{errors.tags && `${errors.tags}`}</h5>
				</label>
				<div className='editPrefs__class--input'>
					<input className='submit__btn' type='submit' value='Save changes' />
				</div>
			</form>
		</Fragment>
	);
}

export default EditPrefs;

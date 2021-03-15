import React, { Fragment, useState, useEffect, useCallback, useContext } from 'react'; //rfc
import * as pubIP from 'public-ip';
import * as ipLocation from 'iplocation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import validate from '../../validators/validateSteps';
import axios from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { AuthContexts } from '../../Contexts/authContext';
import * as NodeGeocoder from 'node-geocoder';
import fetchS from 'node-fetch';
// import dayJs from 'dayjs';

const fetch = fetchS.bind();
const options = {
	provider: 'google',
	fetch,
	apiKey: 'AIzaSyB5hlCCROooAjmVavVJvlc9oyOT8IGttCI'
};

const GeoCoder = NodeGeocoder(options);

async function handleLocation(lat, lng) {
	try {
		const res = await GeoCoder.reverse({ lat, lon: lng });
		const { country } = res[0];
		return country;
	} catch (e) {}
	return 'unknown';
}

function StepForm(props) {
	const [values, setValues] = useState({
		gender: 'male',
		interests: 'bi',
		bio: '',
		birthday: '',
		profilePic1: '',
		profilePic2: '',
		profilePic3: '',
		profilePic4: '',
		profilePic5: '',
		tags: []
	});

	const [location, setLocation] = useState({
		latitude: null,
		longitude: null
	});

	const [userCountry, setUserCountry] = useState('unknown');

	const { auth, setAuth } = useContext(AuthContexts);

	const MySwal = withReactContent(Swal);

	const showPosition = useCallback(async pos => {
		const { latitude, longitude } = pos.coords;
		setLocation({ latitude, longitude });
		const country = await handleLocation(latitude, longitude);
		setUserCountry(country);
	}, []);

	const getLocation = useCallback(async err => {
		if (err.code) {
			try {
				const publicLoction = await pubIP.v4();
				const {
					latitude,
					longitude,
					country: { name: country }
				} = await ipLocation(publicLoction);
				console.log(latitude, longitude, country);
				setLocation({ latitude, longitude });
				setUserCountry(country);
			} catch (err) {}
		}
	}, []);

	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(showPosition, getLocation);
		}
	}, [showPosition, getLocation]);

	function handlesubmit(e) {
		e.preventDefault();
		console.log({ ...location, ...values, userCountry });

		const errors = validate(values);
		console.log(Object.keys(errors).length);
		if (Object.keys(errors).length !== 0) {
			const errorsContent = (
				<ul className='popErrors'>
					{Object.keys(errors).map((err, i) => (
						<li key={i}>{errors[err]}</li>
					))}
				</ul>
			);
			MySwal.fire({
				html: errorsContent,
				icon: 'error',
				confirmButtonText: 'close'
			});
		} else {
			const country = userCountry;
			console.log({ ...location, ...values, country });
			const { token } = auth;
			const instance = axios.create({
				headers: { Authorization: `Bearer ${token}` }
			});
			instance
				.post('http://localhost:5000/stepForm/stepFormValidator', { ...location, ...values, country })
				.then(res => {
					const { data } = res;
					if (data.status !== 0) {
						Swal.fire({
							title: 'NOOOPE!',
							text: 'Something went wrong. Try Again!',
							icon: 'error',
							confirmButtonText: 'close'
						});
					} else {
						// update isComplated state
						setAuth(oldState => ({
							...oldState,
							isCompleted: 1
						}));
						Swal.fire({
							title: 'YAAAP!',
							text: 'Your account is ready to Be in Matcha!',
							icon: 'success',
							confirmButtonText: 'close'
						});
					}
				})
				.catch(err => {});
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

	function handleFileSelect(event) {
		const inputName = event.target.name;
		const imageFile = event.target.files[0];
		const reader = new FileReader();

		if (!imageFile) {
			Swal.fire({
				title: 'OUUUUUUCH!',
				text: `Please Select an image`,
				icon: 'warning',
				confirmButtonText: 'close'
			});
			return false;
		}

		if (!imageFile.name.match(/\.(jpg|jpeg|png)$/)) {
			Swal.fire({
				title: 'OUUUUUUCH!',
				text: `Please select valid image.`,
				icon: 'warning',
				confirmButtonText: 'close'
			});
			return false;
		}

		reader.onload = e => {
			const img = new Image();
			img.onload = () => {};
			img.onerror = () => {
				Swal.fire({
					title: 'OUUUUUUCH!',
					text: `Invalid image content.`,
					icon: 'warning',
					confirmButtonText: 'close'
				});
				return false;
			};
			img.src = e.target.result;
			setValues({ ...values, [inputName]: img.src });
		};
		reader.readAsDataURL(imageFile);
	}

	return (
		<Fragment>
			<h2>Be in Matcha.</h2>
			<p>You Don’t Have To Be Great To Start, But You Have To Start To Be Great.</p>
			<form onSubmit={e => handlesubmit(e)} noValidate>
				<label className='labelSelect'>
					<strong>Choose your gender.</strong>
					<select name='gender' className='select' onChange={e => handleChange(e)}>
						<option value='male'>Male</option>
						<option value='female'>Female</option>
					</select>
				</label>
				<label className='labelSelect'>
					<strong>Choose your interests.</strong>
					<select name='interests' className='select' onChange={e => handleChange(e)}>
						<option value='bi'>bisexual</option>
						<option value='male'>Male</option>
						<option value='female'>Female</option>
					</select>
				</label>
				<label className='labelSelect'>
					<strong>Biography.</strong>
					<textarea name='bio' className='textArea' onChange={e => handleChange(e)} />
				</label>
				<label className='labelSelect'>
					<strong>Date of birth.</strong>
					<input type='date' name='birthday' onChange={e => handleChange(e)} />
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
				</label>
				<div className='uploadPic'>
					<strong>Profile photo.</strong>
					<input type='file' name='profilePic1' onChange={e => handleFileSelect(e)} />
				</div>
				<div className='otherPics'>
					<strong>Other photos.</strong>
					<input type='file' name='profilePic2' onChange={e => handleFileSelect(e)} />
					<input type='file' name='profilePic3' onChange={e => handleFileSelect(e)} />
					<input type='file' name='profilePic4' onChange={e => handleFileSelect(e)} />
					<input type='file' name='profilePic5' onChange={e => handleFileSelect(e)} />
				</div>
				<div>
					<input className='submit__btn' type='submit' value="Let's start!" />
				</div>
			</form>
		</Fragment>
	);
}

export default StepForm;

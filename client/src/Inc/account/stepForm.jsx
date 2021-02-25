import React, { Fragment, useState, useEffect, useCallback } from 'react'; //rfc
import * as pubIP from 'public-ip';
import * as ipLocation from 'iplocation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

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
		tags: ['tach', 'haw']
	});

	const [location, setLocation] = useState({
		latitude: null,
		longitude: null
	});

	const showPosition = useCallback(pos => {
		const { latitude, longitude } = pos.coords;
		setLocation({ latitude, longitude });
	}, []);

	const getLocation = useCallback(async err => {
		if (err.code) {
			try {
				const publicLoction = await pubIP.v4();
				const locationData = await ipLocation(publicLoction);
				const { latitude, longitude } = locationData;
				setLocation({ latitude, longitude });
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
		console.log('stepForm submited');
		console.log({ ...location, ...values });
		axios
			.post('http://localhost:5000/stepForm/stepFormValidator', { ...location, ...values })
			.then(res => {
				console.log(res.data);
			})
			.catch(err => {
				console.log(err);
			});
	}

	function addTag(e) {
		const { value: tag } = e.target;
		if (tag.trim() !== '' && tag.trim().length <= 20) {
			e.target.value = '';
			const oldTags = [...values.tags];
			setValues({ ...values, tags: [...oldTags, tag] });
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
			alert('please Select an image');
			return false;
		}

		if (!imageFile.name.match(/\.(jpg|jpeg|png)$/)) {
			alert('Please select valid image.');
			return false;
		}

		reader.onload = e => {
			const img = new Image();
			img.onload = () => {};
			img.onerror = () => {
				alert('Invalid image content.');
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
						<input
							type='text'
							placeholder='Press enter to add tags'
							onKeyPress={e => {
								e.key === 'Enter' && e.preventDefault();
								e.key === 'Enter' && addTag(e);
							}}
						/>
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
					<input type='file' name='profilePic' onChange={e => handleFileSelect(e)} />
				</div>
				<div>
					<input className='submit__btn' type='submit' value="Let's start!" />
				</div>
			</form>
		</Fragment>
	);
}

export default StepForm;

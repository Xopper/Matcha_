import React, { Fragment, useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { AuthContexts } from '../../Contexts/authContext';
import Swal from 'sweetalert2';

async function getData(token) {
	const instance = axios.create({
		headers: { Authorization: `Bearer ${token}` }
	});
	console.log(`Bearer ${token}`);
	const response = await instance.get('http://localhost:5000/getPictures/pics');
	return response;
}

export default function EditPics() {
	const [images, setImages] = useState({
		profilePic1: '',
		profilePic2: '',
		profilePic3: '',
		profilePic4: ''
	});

	const [avatar, setAvatar] = useState({
		avatarSrc: ''
	});

	const { auth } = useContext(AuthContexts);
	const { token } = auth;

	useEffect(() => {
		console.log(token);
		const data = async () => {
			const {
				data: { userPics }
			} = await getData(token);
			userPics.forEach((el, i) => {
				const keys = Object.keys(el);
				keys.forEach(element => {
					if (element === 'avatarSrc') {
						setAvatar({ avatarSrc: el[element] });
					} else {
						setImages(imgs => ({ ...imgs, [element]: el[element] }));
					}
				});
			});
		};
		data();
	}, [token]);

	async function handlesubmit(e) {
		// TODO check if avatar isn't null
		e.preventDefault();
		if (avatar.avatarSrc) {
			const instance = axios.create({
				headers: { Authorization: `Bearer ${token}` }
			});
			const {
				data: { status }
			} = await instance.post('http://localhost:5000/editPics/editPicsValidator', {
				...avatar,
				...images
			});
			console.log(status);
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
			console.log({ ...avatar, ...images });
		} else {
			Swal.fire({
				title: 'NOOOPE!',
				text: 'Please Select an image for your Profile!',
				icon: 'error',
				confirmButtonText: 'close'
			});
			console.log('error :(');
		}
	}

	function handleFileSelect(event) {
		const inputName = event.target.name;
		const imageFile = event.target.files[0];
		const reader = new FileReader();

		if (!imageFile) {
			Swal.fire({
				title: 'NOOOPE!',
				text: 'Please Select an image. Try Again!',
				icon: 'error',
				confirmButtonText: 'close'
			});
			return false;
		}

		if (!imageFile.name.match(/\.(jpg|jpeg|png)$/)) {
			Swal.fire({
				title: 'NOOOPE!',
				text: 'Please select valid image. Try Again!',
				icon: 'error',
				confirmButtonText: 'close'
			});
			return false;
		}

		reader.onload = e => {
			const img = new Image();
			img.onload = () => {};
			img.onerror = () => {
				Swal.fire({
					title: 'NOOOPE!',
					text: 'Invalid image content. Try Again!',
					icon: 'error',
					confirmButtonText: 'close'
				});
				return false;
			};
			img.src = e.target.result;
			if (inputName === 'avatar') {
				setAvatar({ avatarSrc: img.src });
			} else {
				// console.log(inputName, ' >> ', img.src);
				setImages({ ...images, [inputName]: img.src });
			}
		};
		reader.readAsDataURL(imageFile);
	}

	function handleDelete(e, imgSrc) {
		e.preventDefault();
		console.log('Delete btn hitted', imgSrc);
		if (imgSrc !== `avatarSrc` && typeof images[imgSrc] !== 'undefined') setImages({ ...images, [imgSrc]: '' });
		else setAvatar({ ...avatar, [imgSrc]: '' });
		console.log({ ...avatar, ...images });
	}

	return (
		<Fragment>
			<h2>Be in Pictures.</h2>
			<p>God gave us eyes to see the beauty in nature and hearts to see the beauty in each other.</p>
			<form onSubmit={e => handlesubmit(e)} noValidate>
				<div className='uploadPic'>
					<strong>Profile photo.</strong>
					{(avatar.avatarSrc && (
						<div className='loaded__image'>
							<div className='image__wrapper--btn'>
								<img src={avatar.avatarSrc} alt='avatar' />
								<button className='delete__btn' onClick={e => handleDelete(e, `avatarSrc`)}>
									<FontAwesomeIcon icon={faTrashAlt} />
								</button>
							</div>
						</div>
					)) || <input type='file' name='avatar' onChange={e => handleFileSelect(e)} />}
				</div>
				<div className='otherPics'>
					<strong>Other photos.</strong>
					{Object.keys(images).map(
						(img, index) =>
							(images[img] && (
								<div className='loaded__image' key={index}>
									<div className='image__wrapper--btn'>
										<img src={images[img]} alt={`${img}`} />
										<button className='delete__btn' onClick={e => handleDelete(e, img)}>
											<FontAwesomeIcon icon={faTrashAlt} />
										</button>
									</div>
								</div>
							)) || (
								<div className='loaded__image' key={index}>
									<input
										type='file'
										name={`${img}`}
										onChange={e => handleFileSelect(e, `${img}`)}
										key={index}
									/>
								</div>
							)
					)}
				</div>
				<div>
					<input className='submit__btn' type='submit' value='Update beuaty!' />
				</div>
			</form>
		</Fragment>
	);
}

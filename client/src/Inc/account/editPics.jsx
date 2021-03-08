import React, { Fragment, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

export default function EditPics() {
	const [images, setImages] = useState({
		profilePic1:
			'data:image/png;base64,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',
		profilePic2:
			'https://www.hindishayaricollections.com/wp-content/uploads/2020/03/beautifull-girls-images-download-46.jpg',
		profilePic3:
			'https://www.hindishayaricollections.com/wp-content/uploads/2020/03/beautifull-girls-images-download-46.jpg',
		profilePic4:
			'https://www.hindishayaricollections.com/wp-content/uploads/2020/03/beautifull-girls-images-download-46.jpg'
	});

	const [avatar, setAvatar] = useState({
		avatarSrc:
			'data:image/png;base64,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'
	});
	
	function handlesubmit(e) {
		// TODO check if avatar isn't null
		e.preventDefault();
		console.log({ ...avatar, ...images });
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
			// todo fix it [done]
			// console.log(inputName);
			// console.log(img.src);
			if (inputName === 'avatar') {
				setAvatar({ avatarSrc: img.src });
			} else {
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

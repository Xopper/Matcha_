import React, { Fragment, useState } from 'react'; //rfc
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

function EditPrefs(props) {
	const [values, setValues] = useState({
		gender: 'male',
		interests: 'bi',
		tags: ['tach', 'haw', 'TOTO']
	});

	function handlesubmit(e) {
		e.preventDefault();
		console.log(values);
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

	return (
		<Fragment>
			<h2>Be in Matcha.</h2>
			<p>Please fill all data before start matching.</p>
			<form onSubmit={e => handlesubmit(e)} noValidate>
				<label className='labelSelect'>
					Choose your gender:
					<select name='gender' className='select' onChange={e => handleChange(e)}>
						<option value='male'>Male</option>
						<option value='female'>Female</option>
					</select>
				</label>
				<label className='labelSelect'>
					Choose your interests:
					<select name='interests' className='select' onChange={e => handleChange(e)}>
						<option value='bi'>bisexual</option>
						<option value='male'>Male</option>
						<option value='female'>Female</option>
					</select>
				</label>
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
				<div className='editPrefs__class--input'>
					<input className='submit__btn' type='submit' value='Save changes' />
				</div>
			</form>
		</Fragment>
	);
}

export default EditPrefs;

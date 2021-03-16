import { isValidDate, getAge } from '../helpers/helpers';

export default function validateSteps(values) {
	let errors = {};

	// validate Biography
	if (!values.bio || values.bio.trim() === '') {
		errors.bio = 'Biography is required field.';
	} else if (!/^[a-zA-Z\s.]+$/.test(values.bio)) {
		errors.bio = 'Use only Alpha numeric characters.';
	} else if (values.bio.length < 8 || values.bio.length > 500) {
		errors.bio = 'Biography field length can be only between 8 and 500 characters.';
	}

	// validate date of birth
	if (!values.birthday || values.birthday.trim() === '') {
		errors.birthday = 'Date of birth is required field.';
	} else if (!isValidDate(values.birthday)) {
		errors.birthday = 'Invalid Date.';
	} else if (getAge(values.birthday) < 18) {
		errors.birthday = 'You must have 18 YO to be with us.';
	}

	// validate tags
	if (!values.tags || values.tags.length === 0) {
		errors.tags = 'Tags is required field.';
	}

	// validate avatar pic
	if (!values.profilePic1 || values.profilePic1.trim() === '') {
		errors.profilePic1 = 'Profile photo is required field.';
	}

	return errors;
}

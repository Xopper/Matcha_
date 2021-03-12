export default function validateEdit(values) {
	const errors = {};

	if (!values.firstName || values.firstName.trim() === '') {
		errors.firstName = 'First name is required field.';
	} else if (!/^([a-zA-Z ])+$/.test(values.firstName)) {
		errors.firstName = 'Use only alphabetic characters.';
	} else if (values.firstName.length < 3) {
		errors.firstName = 'First name must be at least 4 characters.';
	} else if (values.firstName.length > 12) {
		errors.firstName = 'First name must be less than 13 characters.';
	}

	if (!values.lastName || values.lastName.trim() === '') {
		errors.lastName = 'Last name is required field.';
	} else if (!/^([a-zA-Z ])+$/.test(values.lastName)) {
		errors.lastName = 'Use only alphabetic characters.';
	} else if (values.lastName.length < 3) {
		errors.lastName = 'Last name must be at least 4 characters.';
	} else if (values.lastName.length > 12) {
		errors.lastName = 'Last name must be less than 13 characters.';
	}

	// validating username
	if (!values.username || values.username.trim() === '') {
		errors.username = 'Username is required field.';
	} else if (!/^\w+$/.test(values.username)) {
		errors.username = 'Use only Alpha numeric characters.';
	} else if (values.username.length < 3) {
		errors.username = 'Username must be at least 4 characters.';
	} else if (values.username.length > 12) {
		errors.username = 'Username must be less than 13 characters.';
	}

	// validating Email
	if (!values.email || values.email.trim() === '') {
		errors.email = 'Email address is required field.';
	} else if (!/^([a-zA-Z._0-9-]+)@([a-zA-Z0-9]+[.]?)*([a-zA-Z0-9])(\.[a-zA-Z]{2,4})$/.test(values.email)) {
		errors.email = 'Email address is not valid.';
	}

	// validating birthDay
	if (!values.birthDay || values.birthDay.trim() === '') {
		errors.birthDay = 'Date of birth is required field.';
	} else if (getAge(values.birthDay) < 18) {
		errors.birthDay = 'You must have 18 YO to be with us.';
	}

	if (!values.biography || values.biography.trim() === '') {
		errors.biography = 'Biography is required field.';
	} else if (!/^[a-zA-Z\s.]+$/.test(values.biography)) {
		errors.biography = 'Use only Alpha numeric characters.';
	} else if (values.biography.length > 250) {
		errors.biography = 'Biography must be less than 250 characters.';
	}

	return errors;
}

export function getAge(date) {
	let dob = new Date(date);
	//calculate month difference from current date in time
	let month_diff = Date.now() - dob.getTime();

	//convert the calculated difference in date format
	let age_dt = new Date(month_diff);

	//extract year from date
	let year = age_dt.getUTCFullYear();

	//now calculate the age of the user
	let age = Math.abs(year - 1970);
	return age;
}

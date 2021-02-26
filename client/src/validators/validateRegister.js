export default function validateRegister(values) {
	let errors = {};

	// validating Email
	if (!values.email || values.email.trim() === '') {
		errors.email = 'Email address is required field.';
	} else if (!/^([a-zA-Z._0-9-]+)@([a-zA-Z0-9]+[.]?)*([a-zA-Z0-9])(\.[a-zA-Z]{2,4})$/.test(values.email)) {
		errors.email = 'Email address is not valid.';
	}
	// ba9a unique f data base {from backend}

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
	// ba9a unique f database

	// validate first Name
	if (!values.firstName || values.firstName.trim() === '') {
		errors.firstName = 'First name is required field.';
	} else if (!/^([a-zA-Z ])+$/.test(values.firstName)) {
		errors.firstName = 'Use only alphabetic characters.';
	} else if (values.firstName.length < 3) {
		errors.firstName = 'First name must be at least 4 characters.';
	} else if (values.firstName.length > 12) {
		errors.firstName = 'First name must be less than 13 characters.';
	}

	// validate Last name
	if (!values.lastName || values.lastName.trim() === '') {
		errors.lastName = 'Last name is required field.';
	} else if (!/^([a-zA-Z ])+$/.test(values.lastName)) {
		errors.lastName = 'Use only alphabetic characters.';
	} else if (values.lastName.length < 3) {
		errors.lastName = 'Last name must be at least 4 characters.';
	} else if (values.lastName.length > 12) {
		errors.lastName = 'Last name must be less than 13 characters.';
	}

	// validate Password
	if (!values.password) {
		errors.password = 'Password is required field.';
	} else if (
		!/(?=.{8,32})(?=.*[A-Z])(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])(?=.*[a-z])(?=.*\d).*$/.test(values.password)
	) {
		errors.password = 'Use [lower-Upper] case, special chars and numbers.';
	} else if (values.password.length <= 8) {
		errors.password = 'Password must be at least 8 characters.';
	} else if (values.password.length > 32) {
		errors.password = 'Password must be less than 32 characters.';
	}
	return errors;
}

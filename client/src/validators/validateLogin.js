export default function validateLogin(values) {
	let errors = {};

	// validating username
	if (!values.username || values.username.trim() === '') {
		errors.username = 'Username is required field.';
	} else if (!/^\w+$/.test(values.username)) {
		errors.username = 'Invalid username.';
	} else if (values.username.length < 3) {
		errors.username = 'Invalid username.';
	} else if (values.username.length > 12) {
		errors.username = 'Invalid username.';
	}

	// TODO {insert valid reg expression} [Done]
	// validate Password

	if (!values.password) {
		errors.password = 'Password is required field.';
	} else if (
		!/(?=.{8,32})(?=.*[A-Z])(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])(?=.*[a-z])(?=.*\d).*$/.test(values.password)
	) {
		errors.password = 'Incorrect password.';
	} else if (values.password.length <= 8) {
		errors.password = 'Incorrect password.';
	} else if (values.password.length > 32) {
		errors.password = 'Incorrect password.';
	}
	return errors;
}

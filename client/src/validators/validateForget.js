export default function validateForget(values) {
	const errors = {};

	// validating Email
	if (!values.email || values.email.trim() === '') {
		errors.email = 'Email address is required field.';
	} else if (!/^([a-zA-Z._0-9-]+)@([a-zA-Z0-9]+[.]?)*([a-zA-Z0-9])(\.[a-zA-Z]{2,4})$/.test(values.email)) {
		errors.email = 'Email address is not valid.';
	}

	return errors;
}

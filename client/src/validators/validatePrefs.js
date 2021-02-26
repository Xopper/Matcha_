export default function validatePrefs(values) {
	let errors = {};

	// validate tags
	if (!values.tags || values.tags.length === 0) {
		errors.tags = 'Tags is required field.';
	}

	return errors;
}

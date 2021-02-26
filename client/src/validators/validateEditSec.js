export default function validateRegister(values) {
	let errors = {};

	// validate Passw
	if (!values.oldPassword) {
		errors.oldPassword = 'Password is required field.';
	} else if (
		!/(?=.{8,32})(?=.*[A-Z])(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])(?=.*[a-z])(?=.*\d).*$/.test(values.password)
	) {
		errors.oldPassword = 'Incorrect password.';
	} else if (values.oldPassword.length <= 8) {
		errors.oldPassword = 'Incorrect password.';
	} else if (values.oldPassword.length > 32) {
		errors.oldPassword = 'Incorrect password.';
	}

	if (!values.newPassword) {
		errors.newPassword = 'New password is required field.';
	} else if (
		!/(?=.{8,32})(?=.*[A-Z])(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])(?=.*[a-z])(?=.*\d).*$/.test(values.password)
	) {
		errors.newPassword = 'Use [lower-Upper] case, special chars and numbers.';
	} else if (values.newPassword.length <= 8) {
		errors.newPassword = 'New password must be at least 8 characters.';
	} else if (values.newPassword.length > 32) {
		errors.newPassword = 'New password must be less than 32 characters.';
	}

	if (!values.confNewPassword) {
		errors.confNewPassword = 'Password confirmation is required field.';
	} else if (
		!/(?=.{8,32})(?=.*[A-Z])(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])(?=.*[a-z])(?=.*\d).*$/.test(values.password)
	) {
		errors.confNewPassword = 'Use [lower-Upper] case, special chars and numbers.';
	} else if (values.confNewPassword.length <= 8) {
		errors.confNewPassword = 'Password confirmation must be at least 8 characters.';
	} else if (values.confNewPassword.length > 32) {
		errors.confNewPassword = 'Password confirmation must be less than 32 characters.';
	} else if (values.newPassword !== values.confNewPassword) {
		errors.confNewPassword = 'Password confirmation does not match new password.';
	}
	return errors;
}

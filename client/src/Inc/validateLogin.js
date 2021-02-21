export default function validateLogin(values) {
	let errors = {};

	// validating username
	if (!values.username || values.username.trim() === "") {
		errors.username = "Username is required field.";
	} else if (!/^\w+$/.test(values.username)) {
		errors.username = "Use only Alpha numeric characters.";
	} else if (values.username.length < 3) {
		errors.username = "Username must be at least 4 characters.";
	} else if (values.username.length > 12) {
		errors.username = "Username must be less than 13 characters.";
	}
	// ba9a unique f database [men l backEnd]

	// TODO {insert valid reg expression} [Done]
	// validate Password
	if (!values.password) {
		errors.password = "Password is required field.";
	} else if (!/(?=.{8,32})(?=.*[A-Z])(?=.*[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~])(?=.*[a-z])(?=.*\d).*$/.test(values.password)) {
		errors.password = "Use [lower-Upper] case, special chars and numbers.";
	} else if (values.password.length <= 8) {
		errors.password = "Password must be at least 8 characters.";
	} else if (values.password.length > 32) {
		errors.password = "Password must be less than 32 characters.";
	}
	return errors;
}

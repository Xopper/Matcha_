import { useState } from 'react';

function useForm(callback, validate, values, setValues) {
	const [errors, setErrors] = useState({});

	const handleChange = e => {
		const { name, value } = e.target;
		setValues(oldValues => ({
			...oldValues,
			[name]: value
		}));
	};

	const handleSubmit = e => {
		e.preventDefault();
		const newErrors = validate(values);
		console.log(newErrors);
		setErrors(newErrors);
		if (Object.keys(newErrors).length === 0) {
			callback();
		}
	};

	return {
		handleChange,
		handleSubmit,
		values,
		errors
	};
}

export default useForm;

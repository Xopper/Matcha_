import { useState } from 'react';

function useForm(callback, validate, values, setValues) {
	const [errors, setErrors] = useState({});

	const handleChange = e => {
		const { name, value } = e.target;
		setValues({
			...values,
			[name]: value // using [] is a way to acces unkown property in an object :)
		});
	};

	const handleSubmit = e => {
		e.preventDefault();
		const newErrors = validate(values);
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

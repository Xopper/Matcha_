import { useState } from 'react';

function useForm(callback, validate, data, setData) {
	const [errors, setErrors] = useState({});

	const handleChange = e => {
		const { name, value } = e.target;
		setData({
			...data,
			[name]: value // using [] is a way to acces unkown property in an object :)
		});
	};

	const handleSubmit = e => {
		e.preventDefault();
		const newErrors = validate(data);
		setErrors(newErrors);
		if (Object.keys(newErrors).length === 0) {
			callback();
		}
	};

	return {
		handleChange,
		handleSubmit,
		data,
		errors
	};
}

export default useForm;

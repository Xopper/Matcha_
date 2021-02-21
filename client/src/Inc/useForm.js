import { useState, useEffect } from "react";

function useForm(callback, validate, formSchema) {
	const [values, setValues] = useState(formSchema);
	const [errors, setErrors] = useState({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [firstHitSubmit, setfirstHitSubmit] = useState(false);

	const handleChange = e => {
		const { name, value } = e.target;
		setValues({
			...values,
			[name]: value // using [] is a way to acces unkown property in an object :)
		});
		setIsSubmitting(false);
	};

	const handleSubmit = e => {
		e.preventDefault();
		const newErrors = validate(values);
		setErrors(newErrors);
		setIsSubmitting(true);
		setfirstHitSubmit(true);
	};

	useEffect(() => {
		// console.log(errors);
		if (Object.keys(errors).length === 0 && isSubmitting) {
			callback();
		}
	}); // when you put [] that means it will run only in the first mount

	return {
		handleChange,
		handleSubmit,
		firstHitSubmit,
		values,
		errors
	};
}

export default useForm;

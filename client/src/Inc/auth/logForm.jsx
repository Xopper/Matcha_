import React, { Fragment } from 'react'; //rfc
import useForm from '../useForm';
import validate from '../validateLogin';
import axios from 'axios'
// import MapWithAMarker from '../streetMap';

function LogForm(props) {
	// you can acces an arrow function before declared but you can acces a normal function :\
	// const submit = () => {
	// 	console.log("Form submitted");
	// };

	const formSchema = {
		username: '',
		password: ''
	};

	const { handleSubmit, handleChange, values, errors, firstHitSubmit } = useForm(submit, validate, formSchema);

	function submit() {
		console.log('Form submitted');
		// alert(JSON.stringify(values));
		axios.post("http://localhost:5000/authLogin/validate/login", {values}).then(res =>{
			console.log(">>Login responde", res.data)
		}).catch(err =>{
			console.log(err)
		})
	}

	const { username, password } = values;

	function handleClassName(field) {
		if (errors[field]) {
			return 'danger';
		} else if (!errors[field] && firstHitSubmit) {
			return '';
		}
		return '';
	}

	return (
		<Fragment>
			<h2>Sign in.</h2>
			<p>There Are No Limits To What You Can Accomplish, Except The Limits You Place On Your Own Thinking.</p>
			<form onSubmit={handleSubmit} noValidate>
				<label htmlFor="username">
					Username
					<input
						className={handleClassName('username')}
						name="username"
						type="text"
						id="username"
						placeholder="username to connect"
						value={username}
						onChange={handleChange}
					/>
					<h5>{errors.username && `${errors.username}`}</h5>
				</label>
				<label htmlFor="Password">
					Password
					<input
						className={handleClassName('password')}
						name="password"
						type="password"
						id="Password"
						placeholder="at least 8 characters"
						value={password}
						onChange={handleChange}
					/>
					<h5>{errors.password && `${errors.password}`}</h5>
				</label>
				{/* <label className="checkbox">
					<input type="checkbox" />
					<span>keep me logged in</span>
				</label> */}
				<div>
					<input type="submit" value="Login in" />
				</div>
			</form>
		</Fragment>
	);
}

export default LogForm;

import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

async function getResponse(token) {
	const response = await axios.get(`http://localhost:5000/emailverification/tokenverification/${token}`);
	return response;
}

function Confirm() {
	const { token } = useParams();
	// const history = useHistory();

	useEffect(() => {
		if (/^[a-zA-Z0-9._-]+$/.test(token)) {
			const data = async () => {
				const { status } = await getResponse(token);
				console.log(status);
				if (status === 0) {
					// kolchi zaz
				} else {
					// umm machi zaz
				}
			};
			data();
		} else {
			// swal pop-up
			// invalid token
			// replace to /auth
			// history.replace();
			console.log('Invalid Token');
		}
	}, [token]);

	// ^[a-zA-Z0-9._]+$
	// if (!/^[a-zA-Z0-9._]+$/.test(token)) {
	// 	history.replace();
	// }
	// redirect to login any ways
	return <div />;
}

export default Confirm;

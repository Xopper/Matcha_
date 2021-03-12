import { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

async function getResponse(token) {
	const response = await axios.get(`http://localhost:5000/emailverification/tokenverification/${token}`);
	return response;
}

function Confirm() {
	const { token } = useParams();
	const history = useHistory();

	useEffect(() => {
		if (/^[a-zA-Z0-9._-]+$/.test(token)) {
			const data = async () => {
				const {
					data: { status }
				} = await getResponse(token);
				console.log(status);
				if (status === 0) {
					Swal.fire({
						title: 'YAAAP!',
						text: 'Your account has been verified successfully!',
						icon: 'success',
						confirmButtonText: 'close'
					});
				} else {
					// umm machi zaz
					Swal.fire({
						title: 'NOOOPE!',
						text: 'Something went wrong. Try Again!',
						icon: 'error',
						confirmButtonText: 'close'
					});
				}
			};
			data();
			history.replace('/auth');
		} else {
			// invalid token
			Swal.fire({
				title: 'NOOOPE!',
				text: 'Something went wrong. Try Again!',
				icon: 'error',
				confirmButtonText: 'close'
			});
			history.replace('/auth');
		}
	}, [token, history]);

	return null;
}

export default Confirm;

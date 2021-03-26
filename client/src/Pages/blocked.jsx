import React, { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackspace } from '@fortawesome/free-solid-svg-icons';
import { AuthContexts } from '../Contexts/authContext';
import { getInstance } from '../helpers/helpers';
import Swal from 'sweetalert2';

async function getData(token) {
	const response = await getInstance(token).get('http://localhost:5000/getBlockedProfiles/Bockedprofiles');
	return response;
}

async function delData(token, username) {
	const response = await getInstance(token).post('http://localhost:5000/unblock/unblockUser', {
		userName: username
	});
	return response;
}

export default function Blocked() {
	const {
		auth: { token }
	} = useContext(AuthContexts);

	const [blocked, setBlocked] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	async function handleDelete(username, id) {
		const {
			data: { status }
		} = await delData(token, username);
		if (status === 0) {
			setBlocked(oldVlas => {
				const pos = oldVlas.map(item => item.id).indexOf(id);
				return oldVlas.filter((item, index) => index !== pos);
			});
		} else {
			Swal.fire({
				title: 'NOOOPE!',
				text: 'Something went wrong. Try Again!',
				icon: 'error',
				confirmButtonText: 'close'
			});
		}
	}

	useEffect(() => {
		(async () => {
			const {
				data: { profileBlocked, status }
			} = await getData(token);
			console.log(profileBlocked);
			if (status === 0 && profileBlocked.length !== 0) {
				console.log(profileBlocked);
				setBlocked(profileBlocked);
				setIsLoading(false);
			} else {
				setIsLoading(false);
			}
		})();
	}, [token]);

	/**
	 * please try to standrize the back-ends calls
	 * for all Actions {handleLike }
	 */
	if (isLoading && blocked.length === 0) return null;
	// todo bsita give it some classes :)
	if (!isLoading && blocked.length === 0) return <div className='empty__data'>no blocked for you!</div>;
	return (
		<div className='notifications__container'>
			<div className='notifications__wrapper'>
				{blocked.map(({ avatar, id, username }) => (
					<div className='notification__card' key={id}>
						<div className='notification__user__img'>
							<img src={avatar} alt='img' />
						</div>
						<div className='notification__user__content'>
							<div className='notif__user__text'>{username}</div>
						</div>
						{/**chack if the user is logged or not */}
						<div className='notification__user__delete' onClick={() => handleDelete(username, id)}>
							<FontAwesomeIcon icon={faBackspace} size='lg' />
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

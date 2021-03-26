import React, { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { AuthContexts } from '../Contexts/authContext';
import { getInstance } from '../helpers/helpers';
import Moment from 'react-moment';
import Swal from 'sweetalert2';

async function getData(token) {
	const response = await getInstance(token).get('http://localhost:5000/getHistory/getUserHistory');
	return response;
}

async function delData(token, notifID) {
	const response = await getInstance(token).post('http://localhost:5000/deleteHistory/deleteUserHistory', {
		notificationId: notifID
	});
	return response;
}

export default function History() {
	const {
		auth: { token }
	} = useContext(AuthContexts);

	const [history, setHistory] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	async function handleDelete(notifID) {
		const {
			data: { status }
		} = await delData(token, notifID);
		if (status === 0) {
			setHistory(oldVlas => {
				const pos = oldVlas.map(item => item.notifID).indexOf(notifID);
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
				data: { notifications, status }
			} = await getData(token);
			if (status === 0 && notifications.empty === 0) {
				console.log(notifications);
				setHistory(notifications.history);
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
	if (isLoading && history.length === 0) return null;
	// todo bsita give it some classes :)
	if (!isLoading && history.length === 0) return <div className='empty__data'>no history for you!</div>;
	return (
		<div className='notifications__container'>
			<div className='notifications__wrapper'>
				{history.map(({ avatar, from, notifType, notifyAt, notifID }) => (
					<div className='notification__card' key={notifID}>
						<div className='notification__user__img'>
							<img src={avatar} alt='img' />
						</div>
						<div className='notification__user__content'>
							<div className='notif__user__text'>
								{(() => {
									if (notifType === 5) return 'you visited ';
									return null;
								})()}
								{`${from}'s profile.`}
							</div>
							<div className='notif__user__at'>
								<Moment fromNow>{notifyAt}</Moment>
							</div>
						</div>
						{/**chack if the user is logged or not */}
						<div className='notification__user__delete' onClick={() => handleDelete(notifID)}>
							<FontAwesomeIcon icon={faTrashAlt} size='lg' />
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

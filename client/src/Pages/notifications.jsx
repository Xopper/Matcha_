import React, { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { AuthContexts } from '../Contexts/authContext';
import Moment from 'react-moment';
import axios from 'axios';
import Swal from 'sweetalert2';

async function getData(token) {
	const instance = axios.create({
		headers: { Authorization: `Bearer ${token}` }
	});
	const response = await instance.get('http://localhost:5000/getNotifications/getUserNotifications');
	return response;
}

async function delData(token, notifID) {
	const instance = axios.create({
		headers: { Authorization: `Bearer ${token}` }
	});
	const response = await instance.post('http://localhost:5000/deleteNotifications/deleteUserNotification', {
		notificationId: notifID
	});
	return response;
}

export default function Notifs() {
	const {
		auth: { token }
	} = useContext(AuthContexts);

	const [notifications, setNotifications] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	async function handleDelete(notifID) {
		const {
			data: { status }
		} = await delData(token, notifID);
		if (status === 0) {
			setNotifications(oldVlas => {
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
		// http://localhost:5000/getNotifications/getUserNotifications
		(async () => {
			const {
				data: { notifications, status }
			} = await getData(token);
			if (status === 0 && notifications.empty === 0) {
				setNotifications(notifications.notifications);
				// setNotifications(notifications);
				setIsLoading(false);
			} else {
				setIsLoading(false);
			}
		})();
	}, []);

	/**
	 * please try to standrize the back-ends calls
	 * for all Actions {handleLike }
	 */
	if (isLoading && notifications.length === 0) return null;
	// todo bsita give it some classes :)
	if (!isLoading && notifications.length === 0) return <div>hahahah no notification!</div>;
	return (
		<div className='notifications__container'>
			<div className='notifications__wrapper'>
				{notifications.map(({ avatar, from, notifType, notifyAt, notifID }) => (
					<div className='notification__card' key={notifID}>
						<div className='notification__user__img'>
							<img src={avatar} alt='img' />
						</div>
						<div className='notification__user__content'>
							<div className='notif__user__text'>
								{`${from} has `}
								{(() => {
									if (notifType === 1) return 'liked your profile!';
									if (notifType === 2) return 'unliked your profile!';
									if (notifType === 3) return 'liked you back!';
									if (notifType === 5) return 'checked your profile!';
									return null;
								})()}
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

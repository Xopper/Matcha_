import React, { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { CSSTransition } from 'react-transition-group';
import { AuthContexts, socket } from '../Contexts/authContext';
import axios from 'axios';
import ScrollableFeed from 'react-scrollable-feed';

async function getConnectedUsrs(token) {
	const instance = axios.create({
		headers: { Authorization: `Bearer ${token}` }
	});
	const response = await instance.get('http://localhost:5000/getConnectedUsers');
	return response;
}

async function sendData(token, values) {
	const instance = axios.create({
		headers: { Authorization: `Bearer ${token}` }
	});
	const response = await instance.post('http://localhost:5000/storeConversations/storeMessage', values);
	return response;
}

async function getConversations(token, receiverID) {
	console.log(receiverID);
	const instance = axios.create({
		headers: { Authorization: `Bearer ${token}` }
	});
	const response = await instance.post('http://localhost:5000/conversations/messages', {
		receiver: receiverID
	});
	return response;
}

function Messanger() {
	const [activeMenu, setActiveMenu] = useState('users');
	const [connectedUsers, setConnectedUsers] = useState([]);
	const [receiver, setReceiver] = useState({ id: null, username: '', avatar: '' });
	const [msgContent, setMsgContent] = useState('');
	const [conversation, setConversation] = useState([]);
	const { auth } = useContext(AuthContexts);
	const { token, socketID, loggedUser, loggedID } = auth;

	async function sendMsg(rec, recUser) {
		console.log(rec);
		if (msgContent.trim() === '') {
			console.log('test');
		} else {
			console.log(rec);
			const value = {
				receiver_id: rec,
				messages: msgContent,
				sender_id: loggedID,
				reciverUsername: recUser
			};
			const valsToback = {
				receiver: rec,
				message: msgContent
			};

			setConversation(conversation?.concat(value));
			socket.emit('newMsg', value);
			setMsgContent('');
			try {
				const res = await sendData(token, valsToback);
				console.log(res);
			} catch (e) {}
		}
	}
	const handleConversation = ({ target: { value } }) => {
		setMsgContent(value);
	};

	async function handleSelectUser(receiverID) {
		const { data } = await getConversations(token, receiverID);
		if (data.status === 0) {
			const {
				conversation: { messages }
			} = data;
			setConversation(messages);
			console.log(messages);
		}
	}

	useEffect(() => {
		console.log('okey something happend');
		const data = async () => {
			const { data } = await getConnectedUsrs(token);
			console.log(data);
			if (data.status === 0) {
				// setConnectedUsers(oldVals => [...oldVals, ...data.connectedUsers]);
				if (typeof data.connectedUsers !== 'string') {
					console.log(data.connectedUsers);
					setConnectedUsers(data.connectedUsers);
				}
				console.log(data.connectedUsers);
				console.log(data);
			} else {
				console.log('something Went wrong!');
			}
		};
		data();

		/**
		 *
		 */
		socket.on('msgRec', function (data) {
			// if (receiver.id) {
			setConversation(old => old.concat(data));
			// }
			// console.log(data);
		});
	}, [token]);

	return (
		<div className='chat__container'>
			<div className='chat__box'>
				<CSSTransition in={activeMenu === 'users'} unmountOnExit timeout={500} classNames='menu-primary'>
					<div className='chat__box__users'>
						<div className='chat__box__users__name'>
							<h1>Chat</h1>
						</div>
						<div className='chat__box__users__cardWraper'>
							{connectedUsers.length !== 0 ? (
								connectedUsers.map(({ id, profile_img: avatar, user_name: username }) => (
									<div
										className='chat__box__users__card'
										key={id}
										onClick={() => {
											setReceiver({ id, username, avatar });
											handleSelectUser(id);
											setActiveMenu('chat');
										}}
									>
										<div>
											<img src={avatar} width='70%' height='70%' />
										</div>
										<div>
											<h4>{username}</h4>
											{/**TODO */}
											{/* <p className='last__msg'>
											Lorem, ipsum dolor sit amet consectetur adipisicing elit. A asperiores
											consectetur accusamus sint? Placeat recusandae itaque nisi aliquid
											accusantium fugit!
										</p> */}
										</div>
										<div>{/* <span>6</span> */}</div>
										{/**TODO later :) */}
										{/* <span className='time'>30min ago</span> */}
									</div>
								))
							) : (
								<span className='no__matches'>there is no matches.</span>
							)}
						</div>
					</div>
				</CSSTransition>
				{receiver.id && (
					<CSSTransition in={activeMenu === 'chat'} unmountOnExit timeout={500} classNames='menu-secondary'>
						<div className='chat__box__messages'>
							<div className='chat__box__messages__card' onClick={() => setActiveMenu('users')}>
								<div>
									<img src={receiver.avatar} width='60px' height='60px' />
								</div>
								<div>
									<h4>{receiver.username}</h4>
								</div>
							</div>
							<div className='chat__box__messages__wraper'>
								{/* <div > */}
								<ScrollableFeed className='chat__box__messages__wraper__discussion'>
									{conversation.map((msg, index) => (
										<div
											className={
												parseInt(msg.sender_id) === receiver.id
													? 'chat__box__msg receiver'
													: 'chat__box__msg sender'
											}
											key={index}
										>
											<p>{msg.messages}</p>
										</div>
										// <div className='chat__box__msg reciver'>
										// 	<p>{msg.msgcontent}</p>
										// </div>
										// <div></div>
									))}
								</ScrollableFeed>
								{/* </div> */}
								<div className='chat__box__messages__wraper__input'>
									<input
										type='text'
										placeholder='Type Something ...'
										onChange={handleConversation}
										value={msgContent}
									/>
									<div>
										<span>
											<FontAwesomeIcon
												icon={faPaperPlane}
												onClick={() => sendMsg(receiver.id, receiver.username)}
												style={{
													width: '60%',
													height: '60%',
													position: 'absolute',
													top: '50%',
													left: '45%',
													transform: 'translate(-50%, -50%)'
												}}
											/>
										</span>
									</div>
								</div>
							</div>
						</div>
					</CSSTransition>
				)}
			</div>
		</div>
	);
}

export default Messanger;

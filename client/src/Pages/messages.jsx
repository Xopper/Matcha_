import React, { useState, useEffect, useContext, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { CSSTransition } from 'react-transition-group';
import { AuthContexts, socket } from '../Contexts/authContext';
import { getInstance } from '../helpers/helpers';
import ScrollableFeed from 'react-scrollable-feed';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

async function getConnectedUsrs(token) {
	const response = await getInstance(token).get('http://localhost:5000/getConnectedUsers');
	return response;
}

async function sendData(token, values) {
	const response = await getInstance(token).post('http://localhost:5000/storeConversations/storeMessage', values);
	return response;
}

async function getConversations(token, receiverID) {
	const response = await getInstance(token).post('http://localhost:5000/conversations/messages', {
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
	const { token, loggedID } = auth;
	const history = useHistory();

	async function sendMsg(rec, recUser) {
		console.log(rec);
		if (msgContent.trim() === '' || msgContent.trim().length >= 50 || !/^[a-z0-9A-Z\s@#.]+$/.test(msgContent)) {
			console.log('test');
			setMsgContent('');
		} else {
			console.log(rec);
			const value = {
				receiver_id: rec,
				messages: msgContent.trim(),
				sender_id: loggedID,
				reciverUsername: recUser
			};
			const valsToback = {
				receiver: rec,
				message: msgContent.trim()
			};

			setMsgContent('');
			try {
				const { data } = await sendData(token, valsToback);
				if (data.status === 0) {
					setConversation(conversation?.concat(value));
					socket.emit('newMsg', value);
				} else {
					Swal.fire({
						title: 'OUUUUUUCH!',
						text: 'Something went wrong. Try Again!',
						icon: 'warning',
						confirmButtonText: 'close'
					});
					history.go();
				}
			} catch (e) {}
		}
	}
	const handleConversation = ({ target: { value } }) => {
		setMsgContent(value);
	};

	async function handleSelectUser(receiverID) {
		const { data } = await getConversations(token, receiverID);
		console.log(data);
		if (data.status === 0) {
			if (typeof data.conversation !== 'undefined') {
				const {
					conversation: { messages }
				} = data;
				setConversation(messages);
				console.log(messages);
			} else {
				setConversation([]);
				console.log('hooooooooooooowwwowowowowowow');
			}
		}
	}

	const nodeRef = useRef(null);
	const nodeRefTwo = useRef(null);

	useEffect(() => {
		(async () => {
			const { data } = await getConnectedUsrs(token);
			console.log(data);
			if (data.status === 0) {
				if (typeof data.connectedUsers !== 'string') {
					console.log(data.connectedUsers);
					setConnectedUsers(data.connectedUsers);
				}
				console.log(data.connectedUsers);
				console.log(data);
			} else {
				console.log('something Went wrong!');
			}
		})();

		socket.on('msgRec', function (data) {
			// if (receiver.id) {
			setConversation(old => old.concat(data));
		});
	}, [token]);

	return (
		<div className='chat__container'>
			<div className='chat__box'>
				<CSSTransition
					in={activeMenu === 'users'}
					unmountOnExit
					timeout={500}
					classNames='menu-primary'
					nodeRef={nodeRef}
				>
					<div className='chat__box__users' ref={nodeRef}>
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
											<img src={avatar} width='70%' height='70%' alt='tacos' />
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
					<CSSTransition
						in={activeMenu === 'chat'}
						unmountOnExit
						timeout={500}
						classNames='menu-secondary'
						nodeRef={nodeRefTwo}
					>
						<div className='chat__box__messages' ref={nodeRefTwo}>
							<div className='chat__box__messages__card' onClick={() => setActiveMenu('users')}>
								<div>
									<img src={receiver.avatar} width='60px' height='60px' alt='tacos' />
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

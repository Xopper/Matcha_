import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMale, faFemale, faUsers } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function Home(props) {
	const [data, setData] = useState({
		men: 0,
		women: 0
	});
	useEffect(() => {
		(async () => {
			const {
				data: { users }
			} = await axios.get('http://localhost:5000/getUsers/getAllUsers');
			setData({
				men: users.men,
				women: users.women
			});
		})();
	}, []);
	return (
		<>
			<div className='home'>
				<div className='home__wapper'>
					<div className='home__first_section'>
						<div>
							<h1>Connecting with your customers</h1>
							<p>
								Deliver great expriences, no matter what. We can help with scalabe messaging for sales,
								marketing, and support
							</p>
						</div>
						<div className='home__inputs'>
							<input type='text' placeholder='Enter email' />
							<input type='submit' value='submit' />
						</div>
					</div>

					<div className='home__second_section'>
						<img src='./img/chat_image.svg' alt='chat' />
					</div>
				</div>
			</div>

			<div className='statistical'>
				<div className='statistical__card'>
					<FontAwesomeIcon icon={faUsers} size='3x' color='#30e3ca' />
					<h3>{data.men + data.women}</h3>
					<h3>Total Member</h3>
				</div>
				<div className='statistical__card'>
					<FontAwesomeIcon icon={faMale} size='3x' color='#30e3ca' />
					<h3>{data.men}</h3>
					<h3>Men</h3>
				</div>
				<div className='statistical__card'>
					<FontAwesomeIcon icon={faFemale} size='3x' color='#30e3ca' />
					<h3>{data.women}</h3>
					<h3>Woman</h3>
				</div>
			</div>
		</>
	);
}

export default Home;

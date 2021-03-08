import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faMale, faFemale, faUsers } from '@fortawesome/free-solid-svg-icons';

function Home(props) {
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
					<h3>5009</h3>
					<h3>Total Member</h3>
				</div>
				<div className='statistical__card'>
					<FontAwesomeIcon icon={faUser} size='3x' color='#30e3ca' />
					<h3>9</h3>
					<h3>User Online</h3>
				</div>
				<div className='statistical__card'>
					<FontAwesomeIcon icon={faMale} size='3x' color='#30e3ca' />
					<h3>51</h3>
					<h3> Men Online</h3>
				</div>
				<div className='statistical__card'>
					<FontAwesomeIcon icon={faFemale} size='3x' color='#30e3ca' />
					<h3>152</h3>
					<h3>Woman Online</h3>
				</div>
			</div>
		</>
	);
}

export default Home;

import React, { useState } from 'react';
import matcha from '../img/matcha2.jpg';
import { useParams } from 'react-router-dom';
import ProtectedRoute from '../routes/protectedRoute';

function Profile() {
	const [data, setData] = useState({
		img:
			'https://www.hindishayaricollections.com/wp-content/uploads/2020/03/beautifull-girls-images-download-46.jpg',
		name: ''
	});
	const { username } = useParams();
	return (
		<div className='profile__container'>
			<div className='profile__wrapper'>
				<section className='profile__content'>
					<section className='profile__heeder'>
						<div className='img__wrapper'>
							<img src={data.img} alt='tacos' />
							<span className='profile__status'></span>
						</div>
						<div className='profile__fullname'>tach {`${username}`}</div>
						<div className='profile__fieldset'>
							<div className='profile__fieldset--key'>
								<p>Contry.</p>
								<span></span>
							</div>
							<div className='profile__fieldset--value'>Brazil</div>
						</div>
						<div className='profile__fieldset'>
							<div className='profile__fieldset--key'>
								<p>Gender.</p>
								<span></span>
							</div>
							<div className='profile__fieldset--value'>Male</div>
						</div>
						<div className='profile__fieldset'>
							<div className='profile__fieldset--key'>
								<p>Interestes.</p>
								<span></span>
							</div>
							<div className='profile__fieldset--value'>Male</div>
						</div>
						<div className='profile__fieldset'>
							<div className='profile__fieldset--key'>
								<p>Tags.</p>
								<span></span>
							</div>
							<div className='profile__fieldset--value'>Male, tach, lobe, president</div>
						</div>
						<div className='profile__fieldset'>
							<div className='profile__fieldset--key'>Gender.</div>
							<div className='profile__fieldset--value'>Male</div>
						</div>
						<div className='profile__fieldset'>
							<div className='profile__fieldset--key'>Biography.</div>
							<div className='profile__fieldset--value'>
								Lorem ipsum dolor, sit amet consectetur adipisicing elit. Asperiores quae voluptate
								magni consequuntur itaque est voluptas hic rerum unde neque ad rem modi, saepe nulla,
								non repudiandae ipsam odio ipsum!
							</div>
						</div>
					</section>
				</section>
			</div>
		</div>
	);
}

export default Profile;

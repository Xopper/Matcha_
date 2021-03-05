import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
// import ProtectedRoute from '../routes/protectedRoute';
import { capitalizeFirstLetter } from '../helpers/helpers';
import HalfRating from '../assets/profileRating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faFlag, faBan } from '@fortawesome/free-solid-svg-icons';
import SimpleSlider from '../Inc/extra/Slider';

function Profile() {
	const [data, setData] = useState({
		img:
			'https://www.hindishayaricollections.com/wp-content/uploads/2020/03/beautifull-girls-images-download-46.jpg',
		name: '',
		age: 29
	});
	const { username } = useParams();
	return (
		<div className='profile__container'>
			<div className='profile__wrapper'>
				<section className='profile__content'>
					<section className='profile__nav'>
						<div className='profile__rating'>
							<HalfRating />
						</div>
						<div className='profile__actions'>
							{/**must be conditional if this is the logged user or an other user */}
							<FontAwesomeIcon
								icon={faHeart}
								size='lg'
								className='clickable'
								style={{ color: 'aquamarine', width: 20, height: 20 }}
							/>
							<FontAwesomeIcon
								icon={faFlag}
								size='lg'
								className='clickable'
								style={{ color: '#ccc', width: 20, height: 20 }}
							/>
							<FontAwesomeIcon
								icon={faBan}
								size='lg'
								className='clickable'
								style={{ color: 'crimson', width: 20, height: 20 }}
							/>
						</div>
					</section>
					<section className='profile__heeder'>
						<div className='img__wrapper'>
							<img src={data.img} alt='tacos' />
							<span className='profile__status'></span>
						</div>
						<div className='profile__fullname'>
							{`${capitalizeFirstLetter(username)}, ${data.age}`}{' '}
							{/**use last seen here if hes of line */}
							<span className='profile__lastSeen'>(last seen: 1 day ago)</span>
						</div>
						<div className='profile__fieldset'>
							<div className='profile__fieldset--key'>
								<p>Fullname.</p>
								<span></span>
							</div>
							<div className='profile__fieldset--value'>Isabel de Maria</div>
						</div>
						<div className='profile__fieldset'>
							<div className='profile__fieldset--key'>
								<p>Gender.</p>
								<span></span>
							</div>
							<div className='profile__fieldset--value'>Female</div>
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
								<p>Contry.</p>
								<span></span>
							</div>
							<div className='profile__fieldset--value'>Brazil</div>
						</div>
						<div className='profile__fieldset'>
							<div className='profile__fieldset--key'>
								<p>Tags.</p>
								<span></span>
							</div>
							<div className='profile__fieldset--value'>Male, tach, lobe, president.</div>
						</div>
						<div className='profile__fieldset'>
							<div className='profile__fieldset--key'>
								<p>Biography.</p>
								<span></span>
							</div>
							<div className='profile__fieldset--value'>
								Lorem ipsum dolor, sit amet consectetur adipisicing elit. Asperiores quae voluptate
								magni consequuntur itaque est voluptas hic rerum unde neque ad rem modi, saepe nulla,
								non repudiandae ipsam odio ipsum!
							</div>
						</div>
					</section>
					<section className='profile__footer'>
						<SimpleSlider />
					</section>
				</section>
			</div>
		</div>
	);
}

export default Profile;

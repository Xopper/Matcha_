import React from 'react';
import matcha from '../img/matcha2.jpg';
import { useParams } from 'react-router-dom';
import ProtectedRoute from '../routes/protectedRoute';

function Profile() {
	const { username } = useParams();
	return (
		<div className='auth__container'>
			<div className='auth'>
				<section className='auth__first_section'>
					<div className='auth__first'>
						<div>tach {`${username}`}</div>
					</div>
				</section>
				<section
					className='auth__second_section'
					style={{
						backgroundImage: `url(${matcha})`
					}}
				>
					<div className='auth__second'>
						<div className='auth__second__text'>
							<h3>Shop With Confidendce</h3>
							<p>
								Browse a catalog of ecommerce services by our vetted experts or submit custom requests.
							</p>
						</div>
					</div>
				</section>
			</div>
		</div>
	);
}

export default Profile;

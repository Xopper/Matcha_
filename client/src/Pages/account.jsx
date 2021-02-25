import React from 'react';
import matcha from '../img/matcha.jpg';
import { Switch } from 'react-router-dom';
import EditInfos from '../Inc/account/editInfos';
import EditPrefs from '../Inc/account/editPrefs';
import EditSec from '../Inc/account/editSec';
import StepForm from '../Inc/account/stepForm';
import EditPics from '../Inc/account/editPics';
import PrivateRoute from '../routes/privateRoute';

function Account() {
	return (
		<div className='auth__container'>
			<div className='auth'>
				<section className='auth__first_section'>
					<div className='auth__first'>
						<Switch>
							<PrivateRoute exact path='/account/init' component={StepForm} />
							<PrivateRoute exact path='/account/infos' component={EditInfos} />
							<PrivateRoute exact path='/account/preferences' component={EditPrefs} />
							<PrivateRoute exact path='/account/password' component={EditSec} />
							<PrivateRoute exact path='/account/pictures' component={EditPics} />
							<PrivateRoute exact path='/account' component={EditInfos} />
						</Switch>
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

export default Account;

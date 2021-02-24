import React from 'react';
import matcha from '../img/matcha2.jpg';
import { Switch } from 'react-router-dom';
import LogForm from '../Inc/auth/logForm';
import RegForm from '../Inc/auth/regFrom';
import ForgetForm from '../Inc/auth/forgetForm';
import ProtectedRoute from '../routes/protectedRoute';

function Auth() {
	return (
		<div className='auth__container'>
			<div className='auth'>
				<section className='auth__first_section'>
					<div className='auth__first'>
						<Switch>
							{/* need to add reset password page*/}
							<ProtectedRoute path='/auth/forgetpass' component={ForgetForm} />
							<ProtectedRoute path='/auth/register' component={RegForm} />
							<ProtectedRoute path='/auth/login' component={LogForm} />
							<ProtectedRoute path='/auth' component={LogForm} />
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

export default Auth;

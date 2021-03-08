import React from 'react';
import matcha from '../img/matcha2.jpg';
import StepForm from '../Inc/account/stepForm';
import PrivilegesRoute from '../routes/privilegesRoute';
// import { Route } from 'react-router-dom';

function Init() {
	return (
		<div className='auth__container'>
			<div className='auth'>
				<section className='auth__first_section'>
					<div className='auth__first'>
						<PrivilegesRoute exact path='/init' component={StepForm} />
						{/** for testing */}
						{/* <Route exact path='/init' component={StepForm} /> */}
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

export default Init;

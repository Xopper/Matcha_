import React from 'react';
import matcha from '../img/matcha2.jpg';
import { Switch, Route } from 'react-router-dom';
import LogForm from '../Inc/auth/logForm';
import RegForm from '../Inc/auth/regFrom';
import ForgetForm from '../Inc/auth/forgetForm';

function Auth() {
	return (
		<div className="auth__container">
			<div className="auth">
				<section className="auth__first_section">
					<div className="auth__first">
						<Switch>
							{/* need to add reset password page*/}
							<Route path="/auth/forgetpass" component={ForgetForm} />
							<Route path="/auth/register" component={RegForm} />
							<Route path="/auth/login" component={LogForm} />
							<Route path="/auth" component={LogForm} />
						</Switch>
					</div>
				</section>
				<section
					className="auth__second_section"
					style={{
						backgroundImage: `url(${matcha})`
					}}
				>
					<div className="auth__second">
						<div className="auth__second__text">
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

import React from 'react';
import matcha from '../img/matcha.jpg';
import { Switch, Route } from 'react-router-dom';
import EditInfos from '../Inc/account/editInfos';
import EditPrefs from '../Inc/account/editPrefs';
import EditSec from '../Inc/account/editSec';
import StepForm from '../Inc/stepForm';

function Account() {
	return (
		<div className="auth__container">
			<div className="auth">
				<section className="auth__first_section">
					<div className="auth__first">
						<Switch>
							<Route exact path="/account/init" component={StepForm} />
							<Route exact path="/account/infos" component={EditInfos} />
							<Route exact path="/account/preferences" component={EditPrefs} />
							<Route exact path="/account/password" component={EditSec} />
							<Route exact path="/account" component={EditInfos} />
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

export default Account;

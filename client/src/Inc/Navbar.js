import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function NavBar({ parentDisplay, SetDisplayToggle }) {
	const [ toggleClass, setToggleClass ] = useState(false);
	const handleClick = () => {
		setToggleClass((toggleClass) => !toggleClass);
		SetDisplayToggle((parentDisplay) => !parentDisplay);
	};
	return (
		<nav className="navbar_wraper">
			<div>
				<h1>
					<Link to="/">MatchaV2</Link>
				</h1>
			</div>
			<div>
				<a href="#" className="toggle-button" onClick={() => handleClick()}>
					<span className="bar" />
					<span className="bar" />
					<span className="bar" />
				</a>
			</div>
			<div>
				<ul className={`navbar__list ${toggleClass ? 'open' : ''}`}>
					{/* <li>
						<Link to="/products">Products</Link>
					</li>
					<li>
						<Link to="/pricing">Pricing</Link>
					</li>
					<li>
						<Link to="/resource">Resource</Link>
					</li> */}
					<li>
						<Link onClick={() => handleClick()} to="/auth">
							Sign In
						</Link>
					</li>
					<li>
						<Link to="/account/init">
							<button className="init__btn">Init</button>
						</Link>
					</li>
					<li>
						<Link to="/auth/register">
							<button onClick={() => handleClick()}>Sign up</button>
						</Link>
					</li>
				</ul>
			</div>
		</nav>
	);
}

export default NavBar;

import React from "react";

const MyFooter = ({ openStatus }) => {
	return (
		<footer className={openStatus}>
			<div className="signature">
				<p>
					Made with <i className="much-heart"></i> by{" "}
					<a href="/">hrafi</a> & <a href="/">ahaloua</a>
				</p>
			</div>
		</footer>
	);
};

export default MyFooter;

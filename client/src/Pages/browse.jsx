import React from 'react';
import RangeSlider from '../assets/rangSlider';
import Rate from '../assets/controlledRating';

function Browse() {
	return (
		<div className='browse__container'>
			<div className='browse__wrapper'>
				<div className='browse__content'>
					<div className='browse__search'>
						<div className='search__specs'>
							<p>Fame Rating</p>
							<Rate />
						</div>
						<div className='search__specs'>
							<p>Age</p>
							<RangeSlider />
						</div>
						<div className='search__specs'>
							<p>Location (KM)</p>
							<RangeSlider />
						</div>
						<div className='search__specs'>
							<p>Commun Instersts tags</p>
							<RangeSlider />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Browse;

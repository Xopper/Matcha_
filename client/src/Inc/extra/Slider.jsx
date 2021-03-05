import React from 'react';

export default function SimpleSlider() {
	const slides = [1, 2, 3, 4, 5];
	return (
		<div className='profile__slider'>
			{slides.map((item, i) => (
				<div key={i} className='profile__slide'>
					{item}
				</div>
			))}
		</div>
	);
}

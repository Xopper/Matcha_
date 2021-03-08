import React, { useState } from 'react';
import ImgComp from '../../assets/imgComp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleLeft, faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';

export default function SimpleSlider({ slides }) {
	const [x, setX] = useState(0);
	const goLeft = () => {
		console.log(x);
		x === 0 ? setX(-100 * (slides.length - 1)) : setX(x + 100);
		// setX(x + 100);
	};
	const goRight = () => {
		console.log(x);
		x === -100 * (slides.length - 1) ? setX(0) : setX(x - 100);
	};

	return (
		<div className='profile__slider'>
			{slides.map((item, i) => (
				<div key={i} className='profile__slide' style={{ transform: `translateX(${x}%)` }}>
					<ImgComp src={item} />
				</div>
			))}
			<button id='goLeft' onClick={() => goLeft()}>
				<FontAwesomeIcon
					icon={faChevronCircleLeft}
					size='lg'
					className='clickable'
					style={{ color: 'aquamarine', width: 25, height: 25 }}
				/>
			</button>
			<button id='goRight' onClick={goRight}>
				<FontAwesomeIcon
					icon={faChevronCircleRight}
					size='lg'
					className='clickable'
					style={{ color: 'aquamarine', width: 25, height: 25 }}
				/>
			</button>
		</div>
	);
}

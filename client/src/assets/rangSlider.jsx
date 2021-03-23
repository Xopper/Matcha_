import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
	root: {
		width: 200
	},
	slider: {
		color: '#00e6cb'
	}
});

export default function RangeSlider({ minRange, maxRange, value, setValue }) {
	const classes = useStyles();
	// const [value, setValue] = useState([minValue, maxValue]);

	const handleChange = (e, val) => {
		setValue(val);
	};

	return (
		<div className={classes.root}>
			<Slider
				value={value}
				min={minRange}
				max={maxRange}
				className={classes.slider}
				onChange={handleChange}
				valueLabelDisplay='auto'
				aria-labelledby='range-slider'
			/>
		</div>
	);
}

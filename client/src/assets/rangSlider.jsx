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

export default function RangeSlider() {
	const classes = useStyles();
	const [value, setValue] = React.useState([20, 37]);

	const handleChange = (e, value) => {
		setValue(value);
	};

	return (
		<div className={classes.root}>
			<Slider
				value={value}
				min={10}
				max={40}
				className={classes.slider}
				onChange={handleChange}
				valueLabelDisplay='auto'
				aria-labelledby='range-slider'
			/>
		</div>
	);
}

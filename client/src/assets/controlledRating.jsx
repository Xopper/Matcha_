import React from 'react';
import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		'& > * + *': {
			marginTop: theme.spacing(1)
		}
	}
}));

export default function ControlledRate({ value, setValue }) {
	const handleChange = (e, val) => {
		setValue(val);
	};
	const classes = useStyles();
	// const [value, setValue] = useState(initValue);
	return (
		<div className={classes.root}>
			<Rating name='half-rating' value={value} precision={0.1} onChange={handleChange} />
		</div>
	);
}

import React from 'react';
import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	rating: {
		display: 'flex',
		flexDirection: 'column',
		'& > * + *': {
			marginTop: theme.spacing(1)
		}
	}
}));

export default function HalfRating({ fameRating }) {
	const classes = useStyles();
	const rate = parseFloat(fameRating);
	return (
		<div className={classes.rating}>
			<Rating name='half-rating-read' value={rate} precision={0.1} readOnly />
		</div>
	);
}

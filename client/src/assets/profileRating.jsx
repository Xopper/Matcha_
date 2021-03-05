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

export default function HalfRating(props) {
	const classes = useStyles();

	return (
		<div className={classes.rating}>
			<Rating name='half-rating-read' defaultValue={2.5} precision={0.5} readOnly />
		</div>
	);
}

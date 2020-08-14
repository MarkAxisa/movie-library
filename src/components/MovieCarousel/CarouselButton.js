import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles(() => ({
	carouselArrow: {
		top: '0',
		bottom: '0',
		height: '20px',
		margin: 'auto',
		position: 'absolute',
		opacity: '0.5',
		'& svg': {
			fontSize: '3em'
		}
	},
	carouselArrowNext: {
		right: '0',
	},
	carouselArrowPrev: {
		left: '0',
	}
}));

const CarouselButton = ({onClick, type}) => {
	const classes = useStyles();

	let buttonIcon = type === 'Next' 
	? <NavigateNextIcon/>
	: <NavigateBeforeIcon/>;

	return (
		<IconButton edge='start' className={[classes.carouselArrow, classes[`carouselArrow${type}`]].join(' ')} color='inherit' onClick={onClick} aria-label='menu'>
			{buttonIcon}
		</IconButton>
	);
}

export default CarouselButton;

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

const useStyles = makeStyles((theme) => ({
	carouselItem: {
		position: 'relative',
		cursor: 'pointer'
	},
	carouselImage: {
		width: '100%'
	},
	title: {
		position: 'absolute',
		marginTop: '-2em',
		textAlign: 'center',
		left: '0',
		right: '0',
		backgroundColor: 'rgba(131,16,16,0.5)',
		padding: '4px',
		textOverflow: 'ellipsis',
		whiteSpace: 'nowrap',
		overflow: 'hidden',

	},
	drawerIcon: {
		position: 'absolute',
		left: '0',
		right: '0',
		margin: 'auto',
		bottom: '0.5em',
	}
}));

const CarouselItem = ({movie, config, toggleDrawer}) => {
	const classes = useStyles();
	return (
		<div className={classes.carouselItem} onClick={toggleDrawer}>
			<img class={classes.carouselImage} src={config.baseUrl + "w500" + movie.backdrop_path}></img>
			{/* <p className={classes.title}>{movie.title}</p> */}
			<KeyboardArrowDownIcon className={classes.drawerIcon} />
		</div>
	);
}

export default CarouselItem;

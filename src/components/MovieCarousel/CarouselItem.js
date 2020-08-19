import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useState, useEffect} from 'react'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import IconButton from '@material-ui/core/IconButton';
import { CarouselContext } from './Carousel';
import placeholder from '../../assets/images/placeholderImage.jpg';

const CarouselItem = ({movie, apiConfig, toggleDrawer, handleLastDrawerOpened, isMobile}) => {

	const [selected, setSelected] = useState(false);
	const [lastSelected, setlastSelected] = useState(false);
	const {state, dispatch} = useContext(CarouselContext);

	const useStyles = makeStyles(() => ({
		carouselItem: {
			position: 'relative',
			cursor: 'pointer',
			pointerEvents: !state.drawerClosed && selected ? 'none' : 'all',
			"&:hover": {
				"& $drawerIcon": {
					opacity: '1'
				},
				"& $overlay": {
					opacity: '0.7'
				},
				"& $title": {
					opacity: '1'
				}
			}
		},
		carouselImage: {
			width: isMobile ? '6em' : '200px',
			minHeight: isMobile ? '9em' : '300px',
			outline: !state.drawerClosed && selected ? '5px solid #fff' : 'none',
			outlineOffset: '-5px',
			borderRadius: isMobile ? '0.2em': '0'
		},
		title: {
			left: '0',
			top: '0',
			padding: '0.1em 0.5em',
			margin: '0',
			overflow: 'hidden',
			position: 'absolute',
			textAlign: 'center',
			whiteSpace: 'nowrap',
			textOverflow: 'ellipsis',
			opacity: '0',
			zIndex: '100',
			transition: 'opacity .25s ease-in-out',
			maxWidth: '11em'
		},
		drawerIcon: {
			position: 'absolute',
			left: '0',
			right: '0',
			margin: 'auto',
			bottom: '0',
			padding: '0',
			opacity: '0',
			zIndex: '100',
			transition: 'opacity .25s ease-in-out',
			'& svg': {
				fontSize: '2em',
				transition: 'transform 300ms ease 100ms',
				'&:hover': {
					transform: 'scale(1.2)',
				}
			}
		},
		overlay: {
			width: '100%',
			height: '100%',
			background: '#000',
			opacity: '0',
			position: 'absolute',
			zIndex: '99',
			transition: 'opacity .7s ease-in-out'
		},
		pointer: {
			height: '0', 
			borderLeft: '20px solid transparent',
			borderRight: '20px solid transparent',
			borderTop: '20px solid #fff',
			margin: 'auto',
			bottom: '-1em',
			left: '0',
			right: '0',
			width: '0.1em',
			position: 'absolute',
			opacity: !state.drawerClosed && selected ? '1' : '0'
		}
	}));

	const classes = useStyles();

	useEffect(() => {
		if(state.drawerClosed || !lastSelected) {
			setSelected(false);
		}
		setlastSelected(false);
	}, [state.drawerClosed, state.elementSelected, isMobile]);

	const handleClick = () => {
		setSelected(true);
		setlastSelected(true);
		dispatch({type: 'UPDATE_DRAWER_STATE', data: false});
		dispatch({type: 'UPDATE_SELECTED_STATE', data: !state.elementSelected});
		toggleDrawer(movie);
		handleLastDrawerOpened();
	}

	const render = !isMobile ? (
		<div className={classes.carouselItem} >
			<div className={classes.overlay}></div>
			<img className={classes.carouselImage} src={apiConfig?.baseUrl + 'w500' + movie.poster_path} onError={(e)=>{e.target.onerror = null; e.target.src=placeholder}} alt={movie.title} />
			<p className={classes.title}>{movie.title}</p>
			<IconButton edge='start' className={classes.drawerIcon} color='inherit' onClick={()=>{handleClick()}} aria-label='menu'>
				<KeyboardArrowDownIcon/>
			</IconButton>
			<div className={classes.pointer}>
			</div>
		</div>) : (
			<div className={classes.carouselItem} onClick={handleClick}>
				<img className={classes.carouselImage} src={apiConfig?.baseUrl + 'w500' + movie.poster_path} onError={(e)=>{e.target.onerror = null; e.target.src=placeholder}} alt={movie.title}></img>
			</div>
		)

	return (
		render
	);
}

export default CarouselItem;

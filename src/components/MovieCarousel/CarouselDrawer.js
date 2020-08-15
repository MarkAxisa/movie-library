import React, { useContext, useEffect, useRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import { CarouselContext } from './Carousel';
import {isMobile} from 'react-device-detect';

const CarouselDrawer = ({selectedMovie, apiConfig, onClick}) => {

	const imagePath = isMobile ? selectedMovie?.poster_path : selectedMovie?.backdrop_path

	const useStyles = makeStyles(() => ({
		drawer: {
			height: '100%',
			display: 'flex'
		},
		drawerInfo: {
			height: '100%',
			background: 'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 58%, rgba(0,0,0,0.34807426388524154) 89%, rgba(0,0,0,0) 100%)',
			zIndex: '50',
			width: isMobile ? '75%' :'60%',
			opacity: isMobile ? '0.9' :'1',
			position: 'absolute'
		},
		drawerPoster: {
			height: '100%',
			right: '0',
			width: isMobile ? '100%' :'65%',
			backgroundImage: selectedMovie ? `url(${apiConfig.baseUrl}w1280${imagePath})` : '',
			backgroundRepeat: 'no-repeat',
			position: 'absolute',
			backgroundPosition: 'center',
			backgroundSize: 'cover'
		},
		carouselClose: {
			position: 'absolute',
			top: '0',
			right: '0',
			zIndex: '99',
			'& svg': {
				fontSize: '1.5em',
				padding: '0'
			}
		},
		overview: {
			width: '80%',
			color: '#aba8a8'
		}
	}));
	const classes = useStyles();
	const {state, dispatch} = useContext(CarouselContext);
	const drawerRef = useRef(null)

	useEffect(() => {
		if(!state.drawerClosed) {
			handleDrawerFocus();
		}
	}, [state.drawerClosed]);

	const handleDrawerFocus = () => {
		window.scrollTo(0, drawerRef.current.offsetTop + drawerRef.current.offsetHeight / 2);
	}

	const handleDrawerclose = () => {
		onClick();
		dispatch({type: 'UPDATE_DRAWER_STATE', data: true})
	}

	const render = selectedMovie ? (
		<div ref={drawerRef} className={classes.drawer}>
			<IconButton edge='start' className={classes.carouselClose} onClick={handleDrawerclose} color='inherit' aria-label='menu'>
				<CloseIcon/>
			</IconButton>
			<div className={classes.drawerInfo}>
				<h3>{selectedMovie.title}</h3>
				<p className={classes.overview}>{selectedMovie.overview}</p>
			</div>
			<div className={classes.drawerPoster} >

			</div>
		</div>
	) : null;

	return render;
}

export default CarouselDrawer;

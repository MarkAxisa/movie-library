import React, { useContext, useEffect, useRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CancelTwoToneIcon from '@material-ui/icons/CancelTwoTone';
import IconButton from '@material-ui/core/IconButton';
import { CarouselContext } from './Carousel';
import placeholder from '../../assets/images/drawerPlaceholder.jpg';
import { isMobile } from 'react-device-detect';

const CarouselDrawer = ({selectedMovie, apiConfig, onClick, isMobile}) => {

	const imagePath = isMobile ? selectedMovie?.poster_path : selectedMovie?.backdrop_path

	const useStyles = makeStyles(() => ({
		drawer: {
			height: '100%',
			display: 'flex',
		},
		drawerInfo: {
			height: '100%',
			background: 'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 58%, rgba(0,0,0,0.34807426388524154) 89%, rgba(0,0,0,0) 100%)',
			zIndex: '50',
			width: isMobile ? '90%' :'60%',
			opacity: isMobile ? '0.9' :'1',
			position: 'absolute',
			padding: isMobile ? '0 1em' : '0 3em'
		},
		drawerInfoTitle: {
			fontSize: isMobile ? '1em': '2em'
		},
		drawerPoster: {
			height: '100%',
			right: '0',
			width: isMobile ? '100%' :'65%',
			backgroundImage: selectedMovie ? `url(${apiConfig.baseUrl}w1280${imagePath}), url(${placeholder})` : '',
			backgroundRepeat: 'no-repeat',
			position: 'absolute',
			backgroundPosition: 'center',
			backgroundSize: 'cover'
		},
		drawerClose: {
			position: 'absolute',
			top: isMobile ? '0.2em' : '0',
			right: isMobile ? '0.2em' : '1em',
			zIndex: '99',
			'& svg': {
				fontSize: isMobile ? '1.2em' : '1.7em',
				padding: '0',
			},
			'& svg > path:nth-of-type(1)': {
				color: '#000'
			},
			'& svg > path:nth-of-type(2)': {
				color: '#fff'
			},
		},
		overview: {
			width: '80%',
			color: '#aba8a8',
			height: isMobile ? '42%' :'100%',
			overflowY: isMobile? 'scroll' : 'hidden'
		}
	}));
	const classes = useStyles();
	const {state, dispatch} = useContext(CarouselContext);
	const drawerRef = useRef(null)

	const scrollToRef = () => drawerRef.current?.scrollIntoView({
		behaviour: 'smooth',
		block: 'end',
		inline: 'center'
	});

	useEffect(() => {
		scrollToRef();
	});

	const handleDrawerclose = () => {
		onClick();
		dispatch({type: 'UPDATE_DRAWER_STATE', data: true})
	}

	const render = selectedMovie ? (
		<div ref={drawerRef} className={classes.drawer}>
			<IconButton edge='start' className={classes.drawerClose} onClick={handleDrawerclose} color='inherit' aria-label='menu'>
				<CancelTwoToneIcon/>
			</IconButton>
			<div className={classes.drawerInfo}>
				<h3 className={classes.drawerInfoTitle}>{selectedMovie.title}</h3>
				<p className={classes.overview}>{selectedMovie.overview}</p>
			</div>
			<div className={classes.drawerPoster}></div>
		</div>
	) : null;

	return render;
}

export default CarouselDrawer;

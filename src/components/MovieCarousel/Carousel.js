import React, { useEffect, useState, useReducer, useRef } from 'react'
import {BrowserView, MobileView, isMobile} from 'react-device-detect';
import { makeStyles } from '@material-ui/core/styles';
import CarouselItem from './CarouselItem';
import CarouselButton from './CarouselButton';
import useSizeElement from './useElementSize';
import useSliding from './useSliding';
import useToggleDrawer from './useToggleDrawer';
import CarouselDrawer from './CarouselDrawer';

export const CarouselContext = React.createContext();

const initialState = {
	drawerClosed: true,
	elementSelected: false
};

const reducer = (state, action) => {
	switch (action.type) {
		case 'UPDATE_DRAWER_STATE':
			return {
				drawerClosed: action.data
			};
		case 'UPDATE_SELECTED_STATE':
			return {
				elementSelected: action.data
			};

		default:
			return initialState;
	}
}

const Carousel = ({config}) => {

	const useStyles = makeStyles(() => ({
		carouselContainer: {
			transition: 'transform 300ms ease 100ms',
			position: 'relative',
			overflow: 'hidden',
			width: '100%'
		},
		carousel: {
			display: 'flex',
			background: '#000',
			padding: '1em 0',
			transition: 'transform 300ms ease 100ms',
			overflowX: isMobile ? 'scroll': 'visible',
			overflowY: isMobile ? 'hidden': 'visible',
			minHeight: isMobile ? '5em' : '14em',
			marginBottom: '-1.1em'
		},
		initialContainer: {
			position: 'absolute'
		},
		carouselTitle: {
			margin: '0.5em 0 0 0'
		},
		carouselGradient: {
			position: 'absolute',
			top: '0',
			bottom: '0',
			width: '5em',
		},
		carouselGradientRight: {
			right: 0,
			background: 'linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7091211484593838) 45%, rgba(0,0,0,1) 100%)'
		},
		carouselGradientLeft: {
			left: 0,
			background: 'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7091211484593838) 45%, rgba(0,0,0,0) 100%)'
		},
		carouselDrawer: {
			transition: 'transform 300ms ease 100ms',
			height: '500px',
			transform: state.drawerClosed ? 'scaleY(0)' : 'scaleY(1)',
			position: state.drawerClosed ? 'absolute' : 'static'
		},
		movieContainer: {
			minWidth: isMobile ? '5em' : '20em',
			marginRight: isMobile ? '0.4em': '0.1em',
			transition: 'all 700ms',
			'&:hover': {
				padding: state.drawerClosed && !isMobile ? '0 calc(20em * 0.25)' : '0',
				transform: state.drawerClosed && !isMobile ? 'scale(1.5)' : 'none'
			}
		}
	}));

	const [movies, setMovies] = useState([]);
	const [state, dispatch] = useReducer(reducer, initialState);
	const [isFirstLoad, setIsFirstLoad] = useState(true);

	const { width, elementRef } = useSizeElement();
	const { handleToggle, open, selectedMovie } = useToggleDrawer();
	const {
		handlePrev,
		handleNext,
		slideAnimation,
		containerRef,
		hasNext,
		hasPrev
	} = useSliding(width, 19);
	const carouselRef = useRef(null)
	const classes = useStyles();

	const handleFetchMovies = () => {
		fetch('https://api.themoviedb.org/3/movie/popular?api_key=f22de4bcfe9ad240a4bdeb99b1c5b637&language=en-US&page=1')
        .then(res => res.json())
        .then((data) => {
          setMovies(data.results.slice(0, 20))
        })
        .catch(console.log)
	}

	const handleCarouselFocus = () => {
		window.scrollTo(0, carouselRef.current.offsetTop);
	}

	useEffect(() => {
		if(!movies.length) {
			handleFetchMovies();
		}
		if(state.drawerClosed && !isFirstLoad) {
			handleCarouselFocus();
		}
		setIsFirstLoad(false);
	}, [state.drawerClosed])


	return (
		<div ref={carouselRef} className={classes.carouselContainer}>
			<p className={classes.carouselTitle}>Latest</p>
			<CarouselContext.Provider value={{state, dispatch}}>
				<div ref={containerRef} className={classes.carousel} {...slideAnimation}>
					<div ref={elementRef} className={[classes.movieContainer, classes.initialContainer].join(' ')}></div>
					{movies.map((movie) => (
						<div className={classes.movieContainer}>
							<CarouselItem key={movie.id} movie={movie} config={config} toggleDrawer={handleToggle}/>
						</div>
					))}
				</div>
				{!isMobile && <div className={[classes.carouselGradient, classes.carouselGradientRight].join(' ')}>
					{hasNext && !open && <CarouselButton onClick={handleNext} type="Next"/>}
				</div>}
				{!isMobile &&<div className={[classes.carouselGradient, classes.carouselGradientLeft].join(' ')}>
					{hasPrev && !open && <CarouselButton onClick={handlePrev} type="Prev"/>}
				</div>}
				<div className={classes.carouselDrawer} >
					<CarouselDrawer selectedMovie={selectedMovie} apiConfig={config} onClick={handleToggle} />
				</div>
			</CarouselContext.Provider>
		</div>
	);
}

export default Carousel;

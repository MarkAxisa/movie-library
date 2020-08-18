import React, { useEffect, useState, useReducer, useRef } from 'react'
import {isMobile} from 'react-device-detect';
import { makeStyles } from '@material-ui/core/styles';
import CarouselItem from './CarouselItem';
import CarouselButton from './CarouselButton';
import useSizeElement from './useElementSize';
import useSliding from './useSliding';
import useToggleDrawer from './useToggleDrawer';
import CarouselDrawer from './CarouselDrawer';
import useFetchMedia from './../useFetchMedia';

export const CarouselContext = React.createContext();

const Carousel = ({config, type, collection, handleCloseDrawers, drawerChangedFlag}) => {

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

	const [movies, setMovies] = useState([]);
	const [state, dispatch] = useReducer(reducer, initialState);
	const [isFirstLoad, setIsFirstLoad] = useState(true);
	const [isLastDrawerOpened, setIsLastDrawerOpened] = useState(false);
	const { width, elementRef } = useSizeElement();
	const { handleFetchMoviesByType } = useFetchMedia();
	const { handleToggle, open, selectedMovie } = useToggleDrawer();
	const carouselRef = useRef(null)
	useEffect(() => {
		if(!movies.length && !collection) {
			handleFetchMoviesByType(type)
			.then(res => res.json())
			.then((data) => {
				//Shuffling of Movies
				let movies = data.results.sort(() => Math.random() - 0.5);
				setMovies(movies);
			})
			.catch(console.log);
		}

		if(collection) {
			setMovies(collection);
		}

		if(isLastDrawerOpened) {
			setIsLastDrawerOpened(false);
		} else {
			dispatch({type: 'UPDATE_DRAWER_STATE', data: true});
		}

		if(state.drawerClosed && !isFirstLoad) {
			handleCarouselFocus();
		}
		setIsFirstLoad(false);
	}, [collection, drawerChangedFlag])

	const {
		handlePrev,
		handleNext,
		slideAnimation,
		containerRef,
		carouselWidth,
		hasNext,
		hasPrev
	} = useSliding(width, movies.length);

	const useStyles = makeStyles(() => ({
		carouselContainer: {
			transition: 'transform 300ms ease 100ms',
			position: 'relative',
			overflow: 'hidden',
			width: '100%',
			padding: isMobile ? '0' : '4em 0',
			margin: isMobile ? '0' : '-4em 0',
			'&:hover': {
				zIndex: '100'
			}
		},
		carousel: {
			display: isMobile ? 'flex': 'block',
			width: isMobile ? '100%' : `${carouselWidth}px`,
			textAlign: isMobile ? 'left' : 'center',
			background: '#000',
			padding: isMobile ? '0.5em 0' : '1em 0',
			transition: 'transform 300ms ease 100ms',
			overflowX: isMobile ? 'scroll': 'visible',
			overflowY: isMobile ? 'hidden': 'visible',
			minHeight: isMobile ? '5em' : '14em'
		},
		initialContainer: {
			position: 'absolute'
		},
		carouselTitle: {
			margin: isMobile ? '0.5em 0 0 0' : '0.5em 0 0 2em',
			position: isMobile ? 'initial' : 'absolute',
			top: isMobile ? '0' : '1em',
			zIndex: '100',
			fontSize: isMobile ? '1em' : '1.5em'
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
			height: '600px',
			transform: state.drawerClosed ? 'scaleY(0)' : 'scaleY(1)',
			display: state.drawerClosed ? 'none' : 'block'
		},
		movieContainer: {
			minWidth: isMobile ? 'none' : '200px',
			paddingRight: isMobile ? '0.4em': '2px',
			transition: 'all 700ms',
			display: 'inline-block',
			transitionDelay: state.drawerClosed ? '0.4s' : '0',
			'&:hover': {
				margin: state.drawerClosed && !isMobile ? '0 calc(200px * 0.25)' : '0',
				transform: state.drawerClosed && !isMobile ? 'scale(1.5)' : 'none'
			}
		}
	}));

	const classes = useStyles();

	const handleCarouselFocus = () => {
		window.scrollTo(0, carouselRef.current.offsetTop);
	}

	const handleLastDrawerOpened = () => {
		setIsLastDrawerOpened(true);
		handleCloseDrawers();
	}

	return (
		<div ref={containerRef} className={classes.carouselContainer}>
			{!collection && <p className={classes.carouselTitle}>Latest</p>}
				<CarouselContext.Provider value={{state, dispatch}}>
					<div ref={carouselRef} className={classes.carousel} {...slideAnimation}>
						<div ref={elementRef} className={[classes.movieContainer, classes.initialContainer].join(' ')}></div>
						{movies.map((movie) => (
							<div key={movie.id} className={classes.movieContainer}>
								<CarouselItem movie={movie} config={config} toggleDrawer={handleToggle} handleLastDrawerOpened={handleLastDrawerOpened} />
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

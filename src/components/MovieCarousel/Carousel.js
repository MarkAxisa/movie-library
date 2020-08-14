import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import CarouselItem from './CarouselItem';
import CarouselButton from './CarouselButton';
import useSizeElement from './useElementSize';
import useSliding from './useSliding';
import useToggleDrawer from './useToggleDrawer';

const useStyles = makeStyles(() => ({
	carouselContainer: {
		position: 'relative',
		overflow: 'hidden',
		minHeight: '18em',
		width: '100%'
	},
	carousel: {
		display: 'flex',
		background: '#000',
		padding: '1em',
		transition: 'transform 300ms ease 100ms',
		paddingTop: '3.5em'
	},
	movieContainer: {
		transition: 'transform 300ms ease 100ms',
		minWidth: '20em',
		marginLeft: '2px',
		transition: 'all 700ms',
		"&:hover": {
			padding: '0 calc(20em * 0.25)',
			transform: 'scale(1.5)'
		}
	},
	initialContainer: {
		position: 'absolute'
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
		background: 'red',
		transform: 'scaleY(0)',
		position: 'absolute'
	}

}));

const Carousel = ({config}) => {
	const [movies, setMovies] = useState([]);
	const { width, elementRef } = useSizeElement();
	const { handleToggle, open, drawerAnimation } = useToggleDrawer();
	const {
		handlePrev,
		handleNext,
		slideAnimation,
		containerRef,
		hasNext,
		hasPrev
	} = useSliding(width, 19);

	useEffect(() => {
		fetch('https://api.themoviedb.org/3/movie/popular?api_key=f22de4bcfe9ad240a4bdeb99b1c5b637&language=en-US&page=1')
        .then(res => res.json())
        .then((data) => {
          setMovies(data.results.slice(0, 20))
        })
        .catch(console.log)
	}, [])

	const classes = useStyles();

	

	return (
		<div className={classes.carouselContainer}>
			<div ref={containerRef} className={classes.carousel} {...slideAnimation}>
				<div ref={elementRef} className={[classes.movieContainer, classes.initialContainer].join(' ')}></div>
				{movies.map((movie) => (
					<div className={classes.movieContainer}>
						<CarouselItem movie={movie} config={config} toggleDrawer={handleToggle}/>
					</div>
				))}
			</div>
			<div className={[classes.carouselGradient, classes.carouselGradientRight].join(' ')}>
				{hasNext && <CarouselButton onClick={handleNext} type="Next"/>}
			</div>
			<div className={[classes.carouselGradient, classes.carouselGradientLeft].join(' ')}>
				{hasPrev && <CarouselButton onClick={handlePrev} type="Prev"/>}
			</div>
			<div className={classes.carouselDrawer} {...drawerAnimation}>


			</div>
		</div>
	);
}

export default Carousel;

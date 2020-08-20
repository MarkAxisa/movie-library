import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Carousel from '../MovieCarousel/Carousel';
import SearchResults from './../SearchResults/SearchResults';

const MovieLobby = ({searchResults, disposeSearchResults, isMobile}) => {

	const [searchCollection, setSearchCollection] = useState([]);
	const [drawerChangedFlag, setDrawerChangedFlag] = useState(true);
	const types = [
		{
			label: 'Popular Movies',
			apiSegment: 'popular',
			media: 'movie'
		},
		{
			label: 'Movies Now Playing',
			apiSegment: 'now_playing',
			media: 'movie'
		},
		{
			label: 'Top Rated Movies',
			apiSegment: 'top_rated',
			media: 'movie'
		},
		{
			label: 'Upcoming Movies',
			apiSegment: 'upcoming',
			media: 'movie'
		},
		{
			label: 'Popular Shows',
			apiSegment: 'popular',
			media: 'tv'
		},
		{
			label: 'On The Air',
			apiSegment: 'on_the_air',
			media: 'tv'
		},
		{
			label: 'Airing Today',
			apiSegment: 'airing_today',
			media: 'tv'
		},
		{
			label: 'Top Rated Shows',
			apiSegment: 'top_rated',
			media: 'tv'
		},
	];

	useEffect(() => {
		if(searchResults) {
			setSearchCollection(searchResults);
		}
	}, [searchResults, isMobile, drawerChangedFlag])

	const useStyles = makeStyles(() => ({
		lobbyContainer: {
			color: '#fff',
			background: '#000',
			width: isMobile ? '90%' : '100%',
			margin: 'auto',
			minHeight: '90vh',
			paddingTop: isMobile ? '3.2em' : '8em',
			paddingBottom: isMobile ? '0.5em': '3em',
			height: '100%'
		},
		searchResults: {
			marginLeft: '2em'
		}
	}));
	const classes = useStyles();

	const handleCloseResults = () => {
		disposeSearchResults()
	}

	const handleCloseDrawers = () => {
		setDrawerChangedFlag(!drawerChangedFlag);
	}

	return (
		<div className={classes.lobbyContainer}>
			{!searchCollection.length && <div className={classes.mainLobby}>
			{types.map(type => (
				<Carousel key={`${type.media}_${type.apiSegment}`}
						type={type.apiSegment}
						media={type.media}
						label={type.label}
						handleCloseDrawers={handleCloseDrawers}
						drawerChangedFlag={drawerChangedFlag}
						isMobile={isMobile}/>
			))}
			</div>}
			{searchCollection.length > 0 &&
				<SearchResults className={classes.searchResults}
								searchResults={searchCollection}
								handleCloseResults={handleCloseResults}
								handleCloseDrawers={handleCloseDrawers}
								drawerChangedFlag={drawerChangedFlag}
								isMobile={isMobile}/>
			}
		</div>
	);
}

export default MovieLobby;

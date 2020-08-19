import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Carousel from '../MovieCarousel/Carousel';
import SearchResults from './../SearchResults/SearchResults';

const MovieLobby = ({searchResults, disposeSearchResults, isMobile}) => {

	const [searchCollection, setSearchCollection] = useState([]);
	const [drawerChangedFlag, setDrawerChangedFlag] = useState(true);
	const types = [
		'Popular',
		'Now Playing',
		'Top Rated',
		'Upcoming'
	]

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
			padding: isMobile ? '3.2em 0' : '8em 0',
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
			{types.map((type) => (
				<Carousel key={type.replace(' ', '')} type={type}
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

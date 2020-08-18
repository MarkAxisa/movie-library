import React from 'react';
import Carousel from '../MovieCarousel/Carousel';
import { makeStyles } from '@material-ui/core/styles';
import { isMobile } from 'react-device-detect';

const SearchResults = ({config, searchResults, handleCloseResults, handleCloseDrawers, drawerChangedFlag}) => {

	const useStyles = makeStyles(() => ({
		resultsHeader: {
			zIndex: '350',
			display: 'flex',
			width: '100%',
			position: 'absolute'
		},
		heading: {
			left: '2em',
			position: 'absolute',
			fontSize: isMobile ? '1em' : '1.5em'
		},
		clearFiltersButton: {
			background: 'none',
			border: '1px solid #fff',
			color: '#fff',
			padding: '0.5em 1em',
			cursor: 'pointer',
			margin: '1em',
			fontSize: isMobile ? '0.5em' : '1em',
			right: '4em',
			position: 'absolute'
		}
	}));

	const classes = useStyles();
	return (
		<div>
			<div className={classes.resultsHeader}>
				<h3 className={classes.heading}>Your Search Results</h3>
				<input type='button' value='Clear Filter' className={classes.clearFiltersButton} onClick={handleCloseResults}/>
			</div>
			{searchResults.map((collection, index) => (
				<div key={index}>
					<Carousel config={config} collection={collection} handleCloseResults={handleCloseResults} handleCloseDrawers={handleCloseDrawers}/>
				</div>
			))}
		</div>
	);
}

export default SearchResults;

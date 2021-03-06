import React from 'react';
import Carousel from '../MovieCarousel/Carousel';
import { makeStyles } from '@material-ui/core/styles';

const SearchResults = ({config, searchResults, handleCloseResults, handleCloseDrawers, drawerChangedFlag, isMobile}) => {

	const useStyles = makeStyles(() => ({
		resultsHeader: {
			zIndex: '350',
			display: 'flex',
			width: '100%',
			marginTop: isMobile ? '0' : '-4em'
		},
		heading: {
			marginLeft: isMobile ? '0' : '2em',
			fontSize: isMobile ? '1.3em' : '1.5em'
		},
		clearFiltersButton: {
			background: 'none',
			border: '1px solid #fff',
			color: '#fff',
			padding: '0.5em 1em',
			cursor: 'pointer',
			margin: '1em',
			fontSize: '1em',
			right: isMobile ? '0' : '1em',
			zIndex: '150',
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
					<Carousel config={config}
							collection={collection}
							handleCloseResults={handleCloseResults}
							handleCloseDrawers={handleCloseDrawers}
							drawerChangedFlag={drawerChangedFlag}
							isMobile={isMobile}/>
				</div>
			))}
		</div>
	);
}

export default SearchResults;

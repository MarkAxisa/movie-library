import React from 'react';
import Carousel from '../MovieCarousel/Carousel';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';

const SearchResults = ({config, searchResults, handleCloseResults}) => {

	const useStyles = makeStyles(() => ({
		closeButton: {
			zIndex: '150'
		}
	}));

	const classes = useStyles();
	return (
		<div>
			<IconButton className={classes.closeButton} edge='start' onClick={handleCloseResults} color='inherit' aria-label='menu'>
				<CloseIcon/>
			</IconButton>
			{searchResults.map((collection, index) => (
				<div key={index}>
					<Carousel config={config} collection={collection}/>
				</div>
			))}
		</div>
	);
}

export default SearchResults;

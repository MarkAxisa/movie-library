import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(() => ({
	searchIcon: {
		color: '#fff',
	},
  }));

const SearchButton = ({toggleSearch}) => {

	const classes = useStyles();
	return (
		<div className={classes.searchContainer}>
			<IconButton edge='start' color='inherit' onClick={toggleSearch} aria-label='menu'>
				<SearchIcon/>
			</IconButton>
		</div>
	);
}

export default SearchButton;

import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

const Footer = ({isMobile}) => {

	const useStyles = makeStyles(() => ({
		footerContainer: {
			width: '100%',
			padding: '0.5em 0',
			fontSize: isMobile ? '0.7em' : '1em',
			textAlign: 'center',
			color: '#aba8a8',
		}
	}));
	
	const classes = useStyles();

	return (
		<div className={classes.footerContainer}>
			<p>Designed By Mark Axisa</p>
		</div>
	);
}

export default Footer
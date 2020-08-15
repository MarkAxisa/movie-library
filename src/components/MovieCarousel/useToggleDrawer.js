import { useState} from 'react'

const useToggleDrawer = () => {
	const [open, setOpen] = useState(false);
	const [selectedMovie, setSelectedMovie] = useState(null);

	const handleToggle = (movie) => {
		setOpen(!open);
		setSelectedMovie(movie);
	}

	return { handleToggle, open, selectedMovie};
}

export default useToggleDrawer
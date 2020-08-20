import { useState} from 'react'

const useToggleDrawer = () => {
	const [selectedMovie, setSelectedMovie] = useState(null);

	const handleToggle = (movie) => {
		setSelectedMovie(movie);
	}

	return { handleToggle, selectedMovie};
}

export default useToggleDrawer
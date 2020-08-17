import { useState} from 'react'

const useSearch = () => {
	const [searchShown, setSearchShown] = useState(true);

	const handleSearchToggle = (shown) => {
		setSearchShown(shown);
	}

	return { handleSearchToggle, searchShown};
}

export default useSearch
import { useState, useRef, useEffect } from 'react'

const useToggleDrawer = () => {
	const [open, setOpen] = useState(false);

	const handleToggle = () => {
		setOpen(true);
	}

	const drawerAnimation = {
		
		style: { 
			transform: open ? 'scaleY(1)' : 'scaleY(0)',
			position: open ? 'static' : 'absolute'
		}
	};

	return { handleToggle, open, drawerAnimation};
}

export default useToggleDrawer
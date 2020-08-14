import { useState, useRef, useEffect } from 'react'

const PADDINGS = 120;

const useSliding = (elementWidth, countElements) => {
	const containerRef = useRef(null);
	const [containerWidth, setContainerWidth] = useState(0);
	const [distance, setDistance] = useState(0);
	const [totalInViewport, setTotalViewport] = useState(0);
	const [viewed, setViewed] = useState(0);

	useEffect(() => {
		const containerWidth = containerRef.current.clientWidth - PADDINGS;

		setContainerWidth(containerWidth);
		setTotalViewport(Math.floor(containerWidth / elementWidth));
	}, [containerRef.current]);

	const handlePrev = () => {
		setViewed(viewed - totalInViewport);
		setDistance(distance + containerWidth);
	}

	const handleNext = () => {
		setViewed(viewed + totalInViewport);
		setDistance(distance - containerWidth);
	}

	const slideAnimation = {
		style: { transform: `translate3d(${distance}px, 0, 0)`}
	};

	const hasPrev = distance < 0;
	const hasNext = (viewed + totalInViewport) < countElements;

	return { handlePrev, handleNext, slideAnimation, containerRef, hasPrev, hasNext};
}

export default useSliding;

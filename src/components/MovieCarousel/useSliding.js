import { useState, useRef, useEffect } from 'react'

const useSliding = (elementWidth, countElements) => {
	const containerRef = useRef(null);
	const [distance, setDistance] = useState(0);
	const [carouselWidth, setCarouselWidth] = useState(0);
	const [totalInViewport, setTotalViewport] = useState(0);
	const [viewed, setViewed] = useState(0);

	useEffect(() => {
		const containerWidth = containerRef.current.clientWidth;
		setCarouselWidth(countElements * elementWidth + (elementWidth / 2))
		setTotalViewport(Math.floor(containerWidth / elementWidth));
	}, [elementWidth, countElements]);

	const handlePrev = () => {
		setViewed(viewed - totalInViewport);
		setDistance(distance + totalInViewport * elementWidth);
	}

	const handleNext = () => {
		setViewed(viewed + totalInViewport);
		setDistance(distance - totalInViewport * elementWidth);
	}

	const slideAnimation = {
		style: { transform: `translate3d(${distance}px, 0, 0)`}
	};

	const hasPrev = distance < 0;
	const hasNext = (viewed + totalInViewport) < countElements;

	return { handlePrev, handleNext, slideAnimation, containerRef, carouselWidth, hasPrev, hasNext};
}

export default useSliding;

import { useState, useEffect } from "react";

export type Step = {
	content: React.ReactNode | HTMLElement;
	action?: () => void;
	previousButton?: React.ReactNode | HTMLElement;
	nextButton?: React.ReactNode | HTMLElement;
};

export const useCarousel = (steps: Step[], initialSlide = 0) => {
	const calculatedIndex = initialSlide >= 0 && initialSlide < steps.length ? initialSlide : 0;

	const [currentIndex, setCurrentIndex] = useState(calculatedIndex);
	const [content, setContent] = useState(steps[currentIndex].content);
	const [prevBtnDisabled, setPrevBtnDisabled] = useState(currentIndex <= 0);
	const [nextBtnDisabled, setNextBtnDisabled] = useState(currentIndex === steps.length - 1);

	const decrementStep = () => {
		if (currentIndex > 0) {
			setCurrentIndex((previousIndex) => previousIndex - 1);
		}
	};

	const incrementStep = () => {
		if (currentIndex < steps.length - 1) {
			setCurrentIndex((previousIndex) => previousIndex + 1);
		}
	};

	const goTo = (index: number) => {
		setCurrentIndex(index);
	};

	useEffect(() => {
		const callAction = () => {
			const action = steps[currentIndex]?.action;
			if (action) {
				action();
			}
		};

		setContent(steps[currentIndex]?.content);
		setPrevBtnDisabled(currentIndex <= 0);
		setNextBtnDisabled(currentIndex === steps.length - 1);

		callAction();
	}, [currentIndex, steps]);

	useEffect(() => {
		setCurrentIndex(calculatedIndex);
	}, [initialSlide, calculatedIndex]);

	return {
		decrementStep,
		incrementStep,
		goTo,
		content,
		currentIndex,
		prevBtnDisabled,
		nextBtnDisabled
	};
};

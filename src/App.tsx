import "./styles.css";
import { useCarousel, Step } from "./useCarousel";

const steps: Step[] = [
	{
		content: "Step 1"
	},
	{
		content: "Step 2"
	},
	{
		content: "Step 3"
	}
];
export default function App() {
	const { decrementStep, incrementStep, goTo, content, prevBtnDisabled, nextBtnDisabled } = useCarousel(steps);
	return (
		<div className="App">
			<p>{content}</p>
			<button onClick={decrementStep} disabled={prevBtnDisabled}>
				Previous
			</button>

			{steps.map((step, index) => (
				<span onClick={() => goTo(index)}>⭕</span>
			))}

			<button onClick={incrementStep} disabled={nextBtnDisabled}>
				Next
			</button>
		</div>
	);
}

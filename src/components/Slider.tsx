import { FC, useState } from "react";
import { ButtonSlider } from "../types.d.js";

// The slider componet will recive a list of images path
type Props = { images: Array<string> };

export const Slider: FC<Props> = ({ images }) => {
	const [imagesPaths] = useState(images);
	const [currentIndex, setCurrentIndex] = useState(0);
	const currentImagePath = `../../assets/img/${imagesPaths[currentIndex]}`;

	const handleClick = (type: ButtonSlider) => {
		if (imagesPaths.length === 0) return;
		const lastIndex = imagesPaths.length - 1;
		if (type === ButtonSlider.next) {
			return currentIndex === lastIndex
				? setCurrentIndex(0)
				: setCurrentIndex(currentIndex + 1);
		} else if (type === ButtonSlider.prev) {
			currentIndex === 0
				? setCurrentIndex(lastIndex)
				: setCurrentIndex(currentIndex - 1);
		}
	};

	return (
		<div>
			<h1>Slider</h1>
			<div
				style={{
					position: "relative",
					backgroundRepeat: "no-repeat",
					backgroundPosition: "center",
					backgroundSize: "cover",
					backgroundImage: `url(${currentImagePath})`,
					borderBottom: "1px solid",
					width: "100%",
					minHeight: "500px",
					maxHeight: "800px",
				}}
			>
				<button type="button" onClick={() => handleClick(ButtonSlider.prev)}>
					Prev
				</button>
				<button type="button" onClick={() => handleClick(ButtonSlider.next)}>
					Next
				</button>
			</div>
		</div>
	);
};

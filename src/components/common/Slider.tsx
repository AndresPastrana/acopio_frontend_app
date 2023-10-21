import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { Icon } from "@tremor/react";
import { FC, useEffect, useState } from "react";
// The slider componet will recive a list of images path
type Props = { images: Array<string>; styles?: string };

enum ArrowAction {
  next = "next",
  prev = "prev",
}

export const Slider: FC<Props> = ({ images, styles }) => {
  const [imagesPaths] = useState(images);
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentImagePath = `../../assets/img/${imagesPaths[currentIndex]}`;

  const handleNextSlider = (type: ArrowAction) => {
    if (imagesPaths.length === 0) return;
    const lastIndex = imagesPaths.length - 1;
    if (type === ArrowAction.next) {
      return currentIndex === lastIndex
        ? setCurrentIndex(0)
        : setCurrentIndex(currentIndex + 1);
    } else if (type === ArrowAction.prev) {
      currentIndex === 0
        ? setCurrentIndex(lastIndex)
        : setCurrentIndex(currentIndex - 1);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => handleNextSlider(ArrowAction.next), 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [currentIndex]);

  return (
    <div
      className={`w-full h-[400px] bg-[url('${currentImagePath}')] bg-center bg-cover relative`}
    >
      <Icon
        color="green"
        className="absolute left-5 top-1/2"
        onClick={() => handleNextSlider(ArrowAction.prev)}
        icon={ChevronLeftIcon}
        variant="simple"
        size="md"
      />
      <h1 className="text-green-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        Acopio Pinar
      </h1>
      <h2 className="text-green-500 absolute bottom-1/2 left-1/2 transform -translate-x-1/2 translate-y-20">
        Sistema para la gestion de la leche en la ciudad de pinra del rio
      </h2>

      <Icon
        className="absolute right-5 top-1/2"
        color="green"
        onClick={() => handleNextSlider(ArrowAction.next)}
        icon={ChevronRightIcon}
        variant="simple"
        size="md"
      />
    </div>
  );
};

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { Icon, Title } from "@tremor/react";
import { log } from "console";
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
    const timer = setTimeout(() => handleNextSlider(ArrowAction.next), 8000);

    return () => {
      clearTimeout(timer);
    };
  }, [currentIndex]);

  return (
    <div
      style={{
        backgroundImage: ` linear-gradient(
          rgba(35, 33, 33, 0.45), 
          rgba(35, 33, 33, 0.45)
        ),url(${currentImagePath})`,
      }}
      className={`w-full h-[600px] bg-center bg-cover relative transition-all ease-in-out delay-100`}
    >
      <Icon
        className="text-green-300 absolute left-5 top-1/2 hover:cursor-pointer hover:text-green-800 transition-all ease-in-out delay-150"
        onClick={() => handleNextSlider(ArrowAction.prev)}
        icon={ChevronLeftIcon}
        variant="simple"
        size="md"
      />
      <h1 className="text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-semibold">
        Acopio Pinar
      </h1>
      <h2 className="text-white absolute bottom-1/2 left-1/2 transform -translate-x-1/2 translate-y-20">
        Sistema para la gestion de la leche en la ciudad de Pinar del Rio
      </h2>

      <Icon
        className="text-green-300 absolute right-5 top-1/2 hover:cursor-pointer hover:text-green-800 transition-all ease-in-out delay-150"
        onClick={() => handleNextSlider(ArrowAction.next)}
        icon={ChevronRightIcon}
        variant="simple"
        size="md"
      />
    </div>
  );
};

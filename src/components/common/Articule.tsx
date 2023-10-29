import { Text, Title } from "@tremor/react";
import { FC } from "react";
import { ComponentPropsWithoutRef } from "react";
interface Props extends ComponentPropsWithoutRef<"article"> {
  titule: string;
  image: string;
  text: string;
  order_image?: number;
  order_text?: number;
}

const Articule: FC<Props> = ({
  titule,
  text,
  image,
  order_image = 2,
  order_text = 1,
  ...rest
}) => {
  return (
    <article className="flex p-5" {...rest}>
      <section
        className={`basis-8/12 order-[${order_text}] flex flex-col justify-center`}
      >
        <Title className="mb-3">{titule}</Title>
        <Text className="max-w-2xl">{text}</Text>
      </section>
      <section
        className={`basis-4/12 order-[${order_image}] h-[300px] mx-auto max-w-[350px]`}
      >
        <img
          src={image}
          alt=""
          className="h-full w-full object-cover rounded-xl"
        />
      </section>
    </article>
  );
};

export default Articule;

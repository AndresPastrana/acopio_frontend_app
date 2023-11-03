import { Text, Title } from "@tremor/react";
import { FC } from "react";
import { ComponentPropsWithoutRef } from "react";
interface Props extends ComponentPropsWithoutRef<"article"> {
  titule: string;
  image: string;
  text: string;
  order_image?: string;
  order_text?: string;
}

const Articule: FC<Props> = ({
  titule,
  text,
  image,
  order_text = "1",
  order_image = "2",
  ...rest
}) => {
  return (
    <article className="flex p-5" {...rest}>
      <section
        style={{
          order: order_text,
        }}
        className={"basis-8/12 flex flex-col justify-center"}
      >
        <Title className="mb-3 text-[23px]">{titule}</Title>
        <Text className="max-w-5xl text-[20px]">{text}</Text>
      </section>
      <section
        style={{
          order: order_image,
        }}
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

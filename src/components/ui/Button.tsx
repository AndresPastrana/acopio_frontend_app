import { FC } from "react";
import { ButtonProps, Button } from "@tremor/react";
interface CustomBTN extends ButtonProps {
  text?: string;
  onClick?: () => void;
}
export const ButtonFactory: FC<CustomBTN> = ({
  text = "Primary Action",
  color = "green",
  size,
  variant = "primary",
  onClick,
  ...restOfProps
}) => {
  return (
    <Button
      onClick={onClick}
      color={color}
      variant={variant}
      size={size}
      {...restOfProps}
    >
      {text}
    </Button>
  );
};

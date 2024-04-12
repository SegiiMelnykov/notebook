import { IconButton, IconButtonProps } from "@mui/material";

type Props = {
  width: number;
  height?: number;
} & IconButtonProps;

export default function IconButtonwithSize({
  children,
  height,
  width,
  sx,
  ...props
}: Props) {
  return (
    <IconButton sx={{ width, height: height || width, ...sx }} {...props}>
      {children}
    </IconButton>
  );
}

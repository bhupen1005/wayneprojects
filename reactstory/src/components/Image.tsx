import { Box, Image } from "@mantine/core";

import { ImageProps } from "@mantine/core";

interface MantineImageComponentProps extends ImageProps {
  maw?: number;
}

export const MantineImageComponent = ({
  src,
  alt,
  ...props
}: MantineImageComponentProps) => {
  return (
    <Box maw={props.maw}>
      <Image src={src} alt={alt} {...props} />
    </Box>
  );
};

export default MantineImageComponent;

import { Loader } from "@mantine/core";

import { LoaderProps } from "@mantine/core";

interface MantineLoaderComponentProps extends LoaderProps {
  size?: number;
}

export const MantineLoaderComponent = ({
  size,
  ...props
}: MantineLoaderComponentProps) => {
  return <Loader size={size} {...props} />;
};

export default MantineLoaderComponent;

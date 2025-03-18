import { Flex, rem, Text } from "../Common";
import {
  CheckCircleSVGrenderer,
  CustomerLineSVGrenderer,
} from "../SVGRenderer";

interface AccordianHeadingProps {
  completed: boolean;
  headingIcon?: React.ReactNode;
  title: string;
}

export const AccordianHeading = ({
  completed,
  headingIcon,
  title,
}: AccordianHeadingProps) => {
  return (
    <Flex
      style={
        completed
          ? {
              borderLeft: "3px solid green",
              padding: rem(20),
              borderRadius: "4px",
            }
          : undefined
      }
    >
      {completed && <CheckCircleSVGrenderer />}
      <Flex ml={rem(20)}>
        {headingIcon}
        <Text ml={rem(10)} fw={500} color="black">
          {title}
        </Text>
      </Flex>
    </Flex>
  );
};

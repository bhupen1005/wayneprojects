import React from "react";
import {
  Autocomplete as AutocompleteComponent,
  AutocompleteProps,
} from "@mantine/core";

export interface AutocompleteStoryProps extends AutocompleteProps {
  reference?: React.Ref<HTMLInputElement>;
}
export const Autocomplete = ({
  reference,
  ...props
}: AutocompleteStoryProps) => {
  return (
    <AutocompleteComponent ref={reference} {...props}></AutocompleteComponent>
  );
};

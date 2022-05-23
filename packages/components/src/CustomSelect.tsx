import React, { useState } from "react";
import Select from "react-select";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";
import { Container } from "./Elements";

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  value?: Option;
  onChange: (value: Option) => void;
  placeholder?: string;
  options: Option[];
  margin?: string;
  disabled?: boolean;
}

export const CustomSelect: React.FC<SelectProps> = (props) => {
  const [open, setOpen] = useState(false);
  return (
    <Container
      width="100%"
      margin={props.margin}
      align="center"
      justify="center"
    >
      <Select
        isDisabled={props.disabled}
        placeholder={props.placeholder}
        onMenuOpen={() => setOpen(true)}
        onMenuClose={() => setOpen(false)}
        components={{
          DropdownIndicator: () => (
            <Container
              width="100%"
              align="center"
              justify="center"
              padding="4px"
            >
              {open ? (
                <IoChevronUp color="black" size={20} />
              ) : (
                <IoChevronDown color="black" size={20} />
              )}
            </Container>
          ),
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 0,
          colors: {
            ...theme.colors,
            primary: "transparent",
          },
        })}
        styles={{
          container: (provided) => ({
            ...provided,
            width: "100%",
            border: "none",
          }),
          input: (provided) => ({
            ...provided,
            border: "none",
          }),
          control: (provided) => ({
            ...provided,
            border: "none",
            borderRadius: 0,
            backgroundColor: "transparent",
            borderBottom: "1px solid black",
            outline: "none",
            ":hover": {
              borderBottom: "1px solid black",
            },
          }),
          menu: (provided) => ({
            ...provided,
            border: "none",
            borderRadius: 0,
            outline: "none",
          }),
          option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? "#929292c8" : "transparent",
            color: "#000000",
            ":hover": {
              backgroundColor: state.isSelected ? "#929292c8" : "#ddddddc8",
            },
          }),
        }}
        value={props.value}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        options={props.options}
        onChange={(e) => props.onChange(e || { label: "", value: "" })}
        isSearchable
      />
    </Container>
  );
};

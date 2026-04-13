import React from "react";
import ReactSelect, {
  Props as SelectProps,
  GroupBase,
  StylesConfig,
} from "react-select";
import { cn } from "@/lib/utils";

export interface Option {
  value: string;
  label: string;
}

interface CustomSelectProps<
  OptionType = Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<OptionType> = GroupBase<OptionType>,
> extends Omit<SelectProps<OptionType, IsMulti, Group>, "styles"> {
  error?: boolean;
}

export function CustomSelect<
  OptionType = Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<OptionType> = GroupBase<OptionType>,
>({
  className,
  error,
  ...props
}: CustomSelectProps<OptionType, IsMulti, Group>) {
  const customStyles: StylesConfig<OptionType, IsMulti, Group> = {
    control: (base, state) => ({
      ...base,
      minHeight: "36px",
      height: "36px",
      borderRadius: "0.375rem",
      borderColor: error
        ? "hsl(var(--destructive))"
        : state.isFocused
          ? "hsl(var(--ring))"
          : "hsl(var(--input))",
      backgroundColor: "#ffffff",
      boxShadow: state.isFocused
        ? error
          ? "0 0 0 3px hsl(var(--destructive) / 0.2)"
          : "0 0 0 3px hsl(var(--ring) / 0.5)"
        : "0 1px 2px 0 rgb(0 0 0 / 0.05)",
      transition: "color, box-shadow",
      "&:hover": {
        borderColor: error
          ? "hsl(var(--destructive))"
          : state.isFocused
            ? "hsl(var(--ring))"
            : "hsl(var(--input))",
      },
    }),
    valueContainer: (base) => ({
      ...base,
      height: "36px",
      padding: "0 12px",
    }),
    input: (base) => ({
      ...base,
      margin: "0",
      padding: "0",
      fontSize: "0.875rem",
      color: "hsl(var(--foreground))",
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    indicatorsContainer: (base) => ({
      ...base,
      height: "36px",
    }),
    dropdownIndicator: (base) => ({
      ...base,
      padding: "0 8px",
      color: "hsl(var(--muted-foreground))",
      "&:hover": {
        color: "hsl(var(--foreground))",
      },
    }),
    clearIndicator: (base) => ({
      ...base,
      padding: "0 8px",
      color: "hsl(var(--muted-foreground))",
      "&:hover": {
        color: "hsl(var(--foreground))",
      },
    }),
    menu: (base) => ({
      ...base,
      borderRadius: "0.375rem",
      border: "1px solid hsl(var(--border))",
      backgroundColor: "#ffffff",
      boxShadow:
        "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
      zIndex: 50,
    }),
    menuList: (base) => ({
      ...base,
      padding: "4px",
    }),
    option: (base, state) => ({
      ...base,
      borderRadius: "0.25rem",
      fontSize: "0.875rem",
      padding: "8px 12px",
      backgroundColor: state.isSelected
        ? "hsl(var(--accent))"
        : state.isFocused
          ? "hsl(var(--accent))"
          : "transparent",
      color: state.isSelected
        ? "hsl(var(--accent-foreground))"
        : "hsl(var(--foreground))",
      cursor: "pointer",
      "&:active": {
        backgroundColor: "hsl(var(--accent))",
      },
    }),
    placeholder: (base) => ({
      ...base,
      color: "hsl(var(--muted-foreground))",
      fontSize: "0.875rem",
    }),
    singleValue: (base) => ({
      ...base,
      color: "hsl(var(--foreground))",
      fontSize: "0.875rem",
    }),
    multiValue: (base) => ({
      ...base,
      backgroundColor: "hsl(var(--accent))",
      borderRadius: "0.25rem",
    }),
    multiValueLabel: (base) => ({
      ...base,
      color: "hsl(var(--accent-foreground))",
      fontSize: "0.875rem",
    }),
    multiValueRemove: (base) => ({
      ...base,
      color: "hsl(var(--accent-foreground))",
      "&:hover": {
        backgroundColor: "hsl(var(--destructive))",
        color: "hsl(var(--destructive-foreground))",
      },
    }),
    loadingIndicator: (base) => ({
      ...base,
      color: "hsl(var(--muted-foreground))",
    }),
    noOptionsMessage: (base) => ({
      ...base,
      color: "hsl(var(--muted-foreground))",
      fontSize: "0.875rem",
    }),
  };

  return (
    <ReactSelect
      className={cn("react-select-container", className)}
      classNamePrefix="react-select"
      styles={customStyles}
      {...props}
    />
  );
}

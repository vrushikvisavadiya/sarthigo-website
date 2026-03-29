"use client";

import * as React from "react";
import PhoneInputWithCountry from "react-phone-number-input";
import "react-phone-number-input/style.css";
import "./phone-input.css";
import { cn } from "@/lib/utils";

export interface PhoneInputProps {
  value?: string;
  onChange?: (value: string | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  defaultCountry?: string;
}

const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  (
    {
      value,
      onChange,
      placeholder = "Enter phone number",
      disabled = false,
      className,
      defaultCountry = "IN",
      ...props
    },
    ref,
  ) => {
    return (
      <PhoneInputWithCountry
        international
        defaultCountry={defaultCountry as any}
        value={value as any}
        onChange={onChange as any}
        disabled={disabled}
        placeholder={placeholder}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        {...props}
      />
    );
  },
);

PhoneInput.displayName = "PhoneInput";

export { PhoneInput };

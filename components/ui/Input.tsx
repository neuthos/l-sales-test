import * as React from "react";

import {cn} from "@/lib/utils";
import {
  type CurrencyCode,
  currencyConfig,
  formatCurrency,
  formatQuantity,
  formatPercentage,
  parseNumericValue,
  parseIntegerValue,
} from "@/lib/utils/number";

const Input = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input"> & {"data-test": string}
>(({className, type, "data-test": dataTest, ...props}, ref) => {
  return (
    <input
      type={type}
      ref={ref}
      data-slot="input"
      data-test={dataTest}
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  );
});
Input.displayName = "Input";

const TextArea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea"> & {"data-test": string}
>(({className, "data-test": dataTest, ...props}, ref) => {
  return (
    <textarea
      ref={ref}
      data-slot="textarea"
      data-test={dataTest}
      className={cn(
        "placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input min-h-[80px] w-full min-w-0 rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  );
});
TextArea.displayName = "Input.TextArea";

// Currency Input
interface CurrencyInputProps
  extends Omit<React.ComponentProps<"input">, "type" | "value" | "onChange"> {
  "data-test": string;
  currency?: CurrencyCode;
  value?: number | string | null;
  onChange?: (value: number | null) => void;
}

const Currency = React.forwardRef<HTMLInputElement, CurrencyInputProps>(
  (
    {
      className,
      "data-test": dataTest,
      currency = "JPY",
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    const config = currencyConfig[currency];
    const [displayValue, setDisplayValue] = React.useState("");
    const [isFocused, setIsFocused] = React.useState(false);

    React.useEffect(() => {
      if (value !== undefined && value !== null && !isFocused) {
        const numValue = typeof value === "string" ? parseFloat(value) : value;
        if (!isNaN(numValue)) {
          setDisplayValue(formatCurrency(numValue, currency));
        } else {
          setDisplayValue("");
        }
      }
    }, [value, isFocused, currency]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      setDisplayValue(inputValue);

      const parsedValue = parseNumericValue(inputValue);
      onChange?.(parsedValue);
    };

    const handleFocus = () => {
      setIsFocused(true);

      if (value !== undefined && value !== null) {
        const numValue = typeof value === "string" ? parseFloat(value) : value;
        if (!isNaN(numValue)) {
          setDisplayValue(numValue.toString());
        }
      }
    };

    const handleBlur = () => {
      setIsFocused(false);

      if (displayValue) {
        const parsedValue = parseNumericValue(displayValue);
        if (parsedValue !== null) {
          setDisplayValue(formatCurrency(parsedValue, currency));
          onChange?.(parsedValue);
        }
      }
    };

    return (
      <div className={cn("relative", className)}>
        <span className="text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2 text-sm">
          {config.symbol}
        </span>
        <input
          type="text"
          ref={ref}
          data-slot="currency-input"
          data-test={dataTest}
          value={displayValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={cn(
            "placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent py-1 pl-8 pr-3 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
          )}
          {...props}
        />
      </div>
    );
  }
);
Currency.displayName = "Input.Currency";

// Quantity Input
interface QuantityInputProps
  extends Omit<React.ComponentProps<"input">, "type" | "value" | "onChange"> {
  "data-test": string;
  value?: number | string | null;
  onChange?: (value: number | null) => void;
  min?: number;
  max?: number;
}

const Quantity = React.forwardRef<HTMLInputElement, QuantityInputProps>(
  (
    {className, "data-test": dataTest, value, onChange, min = 0, max, ...props},
    ref
  ) => {
    const [displayValue, setDisplayValue] = React.useState("");

    React.useEffect(() => {
      if (value !== undefined && value !== null) {
        const numValue =
          typeof value === "string" ? parseInt(value, 10) : value;
        if (!isNaN(numValue)) {
          setDisplayValue(formatQuantity(numValue));
        } else {
          setDisplayValue("");
        }
      } else {
        setDisplayValue("");
      }
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      const parsedValue = parseIntegerValue(inputValue);

      if (parsedValue !== null) {
        let constrainedValue = parsedValue;
        if (min !== undefined && parsedValue < min) {
          constrainedValue = min;
        }
        if (max !== undefined && parsedValue > max) {
          constrainedValue = max;
        }

        const formatted = formatQuantity(constrainedValue);
        setDisplayValue(formatted);
        onChange?.(constrainedValue);
      } else if (inputValue === "") {
        setDisplayValue("");
        onChange?.(null);
      }
    };

    return (
      <input
        type="text"
        ref={ref}
        data-slot="quantity-input"
        data-test={dataTest}
        value={displayValue}
        onChange={handleChange}
        className={cn(
          "placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          className
        )}
        {...props}
      />
    );
  }
);
Quantity.displayName = "Input.Quantity";

// Percentage Input
interface PercentageInputProps
  extends Omit<React.ComponentProps<"input">, "type" | "value" | "onChange"> {
  "data-test": string;
  value?: number | string | null;
  onChange?: (value: number | null) => void;
  min?: number;
  max?: number;
  decimals?: number;
}

const Percentage = React.forwardRef<HTMLInputElement, PercentageInputProps>(
  (
    {
      className,
      "data-test": dataTest,
      value,
      onChange,
      min = 0,
      max = 100,
      decimals = 2,
      ...props
    },
    ref
  ) => {
    const [displayValue, setDisplayValue] = React.useState("");
    const [isFocused, setIsFocused] = React.useState(false);

    React.useEffect(() => {
      if (value !== undefined && value !== null && !isFocused) {
        const numValue = typeof value === "string" ? parseFloat(value) : value;
        if (!isNaN(numValue)) {
          setDisplayValue(formatPercentage(numValue, decimals));
        } else {
          setDisplayValue("");
        }
      }
    }, [value, isFocused, decimals]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      setDisplayValue(inputValue);

      const parsedValue = parseNumericValue(inputValue);

      if (parsedValue !== null) {
        onChange?.(parsedValue);
      } else if (inputValue === "") {
        onChange?.(null);
      }
    };

    const handleFocus = () => {
      setIsFocused(true);

      if (value !== undefined && value !== null) {
        const numValue = typeof value === "string" ? parseFloat(value) : value;
        if (!isNaN(numValue)) {
          setDisplayValue(numValue.toString());
        }
      }
    };

    const handleBlur = () => {
      setIsFocused(false);

      if (displayValue) {
        const parsedValue = parseNumericValue(displayValue);
        if (parsedValue !== null) {
          let constrainedValue = parsedValue;
          if (min !== undefined && parsedValue < min) {
            constrainedValue = min;
          }
          if (max !== undefined && parsedValue > max) {
            constrainedValue = max;
          }
          setDisplayValue(formatPercentage(constrainedValue, decimals));
          onChange?.(constrainedValue);
        }
      }
    };

    return (
      <div className={cn("relative", className)}>
        <input
          type="text"
          ref={ref}
          data-slot="percentage-input"
          data-test={dataTest}
          value={displayValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={cn(
            "placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent py-1 pl-3 pr-8 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
          )}
          {...props}
        />
        <span className="text-muted-foreground absolute right-3 top-1/2 -translate-y-1/2 text-sm">
          %
        </span>
      </div>
    );
  }
);
Percentage.displayName = "Input.Percentage";

const InputComponent = Input as typeof Input & {
  TextArea: typeof TextArea;
  Currency: typeof Currency;
  Quantity: typeof Quantity;
  Percentage: typeof Percentage;
};

InputComponent.TextArea = TextArea;
InputComponent.Currency = Currency;
InputComponent.Quantity = Quantity;
InputComponent.Percentage = Percentage;

export {InputComponent as Input};
export type {CurrencyInputProps, QuantityInputProps, PercentageInputProps};

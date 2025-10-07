import "rc-picker/assets/index.css";
import "@/styles/rc-picker-custom.css";

import { forwardRef, useMemo } from "react";
import dayjs from "dayjs";
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import RCPicker from "rc-picker";
import { RangePicker as RCRangePicker } from "rc-picker";
import generateConfig from "rc-picker/lib/generate/dayjs";
import enUS from "rc-picker/lib/locale/en_US";

import { cn } from "@/lib/utils";

import type { Dayjs } from "dayjs";
import type { PickerProps, PickerRef } from "rc-picker";
import type { RangePickerProps as RCRangePickerProps } from "rc-picker";
import type { Locale } from "react-day-picker";

type PickerRefType = PickerRef;

interface DatePickerProps
  extends Omit<
    PickerProps<Dayjs>,
    "generateConfig" | "locale" | "value" | "defaultValue"
  > {
  "data-test"?: string;
  status?: "error" | "warning";
  variant?: "outline" | "filled" | "borderless";
  size?: "sm" | "default" | "lg";
  locale?: Locale;
  value?: Dayjs | string | null;
  defaultValue?: Dayjs | string | null;
}

interface DateRangePickerProps
  extends Omit<
    RCRangePickerProps<Dayjs>,
    "generateConfig" | "locale" | "value" | "defaultValue"
  > {
  "data-test"?: string;
  status?: "error" | "warning";
  variant?: "outline" | "filled" | "borderless";
  size?: "sm" | "default" | "lg";
  locale?: never;
  value?: [Dayjs | string | null, Dayjs | string | null] | null;
  defaultValue?: [Dayjs | string | null, Dayjs | string | null] | null;
}

const pickerPrefixCls = "rc-picker";

const getPickerClasses = (
  size: "sm" | "default" | "lg" = "default",
  variant: "outline" | "filled" | "borderless" = "outline",
  status?: "error" | "warning",
  disabled?: boolean
) => {
  const sizeClasses = {
    sm: "text-xs",
    default: "text-sm",
    lg: "text-base",
  };

  const variantClasses = {
    outline: "border-input bg-background",
    filled: "bg-muted border-transparent",
    borderless: "bg-transparent border-transparent",
  };

  const statusClasses = status
    ? {
        error: "border-destructive focus-within:ring-destructive",
        warning: "border-yellow-500 focus-within:ring-yellow-500",
      }[status]
    : "";

  return cn(
    sizeClasses[size],
    variantClasses[variant],
    statusClasses,
    disabled && "opacity-50 cursor-not-allowed"
  );
};

const DatePickerComponent = forwardRef<PickerRefType, DatePickerProps>(
  (
    {
      className,
      "data-test": dataTest,
      status,
      variant = "outline",
      size = "default",
      disabled,
      suffixIcon,
      locale,
      value,
      defaultValue,
      ...props
    },
    ref
  ) => {
    const normalizedValue = useMemo(() => {
      if (!value) return null;
      if (typeof value === "string") return dayjs(value);
      return value;
    }, [value]);

    const normalizedDefaultValue = useMemo(() => {
      if (!defaultValue) return undefined;
      if (typeof defaultValue === "string") return dayjs(defaultValue);
      return defaultValue;
    }, [defaultValue]);

    return (
      <RCPicker<Dayjs>
        ref={ref}
        generateConfig={generateConfig}
        locale={locale as never}
        prefixCls={pickerPrefixCls}
        data-test={dataTest}
        disabled={disabled}
        value={normalizedValue}
        defaultValue={normalizedDefaultValue}
        suffixIcon={suffixIcon ?? <CalendarIcon className="size-4" />}
        prevIcon={<ChevronLeft className="size-4" />}
        nextIcon={<ChevronRight className="size-4" />}
        superPrevIcon={<ChevronLeft className="size-4" />}
        superNextIcon={<ChevronRight className="size-4" />}
        getPopupContainer={() => document.body}
        className={cn(
          getPickerClasses(size, variant, status, disabled),
          className
        )}
        {...props}
      />
    );
  }
);
DatePickerComponent.displayName = "DatePicker";

const DateRangePicker = forwardRef<PickerRefType, DateRangePickerProps>(
  (
    {
      className,
      "data-test": dataTest,
      status,
      variant = "outline",
      size = "default",
      disabled,
      suffixIcon,
      separator,
      locale,
      value,
      defaultValue,
      ...props
    },
    ref
  ) => {
    const normalizedValue = useMemo(() => {
      if (!value) return null;
      return [
        value[0]
          ? typeof value[0] === "string"
            ? dayjs(value[0])
            : value[0]
          : null,
        value[1]
          ? typeof value[1] === "string"
            ? dayjs(value[1])
            : value[1]
          : null,
      ] as [Dayjs | null, Dayjs | null];
    }, [value]);

    const normalizedDefaultValue = useMemo(() => {
      if (!defaultValue) return undefined;
      return [
        defaultValue[0]
          ? typeof defaultValue[0] === "string"
            ? dayjs(defaultValue[0])
            : defaultValue[0]
          : null,
        defaultValue[1]
          ? typeof defaultValue[1] === "string"
            ? dayjs(defaultValue[1])
            : defaultValue[1]
          : null,
      ] as [Dayjs | null, Dayjs | null];
    }, [defaultValue]);

    return (
      <RCRangePicker<Dayjs>
        ref={ref as never}
        generateConfig={generateConfig}
        locale={(locale as never) ?? (enUS as unknown)}
        prefixCls={pickerPrefixCls}
        data-test={dataTest}
        disabled={disabled}
        value={normalizedValue}
        defaultValue={normalizedDefaultValue}
        suffixIcon={suffixIcon ?? <CalendarIcon className="size-4" />}
        separator={
          separator ?? <span className="text-muted-foreground">-</span>
        }
        prevIcon={<ChevronLeft className="size-4" />}
        nextIcon={<ChevronRight className="size-4" />}
        superPrevIcon={<ChevronLeft className="size-4" />}
        superNextIcon={<ChevronRight className="size-4" />}
        getPopupContainer={(triggerNode: HTMLElement) =>
          triggerNode.closest("[data-scroll-container]") ??
          triggerNode.parentElement ??
          document.body
        }
        className={cn(
          getPickerClasses(
            size,
            variant,
            status,
            Array.isArray(disabled) ? disabled[0] && disabled[1] : disabled
          ),
          className
        )}
        {...props}
      />
    );
  }
);
DateRangePicker.displayName = "DatePicker.Range";

const DatePickerWithRange =
  DatePickerComponent as typeof DatePickerComponent & {
    Range: typeof DateRangePicker;
  };

DatePickerWithRange.Range = DateRangePicker;

export { DatePickerWithRange as DatePicker };
export type {
  DatePickerProps,
  DateRangePickerProps,
  PickerRefType as PickerRef,
};

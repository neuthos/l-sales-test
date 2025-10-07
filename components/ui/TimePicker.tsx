import { forwardRef, useEffect, useMemo, useState } from "react";
import { ClockIcon } from "lucide-react";
import dayjs, { Dayjs } from "dayjs";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/Input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/Popover";
import { Button } from "@/components/ui/Button";

import type { ComponentProps } from "react";

interface TimePickerProps extends Omit<ComponentProps<"button">, "value" | "onChange"> {
  "data-test": string;
  value?: Dayjs | string | null;
  onChange?: (dayjs: Dayjs | null, iso8601: string | null) => void;
  placeholder?: string;
  disabled?: boolean;
}

const TimePicker = forwardRef<HTMLButtonElement, TimePickerProps>(
  (
    {
      className,
      "data-test": dataTest,
      value,
      onChange,
      placeholder = "Select time",
      disabled,
      ...props
    },
    ref
  ) => {
    const [open, setOpen] = useState(false);
    const [timeValue, setTimeValue] = useState({hours: "00", minutes: "00"});

    // Initialize from value prop
    useEffect(() => {
      if (value) {
        const dayjsValue = typeof value === "string" ? dayjs(value) : value;
        if (dayjsValue.isValid()) {
          setTimeValue({
            hours: dayjsValue.format("HH"),
            minutes: dayjsValue.format("mm"),
          });
        }
      }
    }, [value]);

    const handleTimeChange = (type: "hours" | "minutes", val: string) => {
      const newTime = {...timeValue, [type]: val};
      setTimeValue(newTime);

      // Create dayjs object with today's date and the selected time
      const combined = dayjs()
        .hour(parseInt(newTime.hours, 10))
        .minute(parseInt(newTime.minutes, 10))
        .second(0)
        .millisecond(0);

      onChange?.(combined, combined.toISOString());
    };

    const displayValue = useMemo(() => {
      if (timeValue.hours === "00" && timeValue.minutes === "00" && !value) {
        return placeholder;
      }
      return `${timeValue.hours}:${timeValue.minutes}`;
    }, [timeValue, placeholder, value]);

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            data-test={dataTest}
            variant="outline"
            disabled={disabled}
            className={cn(
              "hover:bg-accent hover:text-accent-foreground w-full justify-start text-left font-normal",
              !value && "text-muted-foreground",
              className
            )}
            {...props}
          >
            <ClockIcon className="mr-2 size-4" />
            {displayValue}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-4" align="start">
          <div className="flex flex-col gap-4">
            <div className="text-sm font-medium">Select Time</div>
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <label className="mb-1 block text-xs font-medium">Hour</label>
                <Input
                  data-test={`${dataTest}-hours`}
                  type="number"
                  min="0"
                  max="23"
                  value={timeValue.hours}
                  onChange={(e) => {
                    const val = e.target.value.padStart(2, "0").slice(0, 2);
                    const num = Math.min(23, Math.max(0, parseInt(val, 10) || 0));
                    handleTimeChange("hours", num.toString().padStart(2, "0"));
                  }}
                  className="text-center"
                />
              </div>
              <span className="mt-6 text-2xl font-bold">:</span>
              <div className="flex-1">
                <label className="mb-1 block text-xs font-medium">Minute</label>
                <Input
                  data-test={`${dataTest}-minutes`}
                  type="number"
                  min="0"
                  max="59"
                  value={timeValue.minutes}
                  onChange={(e) => {
                    const val = e.target.value.padStart(2, "0").slice(0, 2);
                    const num = Math.min(59, Math.max(0, parseInt(val, 10) || 0));
                    handleTimeChange("minutes", num.toString().padStart(2, "0"));
                  }}
                  className="text-center"
                />
              </div>
            </div>
            <Button
              data-test={`${dataTest}-done`}
              onClick={() => setOpen(false)}
              className="w-full"
              size="sm"
            >
              Done
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    );
  }
);
TimePicker.displayName = "TimePicker";

export {TimePicker};
export type {TimePickerProps};

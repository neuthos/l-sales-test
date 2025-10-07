"use client"

import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "@/lib/utils"

const Separator = React.forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentProps<typeof SeparatorPrimitive.Root> & {"data-test": string}
>(({className, orientation = "horizontal", decorative = true, "data-test": dataTest, ...props}, ref) => (
  <SeparatorPrimitive.Root
    ref={ref}
    data-slot="separator"
    data-test={dataTest}
    decorative={decorative}
    orientation={orientation}
    className={cn(
      "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
      className
    )}
    {...props}
  />
));
Separator.displayName = "Separator";

export {Separator}

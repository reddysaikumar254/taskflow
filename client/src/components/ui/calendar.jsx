"use client";

import * as React from "react";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";

import { DayPicker, getDefaultClassNames, DayButton } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";

function Calendar({
  className,
  classNames = {},
  showOutsideDays = true,
  captionLayout = "labels",
  buttonVariant = "ghost",
  formatters = {},
  components = {},
  ...props
}) {
  const defaultClasses = getDefaultClassNames();

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      captionLayout={captionLayout}
      className={cn("p-3 bg-background", className)}
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString("default", { month: "short" }),
        ...formatters,
      }}
      classNames={{
        root: cn("w-fit", defaultClasses.root),
        month: cn("flex flex-col gap-2", defaultClasses.month),
        months: cn("flex flex-col md:flex-row gap-4", defaultClasses.months),

        nav: cn("flex justify-between mb-2 items-center", defaultClasses.nav),

        button_previous: cn(
          buttonVariants({ variant: buttonVariant, size: "icon" }),
          "h-8 w-8 p-0",
          defaultClasses.button_previous
        ),
        button_next: cn(
          buttonVariants({ variant: buttonVariant, size: "icon" }),
          "h-8 w-8 p-0",
          defaultClasses.button_next
        ),

        month_caption: cn(
          "text-center font-semibold",
          defaultClasses.month_caption
        ),

        weekdays: cn("flex justify-between", defaultClasses.weekdays),
        weekday: cn(
          "text-xs text-muted-foreground",
          defaultClasses.weekday
        ),

        table: "w-full border-collapse",

        week: cn("flex w-full", defaultClasses.week),

        day: cn(
          "aspect-square w-full flex items-center justify-center text-sm",
          defaultClasses.day
        ),

        today: cn(
          "bg-accent text-accent-foreground rounded-md",
          defaultClasses.today
        ),

        selected: cn(
          "bg-primary text-primary-foreground rounded-md",
          defaultClasses.selected
        ),

        outside: cn(
          "text-muted-foreground opacity-60",
          defaultClasses.outside
        ),

        disabled: cn("opacity-40", defaultClasses.disabled),

        ...classNames,
      }}
      components={{
        Chevron: ({ orientation, className }) => {
          if (orientation === "left")
            return <ChevronLeftIcon className={cn("h-4 w-4", className)} />;
          if (orientation === "right")
            return <ChevronRightIcon className={cn("h-4 w-4", className)} />;

          return <ChevronDownIcon className={cn("h-4 w-4", className)} />;
        },

        DayButton: (props) => <CalendarDayButton {...props} />,

        ...components,
      }}
      {...props}
    />
  );
}

// -----------------------------------
// Calendar Day Button
// -----------------------------------

function CalendarDayButton({ day, modifiers, className, ...props }) {
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      className={cn(
        "h-8 w-8 rounded-md !p-0",
        modifiers.selected &&
          "bg-primary text-primary-foreground font-medium",
        modifiers.today &&
          "bg-accent text-accent-foreground font-medium",
        className
      )}
      {...props}
    >
      {day.date.getDate()}
    </Button>
  );
}

export { Calendar, CalendarDayButton };

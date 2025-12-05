import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

// ----------------------------------------------------
// Button Group Variants
// ----------------------------------------------------
const buttonGroupVariants = cva(
  "flex w-fit items-stretch",
  {
    variants: {
      orientation: {
        horizontal: "flex-row",
        vertical: "flex-col",
      },
    },
    defaultVariants: {
      orientation: "horizontal",
    },
  }
);

// ----------------------------------------------------
// Button Group Wrapper
// ----------------------------------------------------
function ButtonGroup({ className, orientation, ...props }) {
  return (
    <div
      role="group"
      data-slot="button-group"
      data-orientation={orientation}
      className={cn(buttonGroupVariants({ orientation }), className)}
      {...props}
    />
  );
}

// ----------------------------------------------------
// Button Group Text Wrapper
// ----------------------------------------------------
function ButtonGroupText({ className, asChild = false, ...props }) {
  const Comp = asChild ? Slot : "div";

  return (
    <Comp
      className={cn(
        "bg-muted shadow-xs flex items-center gap-2 rounded-md border px-4 text-sm font-medium",
        className
      )}
      {...props}
    />
  );
}

// ----------------------------------------------------
// Button Group Separator
// ----------------------------------------------------
function ButtonGroupSeparator({ className, orientation = "vertical", ...props }) {
  return (
    <Separator
      data-slot="button-group-separator"
      orientation={orientation}
      className={cn(
        "bg-input m-0 self-stretch",
        orientation === "vertical" ? "w-px" : "h-px",
        className
      )}
      {...props}
    />
  );
}

export {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
  buttonGroupVariants,
};

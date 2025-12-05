import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

// -----------------------------------------------
// Button Variants
// -----------------------------------------------
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md " +
    "text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 " +
    "[&_svg]:pointer-events-none [&_svg]:h-4 [&_svg]:w-4 " +
    "hover:elevate active:elevate-2 focus-visible:outline-none focus-visible:ring",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground border border-primary-border",
        destructive:
          "bg-destructive text-destructive-foreground border border-destructive-border shadow-sm",
        outline:
          "border border-button-outline bg-transparent text-foreground shadow-xs",
        secondary:
          "bg-secondary text-secondary-foreground border border-secondary-border",
        ghost: "bg-transparent border border-transparent",
        link: "text-primary underline underline-offset-4 hover:text-primary/80",
      },
      size: {
        default: "min-h-9 px-4 py-2",
        sm: "min-h-8 px-3 text-xs",
        lg: "min-h-10 px-8",
        icon: "h-9 w-9 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

// -----------------------------------------------
// Button Component
// -----------------------------------------------
function Button({ className, variant, size, asChild = false, ...props }, ref) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

const ForwardedButton = React.forwardRef(Button);
ForwardedButton.displayName = "Button";

export { ForwardedButton as Button, buttonVariants };

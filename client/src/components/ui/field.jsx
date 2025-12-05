// client/src/components/ui/fieldset.jsx
import React, { useMemo } from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

/**
 * Simple, JS-only Field components bundle.
 * - No TypeScript generics
 * - Uses cva for a small set of variants
 * - Exports: FieldSet, FieldLegend, FieldGroup, Field, FieldContent,
 *            FieldLabel, FieldTitle, FieldDescription, FieldSeparator, FieldError
 */

/* FieldSet - wrapper for a group of fields */
function FieldSet({ className, children, ...props }) {
  return (
    <fieldset
      data-slot="field-set"
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      {children}
    </fieldset>
  );
}

/* FieldLegend - legend text for a fieldset */
function FieldLegend({ className, children, variant = "legend", ...props }) {
  return (
    <legend
      data-slot="field-legend"
      data-variant={variant}
      className={cn(
        "mb-3 font-medium",
        variant === "legend" ? "text-base" : "text-sm",
        className
      )}
      {...props}
    >
      {children}
    </legend>
  );
}

/* FieldGroup - logical grouping wrapper */
function FieldGroup({ className, children, ...props }) {
  return (
    <div
      data-slot="field-group"
      className={cn(
        "flex w-full flex-col gap-6",
        "md:flex-row md:items-start md:gap-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/* CVA for Field container variants */
const fieldVariants = cva("flex w-full gap-3", {
  variants: {
    orientation: {
      vertical: "flex-col",
      horizontal: "flex-row items-start",
    },
    responsive: {
      true: "sm:flex-row",
    },
  },
  defaultVariants: {
    orientation: "vertical",
  },
});

/* Field - the field wrapper (label + content) */
function Field({
  className,
  orientation = "vertical",
  responsive = false,
  children,
  ...props
}) {
  return (
    <div
      role="group"
      data-slot="field"
      data-orientation={orientation}
      className={cn(fieldVariants({ orientation, responsive }), className)}
      {...props}
    >
      {children}
    </div>
  );
}

/* FieldContent - container for the input/control and helper text */
function FieldContent({ className, children, ...props }) {
  return (
    <div
      data-slot="field-content"
      className={cn("flex flex-1 flex-col gap-1.5 leading-snug", className)}
      {...props}
    >
      {children}
    </div>
  );
}

/* FieldLabel - wraps your Label component from your design system */
function FieldLabel({ className, children, ...props }) {
  return (
    <Label
      data-slot="field-label"
      className={cn(
        "flex items-center gap-2 text-sm font-medium leading-snug",
        className
      )}
      {...props}
    >
      {children}
    </Label>
  );
}

/* FieldTitle - small helper when you need a separate title element */
function FieldTitle({ className, children, ...props }) {
  return (
    <div
      data-slot="field-title"
      className={cn("flex items-center gap-2 text-sm font-medium", className)}
      {...props}
    >
      {children}
    </div>
  );
}

/* FieldDescription - description/help text under the control */
function FieldDescription({ className, children, ...props }) {
  return (
    <p
      data-slot="field-description"
      className={cn("text-muted-foreground text-sm leading-relaxed", className)}
      {...props}
    >
      {children}
    </p>
  );
}

/* FieldSeparator - optional visual separator with optional children in the middle */
function FieldSeparator({ children, className, ...props }) {
  return (
    <div
      data-slot="field-separator"
      data-content={!!children}
      className={cn("relative my-2 text-sm", className)}
      {...props}
    >
      <Separator className="absolute inset-0 top-1/2" />
      {children && (
        <span className="bg-background text-muted-foreground relative mx-auto block w-fit px-2">
          {children}
        </span>
      )}
    </div>
  );
}

/* FieldError - shows validation errors. Accepts `errors` array or children */
function FieldError({ className, children, errors, ...props }) {
  const content = useMemo(() => {
    if (children) return children;
    if (!errors) return null;
    if (Array.isArray(errors) && errors.length === 1 && errors[0]?.message) {
      return errors[0].message;
    }
    if (Array.isArray(errors)) {
      return (
        <ul className="ml-4 flex list-disc flex-col gap-1">
          {errors.map((err, i) => err?.message && <li key={i}>{err.message}</li>)}
        </ul>
      );
    }
    // support string error
    if (typeof errors === "string") return errors;
    return null;
  }, [children, errors]);

  if (!content) return null;

  return (
    <div role="alert" data-slot="field-error" className={cn("text-destructive text-sm", className)} {...props}>
      {content}
    </div>
  );
}

/* exports */
export {
  FieldSet,
  FieldLegend,
  FieldGroup,
  Field,
  FieldContent,
  FieldLabel,
  FieldTitle,
  FieldDescription,
  FieldSeparator,
  FieldError,
};

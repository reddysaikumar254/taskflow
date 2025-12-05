import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { ChevronRight, MoreHorizontal } from "lucide-react";

import { cn } from "@/lib/utils";

// -----------------------------
// Breadcrumb Root
// -----------------------------
const Breadcrumb = React.forwardRef(function Breadcrumb(
  { ...props },
  ref
) {
  return <nav ref={ref} aria-label="breadcrumb" {...props} />;
});

Breadcrumb.displayName = "Breadcrumb";

// -----------------------------
// Breadcrumb List <ol>
// -----------------------------
const BreadcrumbList = React.forwardRef(function BreadcrumbList(
  { className, ...props },
  ref
) {
  return (
    <ol
      ref={ref}
      className={cn(
        "flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground",
        className
      )}
      {...props}
    />
  );
});

BreadcrumbList.displayName = "BreadcrumbList";

// -----------------------------
// Breadcrumb Item <li>
// -----------------------------
const BreadcrumbItem = React.forwardRef(function BreadcrumbItem(
  { className, ...props },
  ref
) {
  return (
    <li
      ref={ref}
      className={cn("inline-flex items-center gap-1.5", className)}
      {...props}
    />
  );
});

BreadcrumbItem.displayName = "BreadcrumbItem";

// -----------------------------
// Breadcrumb Link <a> (or Slot)
// -----------------------------
const BreadcrumbLink = React.forwardRef(function BreadcrumbLink(
  { asChild, className, ...props },
  ref
) {
  const Comp = asChild ? Slot : "a";

  return (
    <Comp
      ref={ref}
      className={cn("transition-colors hover:text-foreground", className)}
      {...props}
    />
  );
});

BreadcrumbLink.displayName = "BreadcrumbLink";

// -----------------------------
// Breadcrumb Page (current)
// -----------------------------
const BreadcrumbPage = React.forwardRef(function BreadcrumbPage(
  { className, ...props },
  ref
) {
  return (
    <span
      ref={ref}
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn("font-normal text-foreground", className)}
      {...props}
    />
  );
});

BreadcrumbPage.displayName = "BreadcrumbPage";

// -----------------------------
// Breadcrumb Separator
// -----------------------------
function BreadcrumbSeparator({ children, className, ...props }) {
  return (
    <li
      role="presentation"
      aria-hidden="true"
      className={cn("flex items-center", className)}
      {...props}
    >
      {children ?? <ChevronRight className="h-4 w-4" />}
    </li>
  );
}

BreadcrumbSeparator.displayName = "BreadcrumbSeparator";

// -----------------------------
// Breadcrumb Ellipsis (More)
// -----------------------------
function BreadcrumbEllipsis({ className, ...props }) {
  return (
    <span
      role="presentation"
      aria-hidden="true"
      className={cn(
        "flex h-9 w-9 items-center justify-center text-muted-foreground",
        className
      )}
      {...props}
    >
      <MoreHorizontal className="h-4 w-4" />
      <span className="sr-only">More</span>
    </span>
  );
}

BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis";

// -----------------------------
export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
};

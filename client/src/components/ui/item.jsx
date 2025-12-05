import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"

// ---------------------------------------------------------------------------
// ItemGroup
// ---------------------------------------------------------------------------

function ItemGroup({ className, ...props }) {
  return (
    <div
      role="list"
      data-slot="item-group"
      className={cn("group/item-group flex flex-col", className)}
      {...props}
    />
  )
}

// ---------------------------------------------------------------------------
// ItemSeparator
// ---------------------------------------------------------------------------

function ItemSeparator({ className, ...props }) {
  return (
    <Separator
      data-slot="item-separator"
      orientation="horizontal"
      className={cn("my-0", className)}
      {...props}
    />
  )
}

// ---------------------------------------------------------------------------
// Item Variants
// ---------------------------------------------------------------------------

const itemVariants = cva(
  "group/item flex flex-wrap items-center rounded-md border border-transparent text-sm outline-none transition-colors duration-100 focus-visible:ring focus-visible:ring-offset-1",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border-border",
        muted: "bg-muted/50",
      },
      size: {
        default: "gap-4 p-4",
        sm: "gap-2.5 px-4 py-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

// ---------------------------------------------------------------------------
// Item
// ---------------------------------------------------------------------------

function Item({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "div"

  return (
    <Comp
      data-slot="item"
      data-variant={variant}
      data-size={size}
      className={cn(itemVariants({ variant, size }), className)}
      {...props}
    />
  )
}

// ---------------------------------------------------------------------------
// ItemMedia Variants
// ---------------------------------------------------------------------------

const itemMediaVariants = cva(
  "flex shrink-0 items-center justify-center gap-2 [&>svg]:pointer-events-none",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        icon: "bg-muted size-8 rounded-sm border [&>svg[class*='size-']]:size-4",
        image:
          "size-10 overflow-hidden rounded-sm [&>img]:w-full [&>img]:h-full [&>img]:object-cover",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

// ---------------------------------------------------------------------------
// ItemMedia
// ---------------------------------------------------------------------------

function ItemMedia({ className, variant = "default", ...props }) {
  return (
    <div
      data-slot="item-media"
      data-variant={variant}
      className={cn(itemMediaVariants({ variant }), className)}
      {...props}
    />
  )
}

// ---------------------------------------------------------------------------
// ItemContent
// ---------------------------------------------------------------------------

function ItemContent({ className, ...props }) {
  return (
    <div
      data-slot="item-content"
      className={cn(
        "flex flex-1 flex-col gap-1 [&+[data-slot=item-content]]:mt-0",
        className
      )}
      {...props}
    />
  )
}

// ---------------------------------------------------------------------------
// ItemTitle
// ---------------------------------------------------------------------------

function ItemTitle({ className, ...props }) {
  return (
    <div
      data-slot="item-title"
      className={cn(
        "flex w-fit items-center gap-2 text-sm font-medium leading-snug",
        className
      )}
      {...props}
    />
  )
}

// ---------------------------------------------------------------------------
// ItemDescription
// ---------------------------------------------------------------------------

function ItemDescription({ className, ...props }) {
  return (
    <p
      data-slot="item-description"
      className={cn(
        "text-muted-foreground line-clamp-2 text-balance text-sm leading-normal",
        className
      )}
      {...props}
    />
  )
}

// ---------------------------------------------------------------------------
// ItemActions
// ---------------------------------------------------------------------------

function ItemActions({ className, ...props }) {
  return (
    <div
      data-slot="item-actions"
      className={cn("flex items-center gap-2", className)}
      {...props}
    />
  )
}

// ---------------------------------------------------------------------------
// ItemHeader
// ---------------------------------------------------------------------------

function ItemHeader({ className, ...props }) {
  return (
    <div
      data-slot="item-header"
      className={cn(
        "flex basis-full items-center justify-between gap-2",
        className
      )}
      {...props}
    />
  )
}

// ---------------------------------------------------------------------------
// ItemFooter
// ---------------------------------------------------------------------------

function ItemFooter({ className, ...props }) {
  return (
    <div
      data-slot="item-footer"
      className={cn(
        "flex basis-full items-center justify-between gap-2",
        className
      )}
      {...props}
    />
  )
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export {
  Item,
  ItemMedia,
  ItemContent,
  ItemActions,
  ItemGroup,
  ItemSeparator,
  ItemTitle,
  ItemDescription,
  ItemHeader,
  ItemFooter,
}

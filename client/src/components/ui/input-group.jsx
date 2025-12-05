import * as React from "react"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

// ---------------------------------------------------------------------------
// InputGroup
// ---------------------------------------------------------------------------

function InputGroup({ className, ...props }) {
  return (
    <div
      data-slot="input-group"
      role="group"
      className={cn(
        "group/input-group border-input dark-input/30 shadow-xs relative flex w-full items-center rounded-md border outline-none transition-[color,box-shadow]",
        "h-9 has-[>textarea]:h-auto",

        // Alignment variants
        "has-[>[data-align=inline-start]]:pl-2",
        "has-[>[data-align=inline-end]]:pr-2",
        "has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>[data-align=block-start]]:pt-3",
        "has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-end]]:pb-3",

        // Focus state
        "has-[[data-slot=input-group-control]:focus-visible]:ring has-[[data-slot=input-group-control]:focus-visible]:ring-1",

        // Error state
        "has-[[data-slot][aria-invalid=true]]:bg-destructive/20 has-[[data-slot][aria-invalid=true]]:text-destructive dark:has-[[data-slot][aria-invalid=true]]:bg-destructive/40",

        className
      )}
      {...props}
    />
  )
}

// ---------------------------------------------------------------------------
// InputGroupAddon
// ---------------------------------------------------------------------------

const inputGroupAddonVariants = cva(
  "text-muted-foreground flex h-auto cursor-text select-none items-center justify-center gap-2 py-1.5 text-sm font-medium group-data-[disabled=true]/input-group:opacity-50 [&>kbd]:rounded-[calc(var(--radius)-5px)] [&>svg[class*='size-']]:size-4",
  {
    variants: {
      align: {
        "inline-start":
          "order-first pl-3 has-[>button]:-ml-1.5 has-[>kbd]:-ml-1.5",
        "inline-end":
          "order-last pr-3 has-[>button]:-mr-1.5 has-[>kbd]:-mr-1.5",
        "block-start":
          "border-b order-first w-full justify-start px-3 pt-3 group-has-[>input]/input-group:pt-2.5",
        "block-end":
          "border-t order-last w-full justify-start px-3 pb-3 group-has-[>input]/input-group:pb-2.5",
      },
    },
    defaultVariants: {
      align: "inline-start",
    },
  }
)

function InputGroupAddon({ className, align = "inline-start", ...props }) {
  return (
    <div
      role="group"
      data-slot="input-group-addon"
      data-align={align}
      className={cn(inputGroupAddonVariants({ align }), className)}
      onClick={(e) => {
        if (e.target.closest("button")) return
        e.currentTarget.parentElement
          ?.querySelector("input, textarea")
          ?.focus()
      }}
      {...props}
    />
  )
}

// ---------------------------------------------------------------------------
// InputGroupButton
// ---------------------------------------------------------------------------

const inputGroupButtonVariants = cva(
  "flex items-center gap-2 text-sm shadow-none",
  {
    variants: {
      size: {
        xs: "h-6 gap-1 rounded-[calc(var(--radius)-5px)] px-2 [&>svg[class*='size-']]:size-3.5",
        sm: "h-8 gap-1.5 rounded-md px-2.5 [&>svg[class*='size-']]:size-4",
        "icon-xs": "size-6 rounded-[calc(var(--radius)-5px)] p-0 [&>svg]:size-4",
        "icon-sm": "size-8 p-0 [&>svg]:size-5",
      },
    },
    defaultVariants: {
      size: "xs",
    },
  }
)

function InputGroupButton({
  className,
  type = "button",
  variant = "ghost",
  size = "xs",
  ...props
}) {
  return (
    <Button
      type={type}
      variant={variant}
      data-size={size}
      className={cn(inputGroupButtonVariants({ size }), className)}
      {...props}
    />
  )
}

// ---------------------------------------------------------------------------
// InputGroupText
// ---------------------------------------------------------------------------

function InputGroupText({ className, ...props }) {
  return (
    <span
      className={cn(
        "text-muted-foreground flex items-center gap-2 text-sm [&_svg[class*='size-']]:size-4 [&_svg]:pointer-events-none",
        className
      )}
      {...props}
    />
  )
}

// ---------------------------------------------------------------------------
// InputGroupInput
// ---------------------------------------------------------------------------

function InputGroupInput({ className, ...props }) {
  return (
    <Input
      data-slot="input-group-control"
      className={cn(
        "flex-1 rounded-none border-0 bg-transparent shadow-none focus-visible:outline-none dark:bg-transparent",
        className
      )}
      {...props}
    />
  )
}

// ---------------------------------------------------------------------------
// InputGroupTextarea
// ---------------------------------------------------------------------------

function InputGroupTextarea({ className, ...props }) {
  return (
    <Textarea
      data-slot="input-group-control"
      className={cn(
        "flex-1 resize-none rounded-none border-0 bg-transparent py-3 shadow-none focus-visible:outline-none dark:bg-transparent",
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
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
}

"use client"

import * as React from "react"
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group"

import { cn } from "@/lib/utils"
import { toggleVariants } from "@/components/ui/toggle"

// ---------------------------------------------------
// Context (plain JS)
// ---------------------------------------------------

const ToggleGroupContext = React.createContext({
  size: "default",
  variant: "default",
})

// ---------------------------------------------------
// ToggleGroup Root
// ---------------------------------------------------

const ToggleGroup = React.forwardRef(
  ({ className, variant = "default", size = "default", children, ...props }, ref) => (
    <ToggleGroupPrimitive.Root
      ref={ref}
      className={cn("flex items-center justify-center gap-1", className)}
      {...props}
    >
      <ToggleGroupContext.Provider value={{ variant, size }}>
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
  )
)

ToggleGroup.displayName = "ToggleGroup"

// ---------------------------------------------------
// ToggleGroupItem
// ---------------------------------------------------

const ToggleGroupItem = React.forwardRef(
  ({ className, children, variant, size, ...props }, ref) => {
    const context = React.useContext(ToggleGroupContext)

    return (
      <ToggleGroupPrimitive.Item
        ref={ref}
        className={cn(
          toggleVariants({
            variant: variant || context.variant,
            size: size || context.size,
          }),
          className
        )}
        {...props}
      >
        {children}
      </ToggleGroupPrimitive.Item>
    )
  }
)

ToggleGroupItem.displayName = "ToggleGroupItem"

// ---------------------------------------------------

export { ToggleGroup, ToggleGroupItem }

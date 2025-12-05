import { cn } from "@/lib/utils"

function Kbd({ className, ...props }) {
  return (
    <kbd
      data-slot="kbd"
      className={cn(
        "pointer-events-none inline-flex h-5 min-w-5 w-fit select-none items-center justify-center gap-1 rounded-sm px-1",
        "bg-muted text-muted-foreground font-sans text-xs font-medium",
        // Valid Tailwind nesting selectors
        "[&_svg[class*='size-']]:size-3",
        // Tooltip override when inside tooltip-content
        "[[data-slot=tooltip-content]_&]:bg-background/20",
        "dark:[[data-slot=tooltip-content]_&]:bg-background/10",
        className
      )}
      {...props}
    />
  )
}

function KbdGroup({ className, ...props }) {
  return (
    <div
      data-slot="kbd-group"
      className={cn("inline-flex items-center gap-1", className)}
      {...props}
    />
  )
}

export { Kbd, KbdGroup }

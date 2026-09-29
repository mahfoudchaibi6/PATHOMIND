import * as React from "react"
import { cn } from "@/lib/utils"
import { fieldClass } from "@/components/ui/field"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return <input type={type} data-slot="input" className={cn(fieldClass, "h-11", className)} {...props} />
}

export { Input }

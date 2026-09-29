import * as React from "react"
import { cn } from "@/lib/utils"
import { fieldClass } from "@/components/ui/field"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea data-slot="textarea" className={cn(fieldClass, "min-h-[110px] resize-y py-3", className)} {...props} />
  )
}

export { Textarea }

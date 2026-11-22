"use client"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Input } from "@/components/ui/input"

//
export function PasswordInput(props: React.ComponentProps<"input">) {
  // showPassword = false
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="relative">
      <Input
        {...props}
        
        type={showPassword ? "text" : "password"}
        className={`pr-10 ${props.className ?? ""}`}
      />

      <button
        type="button" 
        onClick={() => setShowPassword((prev) => !prev)}
        aria-label={showPassword ? "Hide password" : "Show password"}
        className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground"
      >
        {/* showPassword true হলে EyeOff আইকন, false হলে Eye আইকন */}
        {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
      </button>
    </div>
  )
}
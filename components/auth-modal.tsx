"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { AuthForms } from "./auth-forms"

interface AuthModalProps {
isOpen: boolean
onClose: () => void
onSuccess?: () => void
initialMode?: "login" | "register" | "forgot-password"
}

export function AuthModal({ isOpen, onClose, onSuccess, initialMode = "login" }: AuthModalProps) {
const [currentMode, setCurrentMode] = useState(initialMode)

const handleSuccess = () => {
  onSuccess?.()
  onClose()
}

return (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent 
      className="sm:max-w-md p-0 gap-0 bg-gray-50 dark:bg-slate-900"
      aria-describedby="auth-modal-description"
    >
      <DialogHeader className="sr-only">
        <DialogTitle>
          {currentMode === "login" ? "Sign In" : currentMode === "register" ? "Create Account" : "Reset Password"}
        </DialogTitle>
        <DialogDescription id="auth-modal-description">
          {currentMode === "login" 
            ? "Sign in to your FastContracts account" 
            : currentMode === "register" 
            ? "Create a new FastContracts account" 
            : "Reset your FastContracts account password"
          }
        </DialogDescription>
      </DialogHeader>
      <div className="p-6">
        <AuthForms
          onSuccess={handleSuccess}
          onSwitchMode={setCurrentMode}
          initialMode={currentMode}
          isModal={true}
        />
      </div>
    </DialogContent>
  </Dialog>
)
}

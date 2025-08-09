"use client"

import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { AuthForms } from "./auth-forms"

type AuthMode = "login" | "register" | "forgot-password"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  // Pass the mode back so callers can tailor behavior (e.g., toast messages)
  onSuccess?: (mode: AuthMode) => void
  initialMode?: AuthMode
}

export function AuthModal({ isOpen, onClose, onSuccess, initialMode = "login" }: AuthModalProps) {
  const [currentMode, setCurrentMode] = useState<AuthMode>(initialMode)

  // Keep internal state in sync if initialMode prop changes
  useEffect(() => {
    setCurrentMode(initialMode)
  }, [initialMode])

  // Properly close the dialog only when it transitions to closed
  const handleOpenChange = (open: boolean) => {
    if (!open) onClose()
  }

  // Backward-compatible: if AuthForms doesn't pass a mode, use currentMode
  const handleSuccess = (mode?: AuthMode) => {
    const resolvedMode = mode ?? currentMode
    onSuccess?.(resolvedMode)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
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
                : "Reset your FastContracts account password"}
          </DialogDescription>
        </DialogHeader>

        <div className="p-6">
          <AuthForms
            // If AuthForms calls onSuccess() with a mode, we pass it through.
            // If it calls onSuccess() with no args, we'll fallback to currentMode.
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

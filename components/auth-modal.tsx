"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { LoginForm } from "./login-form"
import { RegisterForm } from "./register-form"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  defaultTab?: "login" | "register"
  onSuccess?: () => void
}

export function AuthModal({ isOpen, onClose, defaultTab = "login", onSuccess }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<"login" | "register">(defaultTab)

  const handleSuccess = () => {
    onSuccess?.()
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{activeTab === "login" ? "Sign In" : "Create Account"}</DialogTitle>
        </DialogHeader>

        <div className="flex border-b">
          <Button
            variant={activeTab === "login" ? "default" : "ghost"}
            className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
            onClick={() => setActiveTab("login")}
          >
            Sign In
          </Button>
          <Button
            variant={activeTab === "register" ? "default" : "ghost"}
            className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
            onClick={() => setActiveTab("register")}
          >
            Sign Up
          </Button>
        </div>

        <div className="mt-4">
          {activeTab === "login" ? <LoginForm onSuccess={handleSuccess} /> : <RegisterForm onSuccess={handleSuccess} />}
        </div>

        <div className="text-center text-sm text-muted-foreground">
          {activeTab === "login" ? (
            <>
              Don't have an account?{" "}
              <Button variant="link" className="p-0 h-auto font-normal" onClick={() => setActiveTab("register")}>
                Sign up
              </Button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <Button variant="link" className="p-0 h-auto font-normal" onClick={() => setActiveTab("login")}>
                Sign in
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

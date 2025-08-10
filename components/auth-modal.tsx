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
}

export function AuthModal({ isOpen, onClose, defaultTab = "login" }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<"login" | "register">(defaultTab)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{activeTab === "login" ? "Sign In" : "Create Account"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
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

          {activeTab === "login" ? <LoginForm onSuccess={onClose} /> : <RegisterForm onSuccess={onClose} />}
        </div>
      </DialogContent>
    </Dialog>
  )
}

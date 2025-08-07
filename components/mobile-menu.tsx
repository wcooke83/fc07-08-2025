"use client"

import { useState } from "react"
import Link from "next/link"
import { MenuIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { siteConfig } from "@/lib/config"
import { useAuth } from "@/lib/auth-provider"

export function MobileMenu() {
  const [open, setOpen] = useState(false)
  const { user } = useAuth()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <MenuIcon className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <Link href="/" className="flex items-center space-x-2" onClick={() => setOpen(false)}>
          {/* <img src="/placeholder-logo.svg" alt="Logo" className="h-6 w-6" /> */}
          <span className="inline-block font-bold">{siteConfig.name}</span>
        </Link>
        <div className="mt-6 flex flex-col space-y-3">
          <Link href="/templates" className="text-lg font-medium" onClick={() => setOpen(false)}>
            Templates
          </Link>
          <Link href="/pricing" className="text-lg font-medium" onClick={() => setOpen(false)}>
            Pricing
          </Link>
          <Link href="/features" className="text-lg font-medium" onClick={() => setOpen(false)}>
            Features
          </Link>
          <Link href="/help" className="text-lg font-medium" onClick={() => setOpen(false)}>
            Help
          </Link>
          {user && (
            <Link href="/dashboard" className="text-lg font-medium" onClick={() => setOpen(false)}>
              Dashboard
            </Link>
          )}
          <div className="pt-4">
            {!user && (
              <>
                <Button asChild className="w-full mb-2">
                  <Link href="/login" onClick={() => setOpen(false)}>
                    Login
                  </Link>
                </Button>
                {siteConfig.name === "FastContracts" && ( // Assuming FastContracts has registration enabled
                  <Button asChild className="w-full bg-transparent" variant="outline">
                    <Link href="/register" onClick={() => setOpen(false)}>
                      Sign Up
                    </Link>
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

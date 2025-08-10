"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"
import { UserMenu } from "@/components/user-menu"
import { AuthModal } from "@/components/auth-modal"
import { useAuth } from "@/lib/auth-provider"
import { Menu, FileText } from "lucide-react"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Home", href: "/" },
  { name: "Templates", href: "/templates" },
  { name: "Features", href: "/features" },
  { name: "Pricing", href: "/pricing" },
  { name: "Help", href: "/help" },
]

export function SiteHeader() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [authModalTab, setAuthModalTab] = useState<"login" | "register">("login")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { user, loading } = useAuth()

  const handleAuthClick = (tab: "login" | "register") => {
    setAuthModalTab(tab)
    setIsAuthModalOpen(true)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <FileText className="h-6 w-6 text-blue-600" />
          <span className="font-bold text-xl">FastContracts</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium ml-8">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "transition-colors hover:text-foreground/80",
                pathname === item.href ? "text-foreground" : "text-foreground/60",
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="ml-auto flex items-center space-x-4">
          <ThemeToggle />

          {/* Desktop Auth */}
          <div className="hidden md:flex items-center space-x-2">
            {loading ? (
              <div className="h-8 w-16 bg-muted animate-pulse rounded" />
            ) : user ? (
              <UserMenu />
            ) : (
              <>
                <Button variant="ghost" onClick={() => handleAuthClick("login")}>
                  Sign In
                </Button>
                <Button onClick={() => handleAuthClick("register")}>Get Started</Button>
              </>
            )}
          </div>

          {/* Mobile Menu */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col space-y-4 mt-8">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "text-lg font-medium transition-colors hover:text-foreground/80",
                      pathname === item.href ? "text-foreground" : "text-foreground/60",
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}

                <div className="border-t pt-4 space-y-2">
                  {loading ? (
                    <div className="h-8 bg-muted animate-pulse rounded" />
                  ) : user ? (
                    <UserMenu />
                  ) : (
                    <>
                      <Button
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={() => {
                          handleAuthClick("login")
                          setIsMobileMenuOpen(false)
                        }}
                      >
                        Sign In
                      </Button>
                      <Button
                        className="w-full"
                        onClick={() => {
                          handleAuthClick("register")
                          setIsMobileMenuOpen(false)
                        }}
                      >
                        Get Started
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} defaultTab={authModalTab} />
    </header>
  )
}

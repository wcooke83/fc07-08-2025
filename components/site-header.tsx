"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, FileText } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { UserMenu } from "@/components/user-menu"
import { useAuth } from "@/lib/auth-provider"
import { siteConfig } from "@/lib/site-config"
import { useState } from "react"

const navigation = [
  { name: "Templates", href: "/templates" },
  { name: "Pricing", href: "/pricing" },
  { name: "Help", href: "/help" },
  { name: "About", href: "/about" },
]

export function SiteHeader() {
  const { user, loading } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <FileText className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">{siteConfig.name}</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="transition-colors hover:text-foreground/80 text-foreground/60"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <Link href="/" className="flex items-center space-x-2" onClick={() => setIsOpen(false)}>
              <FileText className="h-6 w-6" />
              <span className="font-bold">{siteConfig.name}</span>
            </Link>
            <div className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
              <div className="flex flex-col space-y-3">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-foreground/60 transition-colors hover:text-foreground"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <Link href="/" className="flex items-center space-x-2 md:hidden">
              <FileText className="h-6 w-6" />
              <span className="font-bold">{siteConfig.name}</span>
            </Link>
          </div>
          <nav className="flex items-center space-x-2">
            {!loading && (
              <>
                {user ? (
                  <UserMenu />
                ) : (
                  <div className="flex items-center space-x-2">
                    <Button asChild variant="ghost" size="sm">
                      <Link href="/login">Sign In</Link>
                    </Button>
                    <Button asChild size="sm">
                      <Link href="/register">Sign Up</Link>
                    </Button>
                  </div>
                )}
              </>
            )}
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}

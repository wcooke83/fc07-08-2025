"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface ProgressOptionsProps {
  onBack?: () => void
  onNext?: () => void
  nextText?: string
  backText?: string
  disableNext?: boolean
  disableBack?: boolean
  className?: string
}

export function ProgressOptions({
  onBack,
  onNext,
  nextText = "Next",
  backText = "Back",
  disableNext = false,
  disableBack = false,
  className,
}: ProgressOptionsProps) {
  return (
    <div className={cn("flex justify-between gap-4", className)}>
      <Button onClick={onBack} disabled={disableBack} variant="outline">
        <ArrowLeftIcon className="mr-2 h-4 w-4" />
        {backText}
      </Button>
      <Button onClick={onNext} disabled={disableNext}>
        {nextText}
        <ArrowRightIcon className="ml-2 h-4 w-4" />
      </Button>
    </div>
  )
}

import { cn } from "@/lib/utils"

interface Step {
  id: number
  name: string
  icon: any
  current: boolean
}

interface ProgressBarProps {
  steps?: Step[]
  currentStep?: number
}

export function ProgressBar({ steps = [], currentStep = 1 }: ProgressBarProps) {
  // Default steps if none provided
  const defaultSteps = [
    { id: 1, name: "Create", icon: null, current: currentStep === 1 },
    { id: 2, name: "Preview", icon: null, current: currentStep === 2 },
    { id: 3, name: "Download", icon: null, current: currentStep === 3 },
  ]

  const stepsToUse = steps.length > 0 ? steps : defaultSteps

  return (
    <nav aria-label="Progress">
      <ol role="list" className="flex items-center">
        {stepsToUse.map((step, stepIdx) => (
          <li key={step.name} className={cn(stepIdx !== stepsToUse.length - 1 ? "pr-8 sm:pr-20" : "", "relative")}>
            {step.current ? (
              <>
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-blue-600" />
                </div>
                <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-blue-600">
                  <span className="text-white text-sm font-medium">{step.id}</span>
                </div>
              </>
            ) : stepIdx < currentStep - 1 ? (
              <>
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-blue-600" />
                </div>
                <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-blue-600">
                  <span className="text-white text-sm">✓</span>
                </div>
              </>
            ) : (
              <>
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-gray-200" />
                </div>
                <div className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-300 bg-white">
                  <span className="text-gray-500 text-sm font-medium">{step.id}</span>
                </div>
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

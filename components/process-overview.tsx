import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock, FileText, Download } from "lucide-react"

interface ProcessOverviewProps {
  currentStep: number
}

export function ProcessOverview({ currentStep }: ProcessOverviewProps) {
  const steps = [
    {
      id: 1,
      name: "Collect Information",
      description: "Fill out all required contract details",
      icon: FileText,
    },
    {
      id: 2,
      name: "Preview Contract",
      description: "Review your generated template",
      icon: Clock,
    },
    {
      id: 3,
      name: "Download",
      description: "Get your template in multiple formats",
      icon: Download,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Process Overview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {steps.map((step) => {
          const Icon = step.icon
          const isCompleted = currentStep > step.id
          const isCurrent = currentStep === step.id

          return (
            <div
              key={step.id}
              className={`flex items-start space-x-3 ${currentStep >= step.id ? "opacity-100" : "opacity-50"}`}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                  currentStep >= step.id ? "bg-blue-100 dark:bg-blue-900" : "bg-gray-100 dark:bg-gray-800"
                }`}
              >
                {isCompleted ? (
                  <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                ) : (
                  <span className="text-blue-600 dark:text-blue-400 text-xs font-bold">{step.id}</span>
                )}
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{step.name}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">{step.description}</p>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}

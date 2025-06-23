import type React from "react"
import { Check } from "lucide-react"

interface Step {
  id: number
  title: string
  subtitle: string
}

interface StepIndicatorProps {
  steps: Step[]
  currentStep: number
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ steps, currentStep }) => {
  return (
    <div className="w-full">
      {/* Mobile View */}
      <div className="block sm:hidden">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-900 dark:text-white">
            Step {currentStep} of {steps.length}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {Math.round((currentStep / steps.length) * 100)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / steps.length) * 100}%` }}
          />
        </div>
        <div className="mt-2">
          <div className="text-sm font-medium text-gray-900 dark:text-white">{steps[currentStep - 1]?.title}</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">{steps[currentStep - 1]?.subtitle}</div>
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden sm:block">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                    step.id < currentStep
                      ? "bg-green-500 text-white"
                      : step.id === currentStep
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                  }`}
                >
                  {step.id < currentStep ? <Check className="w-5 h-5" /> : step.id}
                </div>
                <div className="ml-3">
                  <div
                    className={`text-sm font-medium ${
                      step.id <= currentStep ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {step.title}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 max-w-xs">{step.subtitle}</div>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-4 transition-colors ${
                    step.id < currentStep ? "bg-green-500" : "bg-gray-200 dark:bg-gray-700"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default StepIndicator

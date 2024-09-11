'use client'

import { Button } from "@/components/ui/button"
import { GitMergeIcon, XIcon, AlertTriangleIcon, CoffeeIcon } from "lucide-react"

interface GameControlsProps {
  onDecision: (decision: 'merge' | 'reject' | 'needsWork') => void
  onCoffeeBoost: () => void
  coffeeBoost: boolean
}

export function GameControls({ onDecision, onCoffeeBoost, coffeeBoost }: GameControlsProps) {
  return (
    <div className="bg-white border rounded-lg p-4 mb-4">
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
        <Button onClick={() => onDecision('merge')} className="w-full sm:w-32 bg-green-500 hover:bg-green-600">
          <GitMergeIcon className="mr-2 h-4 w-4" /> Merge
        </Button>
        <Button onClick={() => onDecision('reject')} variant="destructive" className="w-full sm:w-32">
          <XIcon className="mr-2 h-4 w-4" /> Reject
        </Button>
        <Button onClick={onCoffeeBoost} disabled={coffeeBoost} className="w-full sm:w-40 bg-yellow-500 hover:bg-yellow-600 disabled:bg-yellow-300">
          <CoffeeIcon className="mr-2 h-4 w-4" /> Coffee Boost
        </Button>
      </div>
    </div>
  )
}
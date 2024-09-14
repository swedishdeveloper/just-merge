"use client";

import { Button } from "@/components/ui/button";
import {
  GitMergeIcon,
  XIcon,
  AlertTriangleIcon,
  CoffeeIcon,
} from "lucide-react";
import { GameControlsProps } from "@/types/GameControlsProps";

export function GameControls({
  onDecision,
  onCoffeeBoost,
  coffeeBoost,
}: GameControlsProps) {
  return (
    <div className="border border-gray-700 rounded-lg p-4 flex bg-white">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 w-full">
        <Button
          onClick={() => onDecision("merge")}
          className="w-full bg-green-500 hover:bg-green-600 text-green-900 font-bold"
        >
          <GitMergeIcon className="mr-2 h-4 w-4" /> Merge
        </Button>
        <Button
          onClick={() => onDecision("reject")}
          className="w-full bg-red-500 hover:bg-red-600 text-red-900 font-bold"
        >
          <XIcon className="mr-2 h-4 w-4" /> Reject
        </Button>
        <Button
          onClick={onCoffeeBoost}
          disabled={coffeeBoost}
          className="w-full bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 text-amber-900 font-bold"
        >
          <CoffeeIcon className="mr-2 h-4 w-4" /> Coffee Boost
        </Button>
      </div>
    </div>
  );
}

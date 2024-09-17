"use client";

import { Button } from "@/components/ui/button";
import { GitMergeIcon, XIcon, CoffeeIcon } from "lucide-react";
import { GameControlsProps } from "@/types/GameControlsProps";

export function GameControls({
  onDecision,
  onCoffeeBoost,
  coffeeBoost,
  waitingForPRs,
}: GameControlsProps) {
  return (
    <div className="border border-gray-700 rounded-lg p-4 flex">
      <div className="grid grid-rows-1 grid-cols-2 sm:grid-cols-3 justify-between items-center gap-4 w-full">
        <Button
          onClick={() => onDecision("merge")}
          className="w-full bg-green-500 hover:bg-green-600 text-green-900 font-bold"
          disabled={waitingForPRs}
        >
          <GitMergeIcon className="mr-2 h-4 w-4" /> Merge
        </Button>
        <Button
          onClick={() => onDecision("reject")}
          className="w-full bg-red-500 hover:bg-red-600 text-red-900 font-bold"
          disabled={waitingForPRs}
        >
          <XIcon className="mr-2 h-4 w-4" /> Reject
        </Button>
        <Button
          onClick={onCoffeeBoost}
          disabled={coffeeBoost || waitingForPRs}
          className={`w-full bg-amber-500 hover:bg-amber-600 disabled:bg-amber-300 text-amber-900 font-bold col-span-2 sm:col-auto ${
            coffeeBoost && "animate-bounce"
          }`}
        >
          {coffeeBoost ? (
            <>
              <CoffeeIcon className="mr-2 h-4 w-4" /> Coffee Boost Active! 2x
              Points!
            </>
          ) : (
            <>
              <CoffeeIcon className="mr-2 h-4 w-4" /> Coffee Boost
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

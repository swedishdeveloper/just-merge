"use client";

import { CheckCircleIcon } from "lucide-react";

export function CorrectDecisionNotification(): JSX.Element {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <CheckCircleIcon className="h-32 w-32 text-green-500 z-10" />
    </div>
  );
}

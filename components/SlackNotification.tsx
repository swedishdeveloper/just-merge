"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { XCircleIcon } from "lucide-react";
import { useEffect } from "react";
import { SlackNotificationProps } from "@/types/SlackNotificationProps";

export function SlackNotification({ errors, onClose }: SlackNotificationProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed right-4 bottom-4 z-50 p-4 bg-white border border-gray-200 rounded-lg shadow-xl animate-slide-up max-w-md">
      <div className="flex items-start space-x-3">
        <Avatar className="w-10 h-10 rounded">
          <AvatarImage src="/angry-developer.svg" alt="Angry Developer" />
          <AvatarFallback>AD</AvatarFallback>
        </Avatar>
        <div className="flex-grow">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-base font-bold text-gray-900">
              Angry Developer
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <XCircleIcon className="h-5 w-5" />
              <span className="sr-only">Close notification</span>
            </button>
          </div>
          <p className="text-sm text-gray-700 mb-2">
            🚨 Merge Failed - Critical Issues Detected
          </p>
          <div className="bg-gray-100 rounded p-3 font-mono text-xs text-gray-800 max-h-40 overflow-y-auto">
            {errors.map((error, index) => (
              <div key={index} className="mb-1 last:mb-0">
                <span className="text-red-500">Error {index + 1}:</span> {error}
              </div>
            ))}
          </div>
          <p className="mt-2 text-sm text-gray-700">
            This needs immediate attention. Fix these issues ASAP or we'll need
            to escalate! 😠
          </p>
        </div>
      </div>
    </div>
  );
}

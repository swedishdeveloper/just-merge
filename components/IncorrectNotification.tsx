"use client";

import { useState, useEffect } from "react";
import { CheckCircleIcon } from "lucide-react";

export function IncorrectNotification() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <CheckCircleIcon className="h-32 w-32 text-red-500 animate-scale-up" />
    </div>
  );
}

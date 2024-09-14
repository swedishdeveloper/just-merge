import React from "react";

interface ErrorProps {
  message: string;
}

const Error: React.FC<ErrorProps> = () => {
  return (
    <div
      className="text-red-700 p-4 rounded-r shadow-md items-center flex justify-center w-full"
      role="alert"
    >
      <div className="flex items-center">
        <div>
          <p className="font-bold text-xl">Error</p>
        </div>
      </div>
    </div>
  );
};

export default Error;

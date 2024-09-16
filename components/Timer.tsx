import { Progress } from "@/components/ui/progress";

export const Timer = ({
  InitialTime,
  timeLeft,
}: {
  InitialTime: number;
  timeLeft: number;
}) => {
  return (
    <div className="flex items-center gap-4">
      <Progress
        value={(timeLeft / InitialTime) * 100}
        className="w-[100px] bg-gray-300"
      />
      <span className="font-mono text-lg">{timeLeft}s</span>
    </div>
  );
};

import {
  GitPullRequestIcon,
  GitCommitIcon,
  MessageSquareIcon,
} from "lucide-react";
import { GameStats } from "@/types/GameStats";

export default function Footer({
  completedJobs,
  gameStats,
}: {
  completedJobs: number[];
  gameStats: GameStats;
}) {
  return (
    <div className="flex justify-center gap-4 text-xs text-gray-500 text-center">
      <div className="flex items-center">
        <GitPullRequestIcon className="mr-1 h-4 w-4" />
        <span>
          {completedJobs?.length}/{gameStats.totalPRs}
        </span>
        <span className="hidden sm:block">pull requests</span>
      </div>
    </div>
  );
}

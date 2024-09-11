import {
  GitPullRequestIcon,
  GitCommitIcon,
  MessageSquareIcon,
} from "lucide-react";
import { GameStats } from "@/types/GameStats";

export default function Footer({
  currentPRIndex,
  gameStats,
}: {
  currentPRIndex: number;
  gameStats: GameStats;
}) {
  return (
    <div className="mt-8 flex justify-center gap-4 text-sm text-gray-500">
      <span className="flex items-center">
        <GitPullRequestIcon className="mr-1 h-4 w-4" /> {currentPRIndex + 1}/
        {gameStats.totalPRs} pull requests
      </span>
      <span className="flex items-center">
        <MessageSquareIcon className="mr-1 h-4 w-4" /> {gameStats.totalComments}{" "}
        total comments
      </span>
      <span className="flex items-center">
        <GitCommitIcon className="mr-1 h-4 w-4" /> {gameStats.totalCommits}{" "}
        total commits
      </span>
    </div>
  );
}

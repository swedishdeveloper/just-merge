"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  GitPullRequestIcon,
  MessageSquareIcon,
  GitCommitIcon,
  StarIcon,
  CoffeeIcon,
  RocketIcon,
} from "lucide-react";
import { prData } from "@/lib/pr-data";
import confetti from "canvas-confetti";
import { SlackNotification } from "@/components/slack-notification";
import { CorrectDecisionNotification } from "@/components/correct-decision-notification";
import { PRDetails } from "@/components/pr-details";
import { GameControls } from "./game-controls";

export function PrReviewGame() {
  const [currentPRIndex, setCurrentPRIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameOver, setGameOver] = useState(false);
  const [streak, setStreak] = useState(0);
  const [coffeeBoost, setCoffeeBoost] = useState(false);
  const [errorLogs, setErrorLogs] = useState<string[]>([]);
  const [showErrorLog, setShowErrorLog] = useState(false);
  const [showCorrectDecision, setShowCorrectDecision] = useState(false);

  useEffect(() => {
    if (timeLeft > 0 && !gameOver) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameOver(true);
    }
  }, [timeLeft, gameOver]);

  const handleDecision = useCallback(
    (decision: "merge" | "reject" | "needsWork") => {
      const currentPR = prData[currentPRIndex];
      const isCorrectDecision =
        (currentPR.isCorrect && decision === "merge") ||
        (!currentPR.isCorrect && decision === "reject");

      if (decision === "merge" && !currentPR.isCorrect) {
        setStreak(0);
        const newErrors = [
          `Error: Failed to merge PR "${currentPR.title}"`,
          "TypeError: Cannot read property 'merge' of undefined",
          "at MergeHandler.performMerge (/app/handlers/merge.js:42:19)",
          "at processTicksAndRejections (internal/process/task_queues.js:95:5)",
          "Application crashed. Restarting...",
        ];
        setErrorLogs(newErrors);
        setShowErrorLog(true);

        // Move to the next PR
        if (currentPRIndex < prData.length - 1) {
          setCurrentPRIndex((prevIndex) => prevIndex + 1);
        } else {
          setGameOver(true);
        }
        return;
      }

      if (isCorrectDecision) {
        const baseScore = 10;
        const streakBonus = streak * 5;
        const coffeeMultiplier = coffeeBoost ? 2 : 1;
        const pointsEarned = (baseScore + streakBonus) * coffeeMultiplier;

        setScore((prevScore) => prevScore + pointsEarned);
        setStreak((prevStreak) => prevStreak + 1);
        setShowCorrectDecision(true);

        if (streak + 1 >= 3) {
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
          });
        }
      } else {
        setStreak(0);
      }

      // Always move to the next PR after a decision
      if (currentPRIndex < prData.length - 1) {
        setCurrentPRIndex((prevIndex) => prevIndex + 1);
      } else {
        setGameOver(true);
      }
    },
    [currentPRIndex, streak, coffeeBoost]
  );

  const restartGame = useCallback(() => {
    setCurrentPRIndex(0);
    setScore(0);
    setTimeLeft(30);
    setGameOver(false);
    setStreak(0);
    setCoffeeBoost(false);
    setErrorLogs([]);
    setShowErrorLog(false);
    setShowCorrectDecision(false);
  }, []);

  const activateCoffeeBoost = useCallback(() => {
    setCoffeeBoost(true);
    setTimeout(() => setCoffeeBoost(false), 10000); // Coffee boost lasts for 10 seconds
  }, []);

  const closeErrorNotification = useCallback(() => {
    setShowErrorLog(false);
  }, []);

  const closeCorrectDecisionNotification = useCallback(() => {
    setShowCorrectDecision(false);
  }, []);

  const currentPR = prData[currentPRIndex];

  return (
    <div className="mx-auto p-4 bg-gray-100 rounded-lg shadow w-1/2">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">GitHub PR Review Game</h1>
        <div className="flex items-center gap-4">
          <Badge variant="secondary" className="text-lg">
            Score: {score}
          </Badge>
          <Progress value={(timeLeft / 30) * 100} className="w-[100px]" />
          <span className="font-mono text-lg">{timeLeft}s</span>
        </div>
      </div>

      {!gameOver ? (
        <div className="relative">
          {showErrorLog && (
            <SlackNotification
              errors={errorLogs}
              onClose={closeErrorNotification}
            />
          )}
          {showCorrectDecision && <CorrectDecisionNotification />}
          <PRDetails pr={currentPR} />
          <GameControls
            onDecision={handleDecision}
            onCoffeeBoost={activateCoffeeBoost}
            coffeeBoost={coffeeBoost}
          />
          {streak > 1 && (
            <div className="mt-4 text-center">
              <Badge variant="secondary" className="text-lg animate-pulse">
                <StarIcon className="mr-1 h-4 w-4" /> {streak} Streak! +
                {streak * 5} bonus
              </Badge>
            </div>
          )}
          {coffeeBoost && (
            <div className="mt-4 text-center">
              <Badge variant="secondary" className="text-lg animate-bounce">
                <CoffeeIcon className="mr-1 h-4 w-4" /> Coffee Boost Active! 2x
                Points!
              </Badge>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center bg-white p-8 rounded-lg">
          <h2 className="text-3xl font-bold mb-4">Game Over!</h2>
          <p className="text-2xl mb-4">Your final score: {score}</p>
          <Button onClick={restartGame} size="lg" className="animate-bounce">
            <RocketIcon className="mr-2 h-5 w-5" /> Play Again
          </Button>
        </div>
      )}

      <div className="mt-8 flex justify-center gap-4 text-sm text-gray-500">
        <span className="flex items-center">
          <GitPullRequestIcon className="mr-1 h-4 w-4" /> {currentPRIndex + 1}/
          {prData.length} pull requests
        </span>
        <span className="flex items-center">
          <MessageSquareIcon className="mr-1 h-4 w-4" />{" "}
          {prData.reduce((sum, pr) => sum + pr.comments, 0)} total comments
        </span>
        <span className="flex items-center">
          <GitCommitIcon className="mr-1 h-4 w-4" />{" "}
          {prData.reduce((sum, pr) => sum + pr.commits, 0)} total commits
        </span>
      </div>

      <style jsx global>{`
        @keyframes slide-down {
          from {
            transform: translateY(-100%);
          }
          to {
            transform: translateY(0);
          }
        }
        .animate-slide-down {
          animation: slide-down 0.5s ease-out;
        }
        @keyframes slide-up {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}

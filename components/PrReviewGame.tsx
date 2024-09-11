"use client";

import { useState, useEffect, useCallback, useMemo, use } from "react";
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
import { generatePRData } from "@/lib/gpt4-pr-generator";
import confetti from "canvas-confetti";
import { CorrectDecisionNotification } from "@/components/CorrectDescisionNotification";
import { IncorrectNotification } from "@/components/IncorrectNotification";
import { PRDetails } from "@/components/PrDetails";
import { GameControls } from "./GameControls";
import Footer from "./Footer";
import { GameStats } from "@/types/GameStats";

const INITIAL_TIME = 60;
const COFFEE_BOOST_DURATION = 10000;

export function PrReviewGame() {
  const [prData, setPRData] = useState([]);
  const [currentPRIndex, setCurrentPRIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const [gameOver, setGameOver] = useState(false);
  const [streak, setStreak] = useState(0);
  const [coffeeBoost, setCoffeeBoost] = useState(false);
  const [showErrorLog, setShowErrorLog] = useState(false);
  const [showCorrectDecision, setShowCorrectDecision] = useState(false);
  const [completedJobs, setCompletedJobs] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPRData();
  }, []);

  useEffect(() => {
    if (gameOver || timeLeft <= 0) {
      setGameOver(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [gameOver, timeLeft]);

  useEffect(() => {
    if (completedJobs.length === prData.length && prData.length > 0) {
      setGameOver(true);
      confetti();
    }
  }, [completedJobs, prData, timeLeft]);

  useEffect(() => {
    console.log("Current PR index:", currentPRIndex);
    console.log("Job completed:", completedJobs);
  }, [currentPRIndex, completedJobs]);

  const fetchPRData = async () => {
    try {
      setIsLoading(true);
      const data = await generatePRData();
      setPRData(data);
    } catch (error) {
      console.error("Failed to fetch PR data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDecision = (decision: string) => {
    console.log("Handle decision", decision);
    const currentPR = prData[currentPRIndex];
    const isCorrectDecision =
      (currentPR.isCorrect && decision === "merge") ||
      (!currentPR.isCorrect && decision === "reject");

    if (isCorrectDecision) {
      const baseScore = 10;
      const streakBonus = streak * 5;
      const coffeeMultiplier = coffeeBoost ? 2 : 1;
      const pointsEarned = (baseScore + streakBonus) * coffeeMultiplier;

      setScore((prev) => prev + pointsEarned);
      setStreak((prev) => prev + 1);
      setShowCorrectDecision(true);

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } else {
      setStreak(0);
      setShowErrorLog(true);
    }

    const timer = setTimeout(() => {
      const newIndex = randomPRIndex();
      setCurrentPRIndex(newIndex);
      setShowCorrectDecision(false);
      setShowErrorLog(false);
      setCompletedJobs((prev) => [...prev, newIndex]);
    }, 1000);
  };

  const restartGame = useCallback(() => {
    setCurrentPRIndex(0);
    setScore(0);
    setTimeLeft(INITIAL_TIME);
    setGameOver(false);
    setStreak(0);
    setCoffeeBoost(false);
    setShowErrorLog(false);
    setShowCorrectDecision(false);
    setCompletedJobs([]);
    fetchPRData();
  }, []);

  const activateCoffeeBoost = useCallback(() => {
    setCoffeeBoost(true);
    setTimeout(() => setCoffeeBoost(false), COFFEE_BOOST_DURATION);
  }, []);

  const gameStats: GameStats = useMemo(
    () => ({
      totalPRs: prData.length,
      totalComments: prData.reduce((sum, pr) => sum + pr.comments, 0),
      totalCommits: prData.reduce((sum, pr) => sum + pr.commits, 0),
    }),
    [prData]
  );

  const randomPRIndex = useCallback((): number => {
    const availablePRs = prData.filter(
      (_, index) => !completedJobs.includes(index)
    );
    return availablePRs.length
      ? prData.indexOf(
          availablePRs[Math.floor(Math.random() * availablePRs.length)]
        )
      : -1;
  }, [prData, completedJobs]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="mx-auto p-4 bg-gray-100 rounded-lg shadow w-full max-w-2xl">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <GitPullRequestIcon className="w-8 h-8 text-blue-500" />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
            Just Merge
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <Progress
            value={(timeLeft / INITIAL_TIME) * 100}
            className="w-[100px] bg-gray-300"
          />
          <span className="font-mono text-lg">{timeLeft}s</span>
        </div>
      </div>

      {!gameOver ? (
        <div className="relative">
          {showErrorLog && <IncorrectNotification />}
          {showCorrectDecision && <CorrectDecisionNotification />}
          <PRDetails pr={prData[currentPRIndex]} />
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

      <Footer gameStats={gameStats} score={score} />
    </div>
  );
}

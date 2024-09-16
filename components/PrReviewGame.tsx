"use client";

import { useState, useEffect, useMemo } from "react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { GitPullRequestIcon, StarIcon, CoffeeIcon } from "lucide-react";
import { generatePRData } from "@/lib/gpt";
import confetti from "canvas-confetti";
import { CorrectDecisionNotification } from "@/components/CorrectDescisionNotification";
import { IncorrectNotification } from "@/components/IncorrectNotification";
import { PRDetails } from "@/components/PrDetails";
import { GameControls } from "./GameControls";
import Footer from "./Footer";
import { GameStats } from "@/types/GameStats";
import Loading from "./Loading";
import Error from "./Error";
import GameOver from "./GameOver";
import { PR } from "@/types/PR";
import { Timer } from "./Timer";

const InitialTime = 60;
const COFFEE_BOOST_DURATION = 10000;

export function PrReviewGame() {
  const [prData, setPRData] = useState<PR[]>([]);
  const [currentPRIndex, setCurrentPRIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(InitialTime);
  const [gameOver, setGameOver] = useState(false);
  const [streak, setStreak] = useState(0);
  const [coffeeBoost, setCoffeeBoost] = useState(false);
  const [showErrorLog, setShowErrorLog] = useState(false);
  const [showCorrectDecision, setShowCorrectDecision] = useState(false);
  const [completedJobs, setCompletedJobs] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    fetchPRData();
  }, []);

  useEffect(() => {
    if (gameOver || timeLeft <= 0) {
      setGameOver(true);
      return;
    }

    if (!gameStarted) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [gameOver, timeLeft, gameStarted]);

  useEffect(() => {
    if (completedJobs.length === prData.length && prData.length > 0) {
      setGameOver(true);
      confetti();
    }
  }, [completedJobs, prData, timeLeft]);

  const fetchPRData = async () => {
    try {
      setIsLoading(true);
      const data = await generatePRData();
      setPRData(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch PR data:", error);
      setIsError(true);
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

    return () => clearTimeout(timer);
  };

  const restartGame = () => {
    setCurrentPRIndex(0);
    setScore(0);
    setTimeLeft(InitialTime);
    setGameOver(false);
    setStreak(0);
    setCoffeeBoost(false);
    setShowErrorLog(false);
    setShowCorrectDecision(false);
    setCompletedJobs([]);
    fetchPRData();
  };

  const activateCoffeeBoost = () => {
    setCoffeeBoost(true);
    setTimeout(() => setCoffeeBoost(false), COFFEE_BOOST_DURATION);
  };

  const gameStats: GameStats = useMemo(
    () => ({
      totalPRs: prData.length,
      totalComments: prData.reduce((sum, pr) => sum + pr.comments, 0),
      totalCommits: prData.reduce((sum, pr) => sum + pr.commits, 0),
    }),
    [prData]
  );

  const randomPRIndex = () => {
    const availablePRs = prData.filter(
      (_, index) => !completedJobs.includes(index)
    );
    return availablePRs.length
      ? prData.indexOf(
          availablePRs[Math.floor(Math.random() * availablePRs.length)]
        )
      : -1;
  };

  if (isError) {
    return <Error />;
  }

  return (
    <div className="bg-darkMuted rounded-lg shadow w-full max-w-5xl flex flex-1 flex-col p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <GitPullRequestIcon className="w-8 h-8 text-blue-500" />
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
            Just Merge
          </h1>
        </div>
        {gameStarted && <Timer InitialTime={InitialTime} timeLeft={timeLeft} />}
      </div>
      {!gameOver && !isLoading ? (
        <div className="relative flex flex-col gap-5 w-full flex-1 min-h-0 justify-between">
          {showErrorLog && <IncorrectNotification />}
          {showCorrectDecision && <CorrectDecisionNotification />}
          <PRDetails pr={prData[currentPRIndex]} />
          {gameStarted ? (
            <div className="flex gap-5 flex-col">
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
                    <CoffeeIcon className="mr-1 h-4 w-4" /> Coffee Boost Active!
                    2x Points!
                  </Badge>
                </div>
              )}
              <Footer currentPRIndex={currentPRIndex} gameStats={gameStats} />
            </div>
          ) : (
            prData &&
            prData.length > 0 && (
              <button
                onClick={() => setGameStarted(true)}
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-md"
              >
                Start Game
              </button>
            )
          )}
        </div>
      ) : gameOver ? (
        <GameOver score={score} restartGame={restartGame} />
      ) : (
        isLoading && <Loading />
      )}
    </div>
  );
}

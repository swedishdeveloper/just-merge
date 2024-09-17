"use client";

import { useState, useEffect, useMemo } from "react";
import { GitPullRequestIcon } from "lucide-react";
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
import StartGame from "./StartGame";

const InitialTime = 120;
const COFFEE_BOOST_DURATION = 10000;
const prCount = 12;

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
  const [waitingForPRs, setWaitingForPRs] = useState(false);

  useEffect(() => {
    fetchPRs();
  }, []);

  useEffect(() => {
    if (gameOver || timeLeft <= 0) {
      setGameOver(true);
      return;
    }

    if (!gameStarted || isLoading) return;

    checkWaitingForPRs();

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [gameOver, timeLeft, gameStarted, isLoading]);

  useEffect(() => {
    if (isGameFinished()) {
      setGameOver(true);
      confetti();
    }
  }, [completedJobs, prData, timeLeft]);

  const fetchPRs = async () => {
    setPRData([]);
    try {
      setIsLoading(true);
      const response = await fetch(`/api/pr/?limit=12`);
      const data = await response.json();
      setPRData(data.PRs);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch PRs:", error);
      setIsError(true);
      setIsLoading(false);
    }
  };

  const handleDecision = (decision: string) => {
    if (waitingForPRs) {
      return;
    }

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
    setPRData([]);
    fetchPRs();
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

  const isGameFinished = () => {
    return completedJobs.length === prCount;
  };

  const checkWaitingForPRs = () => {
    setWaitingForPRs(
      completedJobs.length === prData.length && prData.length < prCount
    );
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
      {!gameOver && !isLoading && gameStarted ? (
        <div className="relative flex flex-col gap-5 w-full flex-1 min-h-0 justify-between">
          {showErrorLog && <IncorrectNotification />}
          {showCorrectDecision && <CorrectDecisionNotification />}
          <PRDetails pr={prData[currentPRIndex]} streak={streak} />
          <div className="flex gap-5 flex-col">
            <GameControls
              onDecision={handleDecision}
              onCoffeeBoost={activateCoffeeBoost}
              coffeeBoost={coffeeBoost}
              waitingForPRs={waitingForPRs}
            />
            <Footer completedJobs={completedJobs} gameStats={gameStats} />
          </div>
        </div>
      ) : gameOver ? (
        <GameOver score={score} restartGame={restartGame} />
      ) : isLoading ? (
        <Loading />
      ) : (
        prData &&
        prData.length > 0 && <StartGame setGameStarted={setGameStarted} />
      )}
    </div>
  );
}

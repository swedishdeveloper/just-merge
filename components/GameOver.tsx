import { Button } from "@/components/ui/button";
import { RocketIcon } from "lucide-react";
import { GameOverProps } from "@/types/GameOver";

const GameOver = ({ score, restartGame }: GameOverProps) => {
  return (
    <div className="text-center bg-darkGreen p-12 rounded-xl flex flex-1 flex-col justify-center items-center">
      <h2 className="text-4xl font-bold mb-6 text-lightGreen">Game Over!</h2>
      <p className="text-3xl mb-8 text-white">
        Your final score:{" "}
        <span className="font-bold text-yellow-400">{score}</span>
      </p>
      <Button
        onClick={restartGame}
        size="lg"
        className=" bg-green-500 hover:bg-green-600 text-green-900 font-bold"
      >
        <RocketIcon className="mr-3 h-6 w-6" /> Play Again
      </Button>
    </div>
  );
};

export default GameOver;

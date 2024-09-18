import { Button } from "@/components/ui/button";
import Image from "next/image";

const StartGame = ({
  setGameStarted,
}: {
  setGameStarted: (value: boolean) => void;
}) => {
  return (
    <div className="bg-darkGreen h-full flex flex-col items-start justify-end gap-5 rounded-lg p-4">
      <div className="h-full relative w-full flex flex-col">
        <Image
          src="/merge.png"
          alt="Merge illustration"
          className="object-left object-cover rounded-lg shadow-lg opacity-50"
          fill
          priority
        />
      </div>
      <h1 className="text-4xl font-bold text-lightGreen">How to play</h1>
      <p>
        Just Merge is a game where you have to review pull requests and decide
        whether to merge them or not. You get points for each correct decision.
      </p>
      <p>
        You can also use a coffee boost to double your points for a limited
        time. The game ends when you make an incorrect decision or run out of
        time. Good luck!
      </p>
      <Button
        onClick={() => setGameStarted(true)}
        className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
      >
        Start Game
      </Button>
    </div>
  );
};

export default StartGame;

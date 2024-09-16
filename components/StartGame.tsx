import { Button } from "@/components/ui/button";

const StartGame = ({
  setGameStarted,
}: {
  setGameStarted: (value: boolean) => void;
}) => {
  return (
    <div className="bg-darkGreen h-full flex flex-col items-center justify-center gap-5">
      <h1 className="text-4xl font-bold text-lightGreen">How to play</h1>
      <p className="text-center text-softWhite px-20">
        Just Merge is a game where you have to review pull requests and decide
        whether to merge them or not. You get points for each correct decision.
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

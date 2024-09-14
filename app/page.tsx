import { PrReviewGame } from "@/components/PrReviewGame";

export default function Home() {
  return (
    <div className="h-screen flex flex-col justify-center sm:py-20">
      <main className="flex justify-center items-stretch h-full">
        <PrReviewGame />
      </main>
      <footer className="w-full flex items-center justify-center p-2 text-gray-500">
        Made by{" "}
        <a
          href="https://github.com/swedishdeveloper"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline ml-1"
        >
          swedishdeveloper
        </a>
      </footer>
    </div>
  );
}

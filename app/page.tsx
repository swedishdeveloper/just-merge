import { PrReviewGame } from "@/components/PrReviewGame";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex h-screen items-stretch py-10">
      <PrReviewGame />
    </main>
  );
}

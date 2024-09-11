import { PR } from "@/types/PR";
import { generatePRData } from "@/lib/gpt4-pr-generator";

export let prData: PR[] = [];

export async function initializePRData() {
  const prData = await generatePRData();
  return prData;
}

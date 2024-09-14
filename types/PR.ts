export interface PR {
  title: string;
  description: string;
  filename: string;
  oldCode: string;
  newCode: string;
  startingLineNumber: number;
  user: {
    name: string;
    avatar: string;
  };
  labels: string[];
  commits: number;
  comments: number;
  isCorrect: boolean;
}

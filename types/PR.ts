export interface PR {
  user: {
    name: string;
    avatar: string;
  };
  commits: number;
  title: string;
  labels: string[];
  description: string;
  code: string;
  comments: number;
  isCorrect: boolean;
}

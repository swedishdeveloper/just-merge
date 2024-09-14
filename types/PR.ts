export interface PR {
  title: string;
  description: string;
  code: string;
  user: {
    name: string;
    avatar: string;
  };
  labels: string[];
  commits: number;
  comments: number;
  isCorrect: boolean;
}

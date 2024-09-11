interface PR {
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

export const prData: PR[] = [
  {
    title: "Add dark mode toggle",
    description: "Implements a dark mode toggle in the navbar",
    code: `
const DarkModeToggle = () => {
  const [isDark, setIsDark] = useState(false);
  
  const toggleDarkMode = () => {
    setIsDark(!isDark);
    document.body.classList.toggle('dark-mode');
  };

  return <button onClick={toggleDarkMode}>{isDark ? '🌙' : '☀️'}</button>;
};
`,
    user: {
      name: "Alex Chen",
      avatar: "https://i.pravatar.cc/150?img=11",
    },
    labels: ["feature", "ui/ux"],
    commits: 1,
    comments: 2,
    isCorrect: true,
  },
  {
    title: "Fix login bug",
    description: "Resolves issue where users couldn't log in on Tuesdays",
    code: `
function login(username, password) {
  const dayOfWeek = new Date().getDay();
  if (dayOfWeek === 2) {
    return 'Sorry, logins are not allowed on Tuesdays';
  }
  // Actual login logic here
}
`,
    user: {
      name: "Bugs Bunny",
      avatar: "https://i.pravatar.cc/150?img=22",
    },
    labels: ["bug", "critical"],
    commits: 1,
    comments: 3,
    isCorrect: false,
  },
  {
    title: "Implement quantum encryption",
    description: "Adds unbreakable quantum encryption to our chat app",
    code: `
function quantumEncrypt(message) {
  return message.split('').map(char => {
    const quantumState = Math.random() > 0.5 ? '1' : '0';
    return char + quantumState;
  }).join('');
}
`,
    user: {
      name: "Schrödinger's Cat",
      avatar: "https://i.pravatar.cc/150?img=33",
    },
    labels: ["security", "quantum"],
    commits: 2,
    comments: 5,
    isCorrect: false,
  },
  {
    title: "Add coffee maker API integration",
    description: "Connects our app to the office coffee maker",
    code: `
async function brewCoffee(type, size) {
  const response = await fetch('https://api.office-coffee-maker.com/brew', {
    method: 'POST',
    body: JSON.stringify({ type, size }),
  });
  return response.json();
}
`,
    user: {
      name: "Java Junkie",
      avatar: "https://i.pravatar.cc/150?img=44",
    },
    labels: ["feature", "caffeine"],
    commits: 3,
    comments: 4,
    isCorrect: true,
  },
  {
    title: "Implement AI-powered code review",
    description: "Uses GPT-4 to automatically review and approve all PRs",
    code: `
async function aiReviewPR(prContent) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: { 'Authorization': 'Bearer ' + process.env.OPENAI_API_KEY },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [{ role: "user", content: "Please review this PR: " + prContent }]
    })
  });
  const result = await response.json();
  return result.choices[0].message.content.includes('LGTM') ? 'approved' : 'needs work';
}
`,
    user: {
      name: "AI Overlord",
      avatar: "https://i.pravatar.cc/150?img=55",
    },
    labels: ["ai", "automation"],
    commits: 1,
    comments: 10,
    isCorrect: false,
  },
  {
    title: "Implement time travel debugging",
    description: "Adds ability to debug code by traveling through time",
    code: `
function timeTravel(timestamp) {
  const flux = new FluxCapacitor();
  flux.chargeUp(1.21, 'gigawatts');
  return flux.transport(timestamp);
}
`,
    user: {
      name: "Doc Brown",
      avatar: "https://i.pravatar.cc/150?img=66",
    },
    labels: ["feature", "debugging"],
    commits: 4,
    comments: 8,
    isCorrect: false,
  },
  {
    title: "Add teleportation feature",
    description:
      "Allows users to teleport to meetings instead of using video calls",
    code: `
function teleport(user, destination) {
  const particles = disassemble(user);
  const reassembled = reassemble(particles, destination);
  return reassembled ? 'Teleportation successful' : 'Teleportation failed';
}
`,
    user: {
      name: "Scotty",
      avatar: "https://i.pravatar.cc/150?img=77",
    },
    labels: ["feature", "transportation"],
    commits: 2,
    comments: 6,
    isCorrect: false,
  },
  {
    title: "Implement mind reading for user research",
    description:
      "Uses advanced neurotechnology to read users' minds for better UX",
    code: `
async function readUserMind(user) {
  const brainwaves = await capturebrainwaves(user);
  const thoughts = decodebrainwaves(brainwaves);
  return thoughts.filter(thought => thought.relevantToUX);
}
`,
    user: {
      name: "Professor X",
      avatar: "https://i.pravatar.cc/150?img=88",
    },
    labels: ["research", "ux"],
    commits: 1,
    comments: 7,
    isCorrect: false,
  },
  {
    title: "Add dragon-powered server cooling",
    description: "Uses trained dragons to cool our server rooms",
    code: `
class DragonCoolingSystem {
  constructor(dragons) {
    this.dragons = dragons;
  }

  coolServers() {
    this.dragons.forEach(dragon => dragon.breathe('ice'));
    return 'Servers cooled to optimal temperature';
  }
}
`,
    user: {
      name: "Daenerys Targaryen",
      avatar: "https://i.pravatar.cc/150?img=99",
    },
    labels: ["infrastructure", "cooling"],
    commits: 3,
    comments: 5,
    isCorrect: false,
  },
  {
    title: "Implement rubber duck debugging AI",
    description: "Creates an AI-powered rubber duck for debugging assistance",
    code: `
class AIRubberDuck {
  constructor() {
    this.knowledge = loadprogrammingknowledge();
  }

  listen(problem) {
    console.log("Quack! Tell me more about your problem.");
    const solution = this.knowledge.find(k => k.relevantTo(problem));
    return solution ? solution.explain() : "Quack! Have you tried turning it off and on again?";
  }
}
`,
    user: {
      name: "Debuggy Duck",
      avatar: "https://i.pravatar.cc/150?img=12",
    },
    labels: ["tool", "debugging"],
    commits: 2,
    comments: 4,
    isCorrect: true,
  },
  {
    title: "Implement mood-based code reviews",
    description:
      "Uses sentiment analysis to review code based on author's mood",
    code: `
async function moodReviewPR(prContent, author) {
  const mood = await analyzeMood(author);
  if (mood === 'happy') {
    return 'LGTM';
  } else if (mood === 'angry') {
    return 'Needs work';
  } else {
    return 'Hmmm...
  }
}
`,
    user: {
      name: "Emotion AI",
      avatar: "https://i.pravatar.cc/150?img=23",
    },
    labels: ["ai", "review"],
    commits: 1,
    comments: 3,
    isCorrect: false,
  },
  {
    title: "Add emoji-based code review",
    description: "Uses emojis to review and approve PRs",
    code: `
function emojiReviewPR(prContent) {
  const emojis = prContent.match(/:[a-z_]+:/g);
  return emojis.includes(':thumbsup:') ? 'LGTM' : 'Needs work';
}
`,
    user: {
      name: "Emoji Expert",
      avatar: "https://i.pravatar.cc/150?img=34",
    },
    labels: ["review", "fun"],
    commits: 1,
    comments: 2,
    isCorrect: true,
  },
  {
    title: "Implement code review by telepathy",
    description: "Review PRs by reading authors' minds",
    code: `
function telepathicReviewPR(prContent, author) {
  const thoughts = readMind(author);
  return thoughts.includes('LGTM') ? 'approved' : 'needs work';
}
`,
    user: {
      name: "Professor X",
      avatar: "https://i.pravatar.cc/150?img=88",
    },
    labels: ["review", "telepathy"],
    commits: 1,
    comments: 5,
    isCorrect: false,
  },
  {
    title: "Add rubber duck debugging",
    description: "Adds rubber duck debugging to our codebase",
    code: `
function rubberDuckDebug(problem) {
  console.log("🦆: Tell me about your problem.");
  return "🦆: Have you tried turning it off and on again?";
}
`,
    user: {
      name: "Debuggy Duck",
      avatar: "https://i.pravatar.cc/150?img=12",
    },
    labels: ["debugging", "tool"],
    commits: 1,
    comments: 4,
    isCorrect: true,
  },
  {
    title: "Implement code review by emoji",
    description: "Uses emojis to review and approve PRs",
    code: `
function emojiReviewPR(prContent) {
  const emojis = prContent.match(/:[a-z_]+:/g);
  return emojis.includes(':thumbsup:') ? 'LGTM' : 'Needs work';
}
`,
  },
];

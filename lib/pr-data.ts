export const prData = [
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
];
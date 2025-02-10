export const productivityTips = [
  {
    trigger: ["tip", "advice", "help", "productive"],
    response:
      "Here's a productivity tip: Use the Pomodoro technique - work for 25 minutes, then take a 5-minute break. This helps maintain focus and prevents burnout.",
  },
  {
    trigger: ["break", "rest", "pause"],
    response:
      "Remember to take regular breaks! Short breaks every 25 minutes help maintain productivity and mental freshness.",
  },
  {
    trigger: ["focus", "concentrate", "distraction"],
    response:
      "To improve focus: 1) Clear your workspace 2) Use noise-canceling headphones 3) Turn off phone notifications 4) Set specific goals for each work session.",
  },
  {
    trigger: ["schedule", "plan", "task", "todo"],
    response:
      "I'll help you schedule that. Please provide the task details in this format: 'Schedule [task name] on [day] at [time]'",
  },
  {
    trigger: ["motivation", "motivate", "inspired"],
    response:
      "Remember: Small progress is still progress. Break down big tasks into smaller, manageable chunks and celebrate each completion.",
  },
];

export const parseScheduleCommand = (text: string) => {
  const scheduleRegex = /schedule\s+(.+?)\s+on\s+(.+?)\s+at\s+(.+)/i;
  const match = text.match(scheduleRegex);

  if (match) {
    return {
      title: match[1],
      date: match[2],
      time: match[3],
    };
  }
  return null;
};

export const getResponse = (input: string) => {
  input = input.toLowerCase();

  // Check for schedule command
  const scheduleCommand = parseScheduleCommand(input);
  if (scheduleCommand) {
    return {
      text: `I'll schedule "${scheduleCommand.title}" for ${scheduleCommand.date} at ${scheduleCommand.time}`,
      scheduleTask: scheduleCommand,
    };
  }

  // Check for matching tips
  for (const tip of productivityTips) {
    if (tip.trigger.some((t) => input.includes(t))) {
      return { text: tip.response };
    }
  }

  // Default response
  return {
    text: "I can help you with productivity tips and scheduling tasks. Try asking for a tip or schedule a task using 'Schedule [task] on [day] at [time]'.",
  };
};

export const getProductivityBadge = (productivity: number) => {
  if (productivity >= 90) {
    const goldQuotes = [
      "Outstanding consistency. You're operating at a very high level today.",
      "When you feel like quitting, remember the shoulders you are standing on.",
      "Your parents worked too hard for you to give up now.",
      "Honor their sacrifices by giving your absolute best every single day.",
      "They gave up their dreams so you could chase yours. Don't waste it.",
      "Make their struggles worth it by becoming the success they envisioned."
    ];
    return {
      badge: "🥇 Gold Day",
      quote: goldQuotes[Math.floor(Math.random() * goldQuotes.length)],
    };
  }

  if (productivity >= 82.5) {
    const silverQuotes = [
      "Strong work today. You're very close to a Gold day.",
      "Let your parents' retirement be the ultimate goal of your hustle.",
      "Work hard until your parents can walk into a store and never look at the price tag.",
      "Your daily effort is the only return on investment your parents want.",
      "When motivation fades, let the memory of your parents' hard work fire you up.",
      "They survived the storm so you could enjoy the sunshine. Keep pushing."
    ];
    return {
      badge: "🥈 Silver Day",
      quote: silverQuotes[Math.floor(Math.random() * silverQuotes.length)],
    };
  }

  if (productivity >= 75) {
    const bronzeQuotes = [
      "Strong work today. You're very close to a Silver day.",
      "Good progress. Keep the momentum going.",
      "Continuous improvement is better than delayed perfection.",
      "Focus on improvement, not perfection.",
      "Consistency beats intensity every single time."
    ];
    return {
      badge: "🥉 Bronze Day",
      quote: bronzeQuotes[Math.floor(Math.random() * bronzeQuotes.length)],
    };
  }

  const generalQuotes = [
    "Progress beats perfection.",
    "Small consistent actions create big results.",
    "A slow day is still better than a zero day.",
    "Focus on improvement, not perfection.",
    "Every expert was once a beginner.",
    "Great things are done by a series of small things brought together.",
    "The secret of your future is hidden in your daily routine.",
    "Do something today that your future self will thank you for.",
    "Little by little, a little becomes a lot.",
    "You do not have to see the whole staircase, just take the first step.",
    "Doubt kills more dreams than failure ever will.",
    "The only bad workout is the one that didn't happen.",
    "Action is the foundational key to all success.",
  ];

  return {
    badge: "🔴 Needs Improvement",
    quote: generalQuotes[Math.floor(Math.random() * generalQuotes.length)],
  };
};

// 1. Quiz questions array with MCQs, hints and time limit (in seconds)
const quizQuestions = [
  {
    question: "Who is known as the 'God of Cricket'?",
    options: [
      "A) Virat Kohli",
      "B) Sachin Tendulkar",
      "C) Ricky Ponting",
      "D) Brian Lara"
    ],
    correctOption: "b",
    answerText: "Sachin Tendulkar",
    hint: "He is an Indian legend with 100 international centuries.",
    timeLimit: 15
  },
  {
    question: "How many players are there in one cricket team on the field?",
    options: [
      "A) 9",
      "B) 10",
      "C) 11",
      "D) 12"
    ],
    correctOption: "c",
    answerText: "11 players",
    hint: "Think of a full football team count.",
    timeLimit: 15
  },
  {
    question: "What is the maximum number of overs per bowler in a standard ODI match?",
    options: [
      "A) 4",
      "B) 6",
      "C) 8",
      "D) 10"
    ],
    correctOption: "d",
    answerText: "10 overs",
    hint: "50 overs divided equally among 5 bowlers.",
    timeLimit: 15
  },
  {
    question: "Which country won the first ICC Cricket World Cup in 1975?",
    options: [
      "A) India",
      "B) Australia",
      "C) West Indies",
      "D) England"
    ],
    correctOption: "c",
    answerText: "West Indies",
    hint: "This team was dominant in the 1970s and early 1980s.",
    timeLimit: 15
  },
  {
    question: "What is it called when a bowler takes three wickets in three consecutive balls?",
    options: [
      "A) Triple strike",
      "B) Hat-trick",
      "C) Three-for",
      "D) Maiden"
    ],
    correctOption: "b",
    answerText: "Hat-trick",
    hint: "The term is also used in football for three goals.",
    timeLimit: 15
  },
  {
    question: "How many runs are scored if the ball hits the boundary rope after touching the ground?",
    options: [
      "A) 2",
      "B) 3",
      "C) 4",
      "D) 6"
    ],
    correctOption: "c",
    answerText: "4 runs",
    hint: "It is not a six because the ball bounced.",
    timeLimit: 15
  },
  {
    question: "Who was the captain when India won the ICC Cricket World Cup in 2011?",
    options: [
      "A) Sourav Ganguly",
      "B) Virat Kohli",
      "C) MS Dhoni",
      "D) Rahul Dravid"
    ],
    correctOption: "c",
    answerText: "MS Dhoni",
    hint: "He is famous for his calm captaincy and finishing skills.",
    timeLimit: 15
  },
  {question: "What is the term for a batsman getting out without scoring any runs?",
    options: [
      "A) Duck",
      "B) Zero out",
      "C) Blank",
      "D) Clean out"
    ],
    correctOption: "a",
    answerText: "Duck",
    hint: "The word is also the name of a bird.",
    timeLimit: 15
  },
  {question: "Which format of cricket is typically played for five days?",
    options: [
      "A) T20",
      "B) ODI",
      "C) Test match",
      "D) The Hundred"
    ],
    correctOption: "c",
    answerText: "Test match",
    hint: "It is considered the longest and oldest format.",
    timeLimit: 15
  },
  {question: "What is the rectangular area in the center of the ground where batting and bowling take place?",
    options: [
      "A) Crease",
      "B) Pitch",
      "C) Wicket",
      "D) Circle"
    ],
    correctOption: "b",
    answerText: "Pitch",
    hint: "It is 22 yards long.",
    timeLimit: 15
  }
];

// Helper: get high score from localStorage
function getHighScore() {
  const stored = localStorage.getItem("quizHighScore");
  return stored ? JSON.parse(stored) : { score: 0, total: 0 };
}

// Helper: save high score to localStorage
function saveHighScore(score, totalQuestions) {
  const currentHigh = getHighScore();
  if (score > currentHigh.score) {
    localStorage.setItem(
      "quizHighScore",
      JSON.stringify({ score: score, total: totalQuestions })
    );
    return true; // new high score
  }
  return false;
}

// Helper: build question text with options and timer info
function buildQuestionText(qObj, index) {
  const optionsText = qObj.options.join("\n");
  return (
    `Question ${index + 1} (Time: ${qObj.timeLimit} seconds)\n` +
    `${qObj.question}\n\n` +
    `${optionsText}\n\n` +
    "Type the option letter (a, b, c or d):"
  );
}

// 2. Function to run the quiz
function runQuiz() {
  let score = 0;

  alert("Welcome to the JavaScript Quiz!\nYou will see multiple-choice questions with a time limit.\nGood luck!");

  // 4. Loop through questions
  for (let i = 0; i < quizQuestions.length; i++) {
    const currentQuestion = quizQuestions[i];

    const startTime = Date.now();
    let userAnswer = prompt(buildQuestionText(currentQuestion, i));

    // If user presses Cancel
    if (userAnswer === null) {
      alert("Quiz cancelled.");
      return;
    }

    const endTime = Date.now();
    const timeTakenSeconds = (endTime - startTime) / 1000;

    userAnswer = userAnswer.toLowerCase().trim();

    let isCorrect = false;
    let timeUp = timeTakenSeconds > currentQuestion.timeLimit;

    if (!timeUp && userAnswer === currentQuestion.correctOption) {
      isCorrect = true;
      score++;
    }

    // 8. Customized feedback messages
    if (timeUp) {
      alert(
        `Time's up! ⏰ You took ${timeTakenSeconds.toFixed(
          1
        )} seconds.\nCorrect answer: ${currentQuestion.answerText}\nHint: ${currentQuestion.hint}`
      );
    } else if (isCorrect) {
      alert(
        `Correct! 🎉\nYou answered in ${timeTakenSeconds.toFixed(1)} seconds.`
      );
    } else {
      alert(
        `Incorrect. 😢\nCorrect answer: ${currentQuestion.answerText}\nHint: ${currentQuestion.hint}`
      );
    }
  }

  // 9. Display the final score + score-based messages
  const totalQuestions = quizQuestions.length;
  const percentage = (score / totalQuestions) * 100;
  let message;

  if (percentage === 100) {
    message = "Outstanding! 🌟 You got a perfect score!";
  } else if (percentage >= 80) {
    message = "Great job! 👍 You know your basics well.";
  } else if (percentage >= 50) {
    message = "Good try! 🙂 Keep practicing to improve.";
  } else {
    message = "Keep learning! 💪 Review the concepts and try again.";
  }

  const isNewHighScore = saveHighScore(score, totalQuestions);
  const highScore = getHighScore();

  let highScoreMessage = `High score: ${highScore.score} / ${highScore.total}`;
  if (isNewHighScore) {
    highScoreMessage += "\nNew high score! 🏆";
  }

  alert(
    `Quiz finished!\nYour score: ${score} out of ${totalQuestions}\nPercentage: ${percentage.toFixed(
      1
    )}%\n\n${message}\n\n${highScoreMessage}`
  );

  // 6. Restart option
  const restartChoice = prompt(
    "Do you want to play again? (yes/no)"
  );

  if (restartChoice && restartChoice.toLowerCase().trim() === "yes") {
    runQuiz();
  } else {
    alert("Thanks for playing the quiz! 👋");
  }
}

// To start the quiz in the console:
runQuiz();

function Result({ score, total, onRestart }) {
  const percentage = Math.round((score / total) * 100);

  let emoji;
  let title;
  let message;

  if (percentage >= 80) {
    emoji = "🏆";
    title = "Excellent!";
    message = "Amazing work! You really know your stuff.";
  } else if (percentage >= 60) {
    emoji = "🎉";
    title = "Good Job!";
    message = "Well done! Keep improving your score.";
  } else if (percentage >= 40) {
    emoji = "🙂";
    title = "Keep Practicing!";
    message = "You're getting there. Practice a little more.";
  } else {
    emoji = "😢";
    title = "Quiz Failed";
    message = "Don't give up! Study more and try again.";
  }

  const passed = percentage >= 40;

  return (
    <div className="result-card">

      <div className="result-icon">
        {emoji}
      </div>

      <h1>{title}</h1>

      <p className="result-message">
        {message}
      </p>

      <div className="score-circle">
        <strong>{score}</strong>
        <span>/ {total}</span>
      </div>

      <h2>{percentage}%</h2>

      <div className={`result-status ${passed ? "passed" : "failed"}`}>
        {passed ? "PASS ✅" : "FAIL ❌"}
      </div>

      <button
        className="start-btn"
        onClick={onRestart}
      >
        Try Again 🔄
      </button>

    </div>
  );
}

export default Result;
// function Result({
//   score,
//   total,
//   onRestart
// }) {

//   const percentage = Math.round(
//     (score / total) * 100
//   );

//   return (
//     <div className="result-card">

//       <div className="result-icon">
//         🏆
//       </div>

//       <h1>Quiz Completed!</h1>

//       <p className="result-message">
//         Great job! Here is your result.
//       </p>

//       <div className="score-circle">
//         <strong>{score}</strong>
//         <span>/ {total}</span>
//       </div>

//       <h2>{percentage}%</h2>

//       <button
//         className="start-btn"
//         onClick={onRestart}
//       >
//         Try Again
//       </button>

//     </div>
//   );
// }

// export default Result;
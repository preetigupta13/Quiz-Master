function Question({
  question,
  selectedAnswer,
  onSelectAnswer,
}) {
  return (
    <div className="question-card">

      <h2>
        {question.question}
      </h2>

      <div className="options">

        {question.options.map((option, index) => {

          const letters = ["A", "B", "C", "D"];

          return (
            <button
              key={option}
              className={`option ${
                selectedAnswer === option
                  ? "selected"
                  : ""
              }`}
              onClick={() => onSelectAnswer(option)}
            >

              <span className="option-letter">
                {letters[index]}
              </span>

              <span>{option}</span>

            </button>
          );
        })}

      </div>

    </div>
  );
}

export default Question;

// function Question({
//   question,
//   selectedAnswer,
//   onSelectAnswer
// }) {
//   return (
//     <div className="question-container">

//       <h2>
//         {question.question}
//       </h2>

//       <div className="options">

//         {question.options.map((option, index) => (
//           <button
//             key={option}
//             className={`option ${
//               selectedAnswer === option
//                 ? "selected"
//                 : ""
//             }`}
//             onClick={() => onSelectAnswer(option)}
//           >
//             <span className="option-number">
//               {String.fromCharCode(65 + index)}
//             </span>

//             <span>{option}</span>
//           </button>
//         ))}

//       </div>

//     </div>
//   );
// }

// export default Question;
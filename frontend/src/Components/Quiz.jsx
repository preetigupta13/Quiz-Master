import { useEffect, useState } from "react";

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [status, setStatus] = useState("Loading...");

  useEffect(() => {
    console.log("Fetching questions...");

    fetch("https://quiz-master-backend-atve.onrender.com/quiz/questions")
      .then((response) => {
        console.log("Response received:", response.status);

        if (!response.ok) {
          throw new Error("API request failed");
        }

        return response.json();
      })
      .then((data) => {
        console.log("Questions received:", data);

        setQuestions(data);
        setStatus("SUCCESS");
      })
      .catch((error) => {
        console.error("FETCH ERROR:", error);
        setStatus("ERROR: " + error.message);
      });
  }, []);

  return (
    <div style={{ padding: "40px" }}>
      <h1>Quiz API Test</h1>

      <h2>{status}</h2>

      {questions.map((question) => (
        <div
          key={question.id}
          style={{
            marginTop: "20px",
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "10px",
          }}
        >
          <h3>
            {question.id}. {question.question}
          </h3>

          {question.options.map((option) => (
            <p key={option}>• {option}</p>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Quiz;

// ====================================================


// import { useEffect, useState } from "react";
// import Question from "./Question";
// import Timer from "./Timer";
// import Result from "./Result";

// function Quiz() {
//   const [questions, setQuestions] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [currentQuestion, setCurrentQuestion] = useState(0);

//   const [selectedAnswer, setSelectedAnswer] = useState("");

//   const [answers, setAnswers] = useState([]);

//   const [score, setScore] = useState(null);

//   const [timeLeft, setTimeLeft] = useState(10 * 60);

//   // =========================
//   // GET QUESTIONS
//   // =========================

//   useEffect(() => {
//     fetch("http://127.0.0.1:8000/quiz/questions")
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Failed to fetch questions");
//         }

//         return response.json();
//       })
//       .then((data) => {
//         setQuestions(data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching questions:", error);
//         setLoading(false);
//       });
//   }, []);

//   // =========================
//   // TIMER
//   // =========================

//   useEffect(() => {
//     if (loading || score !== null) {
//       return;
//     }

//     if (timeLeft <= 0) {
//       submitQuiz();
//       return;
//     }

//     const timer = setInterval(() => {
//       setTimeLeft((previous) => previous - 1);
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [timeLeft, loading, score]);

//   // =========================
//   // SELECT ANSWER
//   // =========================

//   const handleSelectAnswer = (answer) => {
//     setSelectedAnswer(answer);

//     const questionId = questions[currentQuestion].id;

//     setAnswers((previousAnswers) => {
//       const alreadyAnswered = previousAnswers.find(
//         (item) => item.question_id === questionId
//       );

//       if (alreadyAnswered) {
//         return previousAnswers.map((item) =>
//           item.question_id === questionId
//             ? {
//                 ...item,
//                 answer: answer,
//               }
//             : item
//         );
//       }

//       return [
//         ...previousAnswers,
//         {
//           question_id: questionId,
//           answer: answer,
//         },
//       ];
//     });
//   };

//   // =========================
//   // NEXT QUESTION
//   // =========================

//   const nextQuestion = () => {
//     if (!selectedAnswer) {
//       alert("Please select an answer first.");
//       return;
//     }

//     if (currentQuestion < questions.length - 1) {
//       const nextQuestionIndex = currentQuestion + 1;

//       setCurrentQuestion(nextQuestionIndex);

//       const nextQuestionId = questions[nextQuestionIndex].id;

//       const previousAnswer = answers.find(
//         (item) => item.question_id === nextQuestionId
//       );

//       setSelectedAnswer(
//         previousAnswer ? previousAnswer.answer : ""
//       );
//     } else {
//       submitQuiz();
//     }
//   };

//   // =========================
//   // PREVIOUS QUESTION
//   // =========================

//   const previousQuestion = () => {
//     if (currentQuestion === 0) {
//       return;
//     }

//     const previousQuestionIndex = currentQuestion - 1;

//     setCurrentQuestion(previousQuestionIndex);

//     const previousQuestionId =
//       questions[previousQuestionIndex].id;

//     const previousAnswer = answers.find(
//       (item) => item.question_id === previousQuestionId
//     );

//     setSelectedAnswer(
//       previousAnswer ? previousAnswer.answer : ""
//     );
//   };

//   // =========================
//   // SUBMIT QUIZ
//   // =========================

//   const submitQuiz = async () => {
//     try {
//       const response = await fetch(
//         "http://127.0.0.1:8000/quiz/submit",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(answers),
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to submit quiz");
//       }

//       const data = await response.json();

//       setScore(data.score);
//     } catch (error) {
//       console.error("Submit error:", error);
//       alert("Unable to submit quiz.");
//     }
//   };

//   // =========================
//   // RESTART QUIZ
//   // =========================

//   const restartQuiz = () => {
//     setCurrentQuestion(0);
//     setSelectedAnswer("");
//     setAnswers([]);
//     setScore(null);
//     setTimeLeft(10 * 60);
//   };

//   // =========================
//   // LOADING
//   // =========================

//   if (loading) {
//     return (
//       <div className="loading">
//         Loading Quiz...
//       </div>
//     );
//   }

//   // =========================
//   // NO QUESTIONS
//   // =========================

//   if (questions.length === 0) {
//     return (
//       <div className="loading">
//         <h2>No questions found.</h2>
//       </div>
//     );
//   }

//   // =========================
//   // RESULT
//   // =========================

//   if (score !== null) {
//     return (
//       <Result
//         score={score}
//         total={questions.length}
//         onRestart={restartQuiz}
//       />
//     );
//   }

//   // =========================
//   // CURRENT QUESTION
//   // =========================

//   const question = questions[currentQuestion];

//   const progress =
//     ((currentQuestion + 1) / questions.length) * 100;

//   return (
//     <div className="quiz-container">

//       {/* HEADER */}

//       <div className="quiz-header">

//         <div className="question-number">
//           Question {currentQuestion + 1} of{" "}
//           {questions.length}
//         </div>

//         <Timer timeLeft={timeLeft} />

//       </div>

//       {/* PROGRESS BAR */}

//       <div className="progress-bar">

//         <div
//           className="progress"
//           style={{
//             width: `${progress}%`,
//           }}
//         />

//       </div>

//       {/* QUESTION */}

//       <Question
//         question={question}
//         selectedAnswer={selectedAnswer}
//         onSelectAnswer={handleSelectAnswer}
//       />

//       {/* BUTTONS */}

//       <div className="quiz-buttons">

//         {/* PREVIOUS */}

//         <button
//           className="previous-btn"
//           onClick={previousQuestion}
//           disabled={currentQuestion === 0}
//         >
//           ← Previous
//         </button>

//         {/* NEXT / SUBMIT */}

//         <button
//           className="next-btn"
//           onClick={nextQuestion}
//         >
//           {currentQuestion === questions.length - 1
//             ? "Submit Quiz"
//             : "Next →"}
//         </button>

//       </div>

//     </div>
//   );
// }

// export default Quiz;


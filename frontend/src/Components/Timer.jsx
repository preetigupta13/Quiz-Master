function Timer({ timeLeft }) {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="timer">
      ⏱️ {String(minutes).padStart(2, "0")}:
      {String(seconds).padStart(2, "0")}
    </div>
  );
}

export default Timer;

// function Timer({ timeLeft }) {
//   const minutes = Math.floor(timeLeft / 60);
//   const seconds = timeLeft % 60;

//   return (
//     <div className="timer">
//       ⏱️ {String(minutes).padStart(2, "0")}:
//       {String(seconds).padStart(2, "0")}
//     </div>
//   );
// }

// export default Timer;



// import { useEffect } from "react";

// function Timer({
//   timeLeft,
//   onTimeUp
// }) {

//   useEffect(() => {

//     if (timeLeft <= 0) {
//       onTimeUp();
//       return;
//     }

//     const timer = setInterval(() => {
//       // Timer is controlled by parent component
//     }, 1000);

//     return () => clearInterval(timer);

//   }, [timeLeft, onTimeUp]);


//   const minutes = Math.floor(timeLeft / 60);
//   const seconds = timeLeft % 60;

//   return (
//     <div className="timer">
//       ⏱️ {String(minutes).padStart(2, "0")}:
//       {String(seconds).padStart(2, "0")}
//     </div>
//   );
// }

// export default Timer;
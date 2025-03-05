import React, { useEffect, useState } from "react";
import axios from "axios";

const QuizApp = () => {
  const [quizdata, setQuizData] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState();
  const [score, setScore] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get("http://localhost:3000/quiz-data");
        setQuizData(data.quizQuestions);
      } catch (e) {
        console.error("Error fetching quiz data:", e);
      }
    }

    fetchData();
  }, []);

  const handleNext = () => {
    if (currentQuestion < quizdata.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
    }

    setScore((prevScore) => {
      const newScore =
        prevScore +
        (selectedOption === quizdata[currentQuestion].answer
          ? prevScore + 1
          : prevScore);
      return newScore;
    });
  };

  if (!quizdata || quizdata.length === 0) {
    return <div className="text-center mt-10 text-lg">Loading...</div>;
  }

  return (
    <>
      <div className="flex items-center justify-center w-100 ">
        <div className="bg-blue-50 shadow-lg rounded-2xl p-6 max-w-md w-full">
          <h2 className="text-xl font-semibold mb-4">
            {quizdata[currentQuestion].question}
          </h2>
          <ul>
            {quizdata[currentQuestion].options.map((option, index) => (
              <li
                key={index}
                className={`p-2 mb-2 border rounded-lg cursor-pointer transition-all hover:bg-blue-100 ${
                  selectedOption === option ? "bg-blue-300" : ""
                }`}
                onClick={() => setSelectedOption(option)}
              >
                {option}
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="w-full bg-blue-700  text-black rounded-lg my-2 py-3 "
            onClick={() => handleNext()}
            disabled={
              selectedOption === null || currentQuestion === quizdata.length - 1
            }
          >
            {currentQuestion === quizdata.length - 1
              ? "Finish"
              : "Next Question"}
          </button>
          <div className="w-full bg-red-700 text-white rounded-lg my-2 py-3">
            {score}
          </div>
        </div>
      </div>
    </>
  );
};

export default QuizApp;

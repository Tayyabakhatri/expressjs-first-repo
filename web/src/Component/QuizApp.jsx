import React, { useState } from "react";
import { Card, CardContent } from "/components/ui/card";
import { Button } from "/components/ui/button";
import { Progress } from "/components/ui/progress";
import { motion } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";

 function QuizApp() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [quizData, setQuizData] = useState([]);

  React.useEffect(() => {
    fetch("/api/quiz-data")
      .then((response) => response.json())
      .then((data) => setQuizData(data))
      .catch((error) => console.error("Error fetching quiz data:", error));
  }, []);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    if (option === quizData[currentQuestion].answer) {
      setScore(score + 1);
    }
    setTimeout(() => {
      if (currentQuestion + 1 < quizData.length) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black text-gold-400 p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-lg"
      >
        <Card className="bg-gray-800 shadow-xl border border-gold-400 rounded-2xl p-6">
          <CardContent className="text-center">
            {showResult ? (
              <div>
                <h2 className="text-2xl font-bold">Quiz Completed!</h2>
                <p className="text-lg mt-2">Your Score: {score} / {quizData.length}</p>
                <Button onClick={() => window.location.reload()} className="mt-4 bg-gold-500 hover:bg-gold-600 text-black font-bold">
                  Restart Quiz
                </Button>
              </div>
            ) : quizData.length > 0 ? (
              <div>
                <h2 className="text-xl font-semibold mb-4">{quizData[currentQuestion].question}</h2>
                <Progress value={((currentQuestion + 1) / quizData.length) * 100} className="mb-4 bg-gray-700" />
                <div className="grid gap-3">
                  {quizData[currentQuestion].options.map((option, index) => (
                    <motion.button
                      key={index}
                      onClick={() => handleOptionClick(option)}
                      whileTap={{ scale: 0.95 }}
                      className={`p-3 w-full rounded-lg text-lg font-medium transition-all
                        ${selectedOption === option ? (option === quizData[currentQuestion].answer ? "bg-green-500 text-black" : "bg-red-500 text-black") : "bg-gray-700 hover:bg-gray-600 text-white"}`}
                    >
                      {option}
                    </motion.button>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-lg font-semibold">Loading quiz...</p>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
export default QuizApp


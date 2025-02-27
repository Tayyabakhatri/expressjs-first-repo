import React, {  useEffect, useState } from "react";
import axios from "axios";

const QuizApp = () => {
  const [quizdata, setQuizData] = useState([]);
  async function fetchData() {
    try {
      const data = await axios.get("http://localhost:3000/quiz-data");
      setQuizData(data.data.quizQuestions);
      console.log(quizdata);
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);
  console.log(quizdata);
  // If quizData is undefined or empty, show a loading message
  if (!quizdata || quizdata.length === 0) {
    return <div>Loading...</div>;
  }
  return (
    <>
      {quizdata.map((item, index) => (
        <div key={index} >
          <div>{item.question}</div>
          
            <ul key={index}>
              <li>{item.options}</li>
            
            </ul>
          
          {/* <div>
      <ul>
        {item.options.map((option, optionIndex) => (
          <li key={optionIndex}>{option}</li>
        ))}
      </ul>
    </div> */}
        </div>
      ))}
    </>
  );
};

export default QuizApp;

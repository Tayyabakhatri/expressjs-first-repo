import React, { use, useEffect, useState } from "react";
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
  return (
    <>
      {quizdata.map(( {question,options},index) => (
        <div key={index}>
          <div>{question}</div>
          <div>{options}</div>
          {/* <div>
            <ul>
              {options.map((options,index) => (
               <li key={index}>
                {options}
               </li>
              ))}
            </ul>
          </div> */}
        </div>
      ))}
    </>
  );
};

export default QuizApp;

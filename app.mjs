import express from 'express'
import path from "path"
import fs from "fs";
import quiz from "./data.json" assert { type: "json" };

console.log(quiz);
const app = express()
const port = process.env.PORT|| 3000
const quizData = "./data.json"


const __dirname = path.resolve()
app.use('/',express.static(path.join(__dirname,'./web/dist')))



app.get('/quiz-data', (req, res) => {
  res.send(quizData)
  // console.log(req.ip);
  try{
const data = fs.readFileSync(quizData)
res.json(JSON.parse(data))
res.send(data)
  }
catch(error){
res.status(500).json({error: "Failed to load data" })
}
  
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

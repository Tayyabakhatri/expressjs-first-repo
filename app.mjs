import express from 'express'
import path from "path"
const app = express()
const port = process.env.PORT|| 3000
const quizData = "./data.json"


const __dirname = path.resolve()
app.use('/',express.static(path.join(__dirname,'./web/dist')))



app.get('/quiz-data', (req, res) => {
  // res.send('Hello World!')
  // console.log(req.ip);
  try{
const data = fs.readFileSync(quizData)
res.json(JSON.parse(data))
  }
catch(error){
res.status(500).json({error: "Failed to load data" })
}
  
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

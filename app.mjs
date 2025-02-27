import express from 'express'
import path from "path"
import fs from "fs";
import cors from 'cors'

const app = express()
const port = process.env.PORT || 3000

//read data
const data = JSON.parse(fs.readFileSync("./data.json", "utf8"));
console.log(data);


app.use(cors())

// Serve frontend (if applicable)
const __dirname = path.resolve()
app.use('/', express.static(path.join(__dirname, './web/dist')))



app.get('/quiz-data', (req, res) => {

  try {
    // send preloaded JSON data
    res.send(data)
    console.log(data);
  }
  catch (error) {
    res.status(500).json({ error: "Failed to load data" })
  }
})
app.post('/quiz-data', (req, res) => {
  res.send('hello')

})
  
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})




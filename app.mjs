import express from 'express'
import path from "path"
const app = express()
const port = process.env.PORT|| 3000


const __dirname = path.resolve()
app.use('/',express.static(path.join(__dirname,'./web/dist')))



app.get('/', (req, res) => {
  res.send('Hello World!')
  // console.log(req.ip);
  
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

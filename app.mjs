import express from 'express'
import path from "path"
const app = express()
<<<<<<< HEAD
const port = process.env.PORT|| 3000


const __dirname = path.resolve()
app.use('/',express.static(path.join(__dirname,'./web/dist')))

=======
const port = process.env.PORT||5000
>>>>>>> 156b8c7c592b9551f29c80458ba67af11261efd9

app.get('/', (req, res) => {
  res.send('Hello World!')
  // console.log(req.ip);
  
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

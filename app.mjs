const express = require('express')
const app = express()
const port = process.evn.PORT||3000

app.get('/', (req, res) => {
  res.send('Hello World!')
  console.log(req.ip);
  
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

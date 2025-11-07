const express = require('express')
const app = express()
const port = 3000

const html = "./public/index.html"

app.use(express.static('public'))

app.listen(port, () => {
  console.log(`Servidor actiu a http://localhost:${port}`)
})

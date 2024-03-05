const express = require('express')
const app = express()
const port = 3000
const routes = require('./routes')

app.use(express.json())
// mapping the routes under "api" because i find it better organization
app.use('/api', routes)

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})



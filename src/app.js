const express = require('express')
const app = express()
const userRoutes = require('./routers/user')
const taskRoutes = require('./routers/task')
require('./db/mongoose')
  
app.use(express.json())
app.use(userRoutes)
app.use(taskRoutes)


const port = process.env.port || 3000
app.listen(port, () => {
    console.log(`listening port ${port}`)
})


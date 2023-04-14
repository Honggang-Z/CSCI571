const express = require('express')
const cors = require('cors')
const app = express()

const newsRoutes = require('./api/routes/NYTimes')
const guardianRoutes = require('./api/routes/GuardianNews')
const searchRoutes = require('./api/routes/search')
const guardianDetail = require('./api/routes/GuardianDetail')

// use cors to prevent cors problem since backend is using port 3030 and 
// frontend is using port 3000
app.use(cors())
app.use('/nytimes', newsRoutes)
app.use('/guardian', guardianRoutes)
app.use('/search', searchRoutes)
app.use('/guardetail', guardianDetail)

module.exports = app;
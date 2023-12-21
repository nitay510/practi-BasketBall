require('dotenv').config({ path: './config/.env.local' })
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const cors = require('cors')
const customEnv = require('custom-env')
const mongoose = require('mongoose')
app.use(cors())

const http = require('http')
const server = http.createServer(app)


// Middleware
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))
app.use(express.json())
app.use(bodyParser.json({ limit: '10mb' }))
// Import routes
const userRoutes = require('./routes/user')
const drillRoutes = require('./routes/drills')
const videosRoutes = require('./routes/videos')
const subVideosRoutes = require('./routes/subVideos')
app.use(express.static(path.join(__dirname, 'public')))
customEnv.env(process.env.NODE_ENV, './config')
console.log(process.env.CONNECTION_STRING)
mongoose.connect(process.env.CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
   tls: true
})

// Routes
app.use('/api', userRoutes)
app.use('/api', subVideosRoutes)
app.use('/api', videosRoutes)
app.use('/api', drillRoutes)

// Serve static files from the "build" folder
app.use(express.static(path.join(__dirname, 'build')))

// Match all routes and serve the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})
// Serve static files from the "build" folder
app.use(express.static(path.join(__dirname, 'build')))

// Match all routes and serve the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})
// Start the server
const PORT = process.env.port
server.listen(PORT, () => {})

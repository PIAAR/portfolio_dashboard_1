require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const { logger } = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const PORT = process.env.PORT || 3500

// Log message to console
console.log(process.env.NODE_ENV)

// Logger first
app.use(logger)

// Useful for routing from browser
app.use(cors(corsOptions))

app.use(express.json())

//  Cookie parser
app.use(cookieParser())

//  Static pages  in public
app.use('/', express.static(path.join(__dirname, 'public')))

//  Root app
app.use('/', require('./routes/root'))

// 404 section
app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({ message: '404 Not Found'})
    } else {
        res.type('txt').send('404 Not Found')
    }
})

app.use(errorHandler)

// Log message to console
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

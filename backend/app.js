const express = require('express')
const app = express()

const dotenv = require('dotenv').config()
if (dotenv.error) {
  console.error("Failed to load .env file")
  throw dotenv.error
}

const routes = require('./routes')

const PORT = process.env.PORT


app.use('/', routes)

// Application will fail if environment variables are not set
if (!process.env.PORT) {
  const errMsg = "PORT environment variable is not defined"
  console.error(errMsg)
  throw new Error(errMsg)
}

if (!process.env.GUESTBOOK_DB_ADDR) {
  const errMsg = "GUESTBOOK_DB_ADDR environment variable is not defined"
  console.error(errMsg)
  throw new Error(errMsg)
}



// Starts an http server on the $PORT environment variable
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});

module.exports = app
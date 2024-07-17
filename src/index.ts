import dotenv from 'dotenv'
dotenv.config()

import express from 'express'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const port = process.env.PORTA ?? 3001
app.listen(port, () => {
    console.log(`Server is running in port ${port}`)
})
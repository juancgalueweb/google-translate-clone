import cors from 'cors'
import express, { type Express } from 'express'
import translationRoute from './routes/translateRoute'

// Using dotenv
import 'dotenv/config'

const app: Express = express()

const PORT: string | number = process.env.PORT ?? 8000

app.use(cors({ credentials: true, origin: 'http://localhost:5173' }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(translationRoute)

app.listen(PORT, () => {
  console.log(`CORS-enabled web server listening on port ${PORT}`)
})

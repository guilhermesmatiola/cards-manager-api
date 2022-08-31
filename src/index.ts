import express, { json } from 'express'
import cors from 'cors'
//import

const app = express()
app.use(cors())
app.use(json());


const PORT: number = 5000

app.listen(5000, ()=> console.log(`subiu na porta ${PORT}`))
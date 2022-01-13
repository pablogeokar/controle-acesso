import 'reflect-metadata'
import express from 'express'
import helmet from 'helmet'
import cors from 'cors'

import './database'
import router from './routes'

const app = express();
app.use(cors())
app.use(helmet())
app.use(express.json())
app.use(router)

app.listen(3030, () => console.log('Server is running...'))
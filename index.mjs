import express from 'express'
import {routerLogin} from './routes/login.route.mjs'
import bodyParser from 'body-parser'
import authToken from './middlewares/auth.mjs'
import swaggerUi from 'swagger-ui-express'
import cors from 'cors'
import {config} from 'dotenv'
import morgan from 'morgan'
import file from 'fs'
import {routerTour} from "./routes/tour.route.mjs";

const app = express()

config()
const port = process.env.PORT

// Body parser
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(bodyParser.json({type: 'application/*+json'}))

app.use(morgan('dev'))
app.use(cors());

// Swagger
const swagger = JSON.parse(file.readFileSync('./swagger/swagger_output.json', 'utf8'))
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swagger, {swaggerOptions: {persistAuthorization: true}}))

app.use(authToken)

// Routers
app.use(routerLogin)
app.use(routerTour);

app.listen(port, () => {
    console.log(`Server listen on port ${port}...`)
});

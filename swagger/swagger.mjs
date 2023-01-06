import swaggerAutogen from 'swagger-autogen'
import models from './models.mjs'

const doc = {
    info: {
        version: "1.0.0", title: "Swish API", description: "Documentation for Swish API."
    },
    host: "swish.herokuapp.com",
    basePath: "/",
    schemes: ['https'],
    produces: ['application/json'],
    definitions: {
        ...models
    },
    securityDefinitions: {
        Bearer: {
            type: "apiKey",
            in: "header",
            name: "Authorization",
            description: "Rentrez un token valide dans le format **Bearer &lt;token>**",
        },
    }
}

const autogen = swaggerAutogen()
const outputFile = './swagger/swagger_output.json'
const endpointsFiles = [
    './routes/login.route.mjs',
    './routes/tour.route.mjs'
]

autogen(outputFile, endpointsFiles, doc)

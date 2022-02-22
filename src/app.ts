import express from 'express'
import bodyParser from 'body-parser'
import swaggerUI from "swagger-ui-express"
import swaggerJSDoc from "swagger-jsdoc"
import router from './routes/todo.routes'

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "REST TODO CRUD",
            version: "1.0.0",
            description: "A simple Express Library API",
        },
        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
    },
    apis: ["**/*.ts"]
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
const PORT = process.env.PORT || 3000;
const app = express()


app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.json())
app.use('/',(req, res)=>{
    res.send('main page')
})
app.use('/v1', router)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
import express from 'express'
import bodyParser from 'body-parser';
import {productsRoute} from './routes/products-route';
import {adressesRouter} from './routes/adresses-route';
import {runDb} from './repositories/db';

const app = express()

const port = process.env.PORT || 5000

const parserMiddleware = bodyParser.json()

app.use(parserMiddleware)
app.use('/products', productsRoute)
app.use('/adresses', adressesRouter)

const startApp = async () => {
    await runDb()
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}

startApp()
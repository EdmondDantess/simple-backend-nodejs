import express, {Request, Response} from 'express'
import bodyParser from 'body-parser';


const app = express()

const port = process.env.PORT || 5000

const products = [{id: 1, title: 'tomato'}, {id: 2, title: 'orange'}]
const adresses = [{id: 1, value: 'Skorini'}, {id: 2, value: 'Dom 1'}]

const parserMiddleware = bodyParser({})
app.use(parserMiddleware)

app.get('/products', (req: Request, res: Response) => {
    if (req.query.title) {
        let searchString = req.query.title.toString()
        res.send(products.filter(p => p.title.indexOf(searchString) > -1))
    } else {
        res.send(products)
    }
})
app.post('/products', (req: Request, res: Response) => {
    const newProduct = {
        id: products.length + 1,
        title: req.body.title
    }
    products.push(newProduct)
    res.status(201).send(newProduct)
})
app.get('/products/:id', (req: Request, res: Response) => {
    let product = products.find(p => p.id === +req.params.id)
    if (product) {
        res.send(product)
    } else {
        res.send(404)
    }
})
app.put('/products/:id', (req: Request, res: Response) => {
    let product = products.find(p => p.id === +req.params.id)
    if (product) {
        product.title = req.body.title
        res.status(202).send(product)
    } else {
        res.send(404)
    }
})
app.delete('/products/:id', (req: Request, res: Response) => {
    for (let i = 0; i < products.length; i++) {
        if (products[i].id === +req.params.id) {
            products.splice(i, 1)
            res.send(204)
            return
        }
    }
    res.send(404)
})
app.get('/adresses', (req: Request, res: Response) => {
    res.send(adresses)
})
app.get('/adresses/:id', (req: Request, res: Response) => {
    let adress = adresses.find(p => p.id === +req.params.id)
    if (adress) {
        res.send(adress)
    } else {
        res.send(404)
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
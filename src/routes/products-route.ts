import {Request, Response, Router} from 'express';

const products = [{id: 1, title: 'tomato'}, {id: 2, title: 'orange'}]

export const productsRoute = Router({})

productsRoute.get('/', (req: Request, res: Response) => {
    if (req.query.title) {
        let searchString = req.query.title.toString()
        res.send(products.filter(p => p.title.indexOf(searchString) > -1))
    } else {
        res.send(products)
    }
})
productsRoute.post('/', (req: Request, res: Response) => {
    const newProduct = {
        id: products.length + 1,
        title: req.body.title
    }
    products.push(newProduct)
    res.status(201).send(newProduct)
})
productsRoute.get('/:id', (req: Request, res: Response) => {
    let product = products.find(p => p.id === +req.params.id)
    if (product) {
        res.send(product)
    } else {
        res.send(404)
    }
})
productsRoute.put('/:id', (req: Request, res: Response) => {
    let product = products.find(p => p.id === +req.params.id)
    if (product) {
        product.title = req.body.title
        res.status(202).send(product)
    } else {
        res.send(404)
    }
})
productsRoute.delete('/:id', (req: Request, res: Response) => {
    for (let i = 0; i < products.length; i++) {
        if (products[i].id === +req.params.id) {
            products.splice(i, 1)
            res.send(204)
            return
        }
    }
    res.send(404)
})

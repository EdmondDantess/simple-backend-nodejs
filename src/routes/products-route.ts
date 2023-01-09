import {Request, Response, Router} from 'express';
import {productsRepository} from '../repositories/products-db-repository';
import {body} from 'express-validator';
import {inputValidationMiddleware} from '../middlewares/input-validation-middleware';

export const productsRoute = Router({})

const titleValidation = body('title').trim().isLength({
    min: 1,
    max: 15
}).withMessage('title should be min 1 max 15 symbols')

productsRoute.get('/', async (req: Request, res: Response) => {
    const foundProducts = await productsRepository.findProducts(req.query.title?.toString() && null)
    res.send(foundProducts)
})
productsRoute.post('/', titleValidation, inputValidationMiddleware,
    async (req: Request, res: Response) => {
        const newProduct = await productsRepository.createProduct(req.body.title)
        res.status(201).send(newProduct)
    })
productsRoute.put('/:id', titleValidation, inputValidationMiddleware,
    async (req: Request, res: Response) => {
        const isUpdated = await productsRepository.updateProduct(+req.params.id, req.body.title)
        if (isUpdated) {
            const product = await productsRepository.findProductById(+req.params.id)
            res.send(product)
        } else {
            res.send(404)
        }
    })
productsRoute.get('/:id', async (req: Request, res: Response) => {
    let product = await productsRepository.findProductById(+req.params.id)
    if (product) {
        res.send(product)
    } else {
        res.send(404)
    }
})
productsRoute.delete('/:id', async (req: Request, res: Response) => {
    const isDeleted = await productsRepository.deleteProduct(+req.params.id)
    if (isDeleted) {
        res.send(204)
    } else {
        res.send(404)
    }
})
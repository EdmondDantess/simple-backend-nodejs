import {Request, Response, Router} from 'express';
import {productsRepository} from '../repositories/products-repository';
import {body} from 'express-validator';
import {inputValidationMiddleware} from '../middlewares/input-validation-middleware';


export const productsRoute = Router({})

const titleValidation = body('title').trim().isLength({
    min: 1,
    max: 15
}).withMessage('title should be min 1 max 15 symbols')

productsRoute.get('/', (req: Request, res: Response) => {
    const foundProducts = productsRepository.findProducts(req.query.title?.toString() && null)
    res.send(foundProducts)
})
productsRoute.post('/', titleValidation, inputValidationMiddleware,
    (req: Request, res: Response) => {
        const newProduct = productsRepository.createProduct(req.body.title)
        res.status(201).send(newProduct)
    })
productsRoute.put('/:id', titleValidation, inputValidationMiddleware,
    (req: Request, res: Response) => {
        const isUpdated = productsRepository.updateProduct(+req.params.id, req.body.title)
        if (isUpdated) {
            const product = productsRepository.findProductById(+req.params.id)
            res.send(product)
        } else {
            res.send(404)
        }
    })
productsRoute.get('/:id', (req: Request, res: Response) => {
    let product = productsRepository.findProductById(+req.params.id)
    if (product) {
        res.send(product)
    } else {
        res.send(404)
    }
})
productsRoute.delete('/:id', (req: Request, res: Response) => {
    const isDeleted = productsRepository.deleteProduct(+req.params.id)
    if (isDeleted) {
        res.send(204)
    } else {
        res.send(404)
    }
})


import {Request, Response, Router} from 'express';

const adresses = [{id: 1, value: 'Skorini'}, {id: 2, value: 'Dom 1'}]

export const adressesRouter = Router({})

adressesRouter.get('/adresses', (req: Request, res: Response) => {
    res.send(adresses)
})
adressesRouter.get('/adresses/:id', (req: Request, res: Response) => {
    let adress = adresses.find(p => p.id === +req.params.id)
    if (adress) {
        res.send(adress)
    } else {
        res.send(404)
    }
})
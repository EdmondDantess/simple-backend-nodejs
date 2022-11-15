import express, {Request, Response} from 'express'


const app = express()
const port = 5000

app.get('/', (req: Request, res: Response) => {
    const helloMessage = 'Hello World';
    res.send(helloMessage)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
import  express  from "express"
import type {Request, Response} from 'express'
import { body } from "express-validator"
import type {RequestWithBody, RequestWithParams, RequestWithQuery, RequestWithParamsBody} from '../types/types.js'
import type { CreateProductModel } from '../models/CreateProductModel.ts'
import type { UpdateProductModel } from '../models/UpdateProductModel.ts'
import type { URIParamsProductModel } from '../models/URIParamsProductModel.ts'
import type { QueryProductsModel } from '../models/QueryProductModel.ts'
import type { ProductsViewModel } from "../models/ProductsViewModel.ts"
import { HTTP_STATUSES } from "../utils"
import { inputValidateMiddleware } from "../middleware/input-validation-middleware"
import { productService } from "../domain/products-service"

const typeTechValidation = body('typeTech').isLength({min: 3, max: 30}).withMessage({errorMessage: "Длина должна составлять от 3 до 30"})

// presentation layer
export const getProductsRoutes = ()=>{
    const routerProduct = express.Router({ mergeParams: true })
    const timeLog = (req:Request, res: Response, next: any) => {
        console.log('Time: ', Date.now())
        next()
    }

routerProduct.use(timeLog)

routerProduct.get('/', async(req: RequestWithQuery<QueryProductsModel>, res: Response<ProductsViewModel[]>) => {
    const findedProducts = await productService.getProductsWithQuery(req.query.typeTech)
    if (!findedProducts) {
        return res.status(HTTP_STATUSES.NOTFOUND_404).send()
    }
    res.status(HTTP_STATUSES.OK_200).json(findedProducts)
})

routerProduct.get('/:id', async(req: RequestWithParams<URIParamsProductModel>, res: Response<ProductsViewModel>) => {
    const findedProduct = await productService.getProductsById(+req.params.id)
    if (!findedProduct) {
        return res.status(HTTP_STATUSES.NOTFOUND_404).send()
    }
    res.status(HTTP_STATUSES.OK_200).json(findedProduct)
})

routerProduct.post('/', 
    typeTechValidation,
    inputValidateMiddleware, 
    async(req: RequestWithBody<CreateProductModel>, res: Response<ProductsViewModel>) => {
    const createdProduct = await productService.createProduct(req.body.typeTech, req.body.model)
    if(!createdProduct){
        res.status(HTTP_STATUSES.BADREQ_400).send()
    }
    res.status(HTTP_STATUSES.CREATED_201).send()

})

routerProduct.put('/:id', async(req: RequestWithParamsBody<URIParamsProductModel, UpdateProductModel> , res: Response) => { //Response<ProductsViewModel[]>
    const updatedProduct =  await productService.updateProduct(+req.params.id, req.body.typeTech, req.body.model)
    if(!updatedProduct){
        res.status(HTTP_STATUSES.BADREQ_400).send()
    }
    res.status(HTTP_STATUSES.NONCONTENT_204).send()
})

routerProduct.delete('/:id', async(req: RequestWithParams<URIParamsProductModel>, res: Response)=>{
    const deletedProduct = await productService.deleteProduct(+req.params.id)
    if(!deletedProduct){
        res.status(HTTP_STATUSES.BADREQ_400).send()
    }
    res.status(HTTP_STATUSES.NONCONTENT_204).send()
})
 return routerProduct;
}
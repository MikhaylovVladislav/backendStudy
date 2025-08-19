import { WithId } from "mongodb"
import { collectionProducts } from "../database/db"
import type { ProductType } from "../database/db"


export const productRepository = {
    async getProductsWithQuery(typeTech?: string): Promise<ProductType[]> {
        let query: any = {}

        if (typeTech) {
            query.typeTech = typeTech
        }
        const result = await collectionProducts.find(query).toArray()

        return result
    },

    async getProductsById(id: number): Promise<ProductType|undefined> {

        const result = await collectionProducts.findOne({id: id})
        
        if(result){
            return result
        } 
    },

    async createProduct( typeTech: string, model: string): Promise<ProductType> {
        const createdProduct = {
            id: +Date.now(),
            typeTech: typeTech, 
            model: model
        }
        const result = await collectionProducts.insertOne(createdProduct)
        return createdProduct
    },

    async updateProduct(id: number, typeTech: string , model: string): Promise<boolean> {
        const result = await collectionProducts.updateOne({id: id}, {$set: {typeTech: typeTech, model: model}})

        return result.matchedCount===1
    },

    async deleteProduct(id: number): Promise<boolean> {
        const result = await collectionProducts.deleteOne({id: id})

        return result.deletedCount===1
    }
}

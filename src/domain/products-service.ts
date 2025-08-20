import { collectionProducts } from "../database/db"
import type { ProductType } from "../database/db"
import { productRepository } from "../repositories/products-repositories"

//business logic layer
export const productService = {
    async getProductsWithQuery(typeTech?: string): Promise<ProductType[]> {
        const result = await productRepository.getProductsWithQuery(typeTech)
        return result
    },

    async getProductsById(id: number): Promise<ProductType|undefined> {
        const result = await productRepository.getProductsById(id)
        return result
    },

    async createProduct( typeTech: string, model: string): Promise<ProductType> {
        const createdProduct = {
            id: +Date.now(),
            typeTech: typeTech, 
            model: model
        }
        const result = await productRepository.createProduct(createdProduct)
        return result
    },

    async updateProduct(id: number, typeTech: string , model: string): Promise<boolean> {
        const result = await productRepository.updateProduct(id, typeTech, model)
        return result
    },

    async deleteProduct(id: number): Promise<boolean> {
        const result = await productRepository.deleteProduct(id)
        return result
    }
}

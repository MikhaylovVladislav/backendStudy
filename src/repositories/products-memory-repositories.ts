type ProductType = {
    id: number,
    typeTech: string,
    model: string
}
/* 
//updates: Partial<Omit<Product, 'id'>> // { typeTech?: string; model?: string; }

interface Product { 
    id: number;
    typeTech: string;
    model: string;
}
*/

 let db: {products: ProductType[]} = { products: [
    {
        id: 1, typeTech: "phone", model: "rion 9 pro" 
    },
    {
        id: 2, typeTech: "phone", model: "rion 10 lite" 
    },
    {
        id: 3, typeTech: "gpu", model: "gtx 1050ti" 
    },
    {
        id: 4, typeTech: "cpu", model: "ryzen 3 1200" 
    }
]}

export const productRepository = {
    async getProductsWithQuery(typeTech?: string): Promise<ProductType[]> {
        let products = db.products
        if(typeTech){
            products = products.filter(el => el.typeTech.includes(typeTech))
        }
        return products
    },

    async getProductsById(id: number): Promise<ProductType|undefined> {
        const findedProduct = db.products.find(el => el.id === id)
        if(findedProduct){
            return findedProduct
        } 
    },

    async createProduct( typeTech: string, model: string): Promise<ProductType> {
        const createdProduct = {
            id: +Date.now(),
            typeTech: typeTech, 
            model: model
        }
        db.products.push(createdProduct)
        return createdProduct
    },

    async updateProduct(id: number, typeTech: string , model: string): Promise<boolean> {
        const product = db.products.find(el => el.id === id)
        if (!product) return false
        
        if (typeTech) product.typeTech = typeTech
        if (model) product.model = model
        return true
    },

    async deleteProduct(id: number): Promise<boolean> {
        const initialLength = db.products.length
        db.products = db.products.filter(el => el.id !== id)
        return db.products.length < initialLength
    }
}

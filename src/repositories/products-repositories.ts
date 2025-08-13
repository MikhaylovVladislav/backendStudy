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

export const getProductsWithQuery = (typeTech?: string) => {
    let products = db.products
    if(typeTech){
        products = products.filter(el => el.typeTech.includes(typeTech))
    }
    return products
}

export const getProductsById = (id: number) => {
    const findedProduct = db.products.find(el => el.id === id)
    if(findedProduct){
        return findedProduct
    } 
}

export const createProduct = ( typeTech: string, model: string) => {
    const createdProduct = {
        id: +Date.now(),
        typeTech: typeTech, 
        model: model
    }
    db.products.push(createdProduct)
    return createdProduct
}
export const updateProduct = (id: number, typeTech: string , model: string) =>{
     db.products.find(el => {
        el.id === id
        if(el){
            if(typeTech){
             el.typeTech = typeTech
            }
            if(model){
                el.model = model
            }
            return true
        }
    return false
    }
    )   
}

export const deleteProduct = (id: number) => {
    db.products = db.products.filter(el => el.id !== id)
    return db.products
}
     

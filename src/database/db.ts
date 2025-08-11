export type ProductType = {
    id: number,
    typeTech: string,
    model: string
}

export const db: {products: ProductType[]} = { products: [
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
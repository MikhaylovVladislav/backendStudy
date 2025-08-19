import { MongoClient, ObjectId } from "mongodb";

export type ProductType = {
    id: number,
    typeTech: string,
    model: string
}

const mongoURI = process.env.MongoURI || "mongodb://localhost:27017/"

const mongoClient = new MongoClient(mongoURI)

// SHOP DataBase
const dbShop = mongoClient.db("shop")
export const collectionProducts = dbShop.collection<ProductType>("products")

export async function runDB() {
    try{
        await mongoClient.connect()
        
        // Отправляем тестовую команду ping к базе данных "products"
        // Проверяет, что соединение работает и база отвечает
        await mongoClient.db("shop").command({ping: 1})

        console.log("Connect success MDB")
    }catch(err){
        await mongoClient.close()
        console.log("Can't connect MDB")
    }

 }

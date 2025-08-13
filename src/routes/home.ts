import  express  from "express"
import type {Request, Response} from 'express'
import type {RequestWithBody, RequestWithParams, RequestWithQuery, RequestWithParamsBody} from '../types/types.js'
import { HTTP_STATUSES } from "../utils"

const newID = () => {
  return new Date()
}

export const getHomeRoutes = ()=>{
    const routerHome = express.Router({ mergeParams: true })
    const timeLog = (req:Request, res: Response, next: any) => {
        console.log('Time: ', Date.now())
        next()
    }

    routerHome.use(timeLog)

    routerHome.get('/', (req: Request, res: Response) => {
       
    res.send("hello2")
})

 return routerHome;
}
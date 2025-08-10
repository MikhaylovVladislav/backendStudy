import type { Request, Response } from "express"

export type RequestWithBody<T> = Request<{},{},T>
export type RequestWithQuery<T> = Request<{},{},{}, T>
export type RequestWithParams<T> = Request<T>
export type RequestWithParamsBody<P, B> = Request<P,{},B>
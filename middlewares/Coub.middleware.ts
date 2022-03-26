import { RequestHandler } from 'express'

export const isAuthorized: RequestHandler = (req, res, next) => {
  const isAuth = true

  if (isAuth) {
    return next()
  }

  return res.status(401).json({ message: 'Authorization error' })
}

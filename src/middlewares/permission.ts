import { verify } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { getCustomRepository } from 'typeorm';
import UserRepository from './../repositories/UserRepository';
import User from '../models/User';

interface TokenPayload {
  hash: string
  sub: string
  iat: number
  exp: number
}


async function decoder(req: Request): Promise<User> {

  const authHeader = req.headers.authorization || ""
  const userRepository = getCustomRepository(UserRepository)

  const [, token] = authHeader?.split(" ")

  try {

    if (token) {

      const payload = verify(token, process.env.SECRET_TOKEN)

      const { hash } = payload as TokenPayload

      if (hash) {
        req.userAuth = { hash }
      }

      const user = await userRepository.findOne(String(payload?.sub),
        {
          relations: ['roles'],
        })

      return user
    }

  } catch {
    return
  }

}

function is(role: String[]) {

  const roleAuthorized = async (req: Request, res: Response, next: NextFunction) => {

    const user = await decoder(req)

    const userRoles = user?.roles.map(role => role.name)

    const existsRoles = userRoles?.some(r => role.includes(r))

    if (existsRoles) {
      return next()
    }

    return res.status(401).json({ message: 'Not authorized!' })

  }

  return roleAuthorized
}

export default is
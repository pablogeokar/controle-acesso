import { compare } from 'bcryptjs';
import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm';
import { sign } from 'jsonwebtoken'
import UserRepository from '../repositories/UserRepository';


class SessionController {
  async create(req: Request, res: Response) {
    const { username, password } = req.body

    const userRepository = getCustomRepository(UserRepository)

    const user = await userRepository.findOne({ username })

    if (!user) {
      return res.status(400).json({ message: 'Incorrect password or username' })
    }

    const matchPassword = await compare(password, user.password)

    if (!matchPassword) {
      return res.status(400).json({ message: 'Incorrect password or username' })
    }

    const token = sign({}, 'c14bbd7e5f78d73f25ff43d2a11e7ab6', {
      subject: user.id,
      expiresIn: '1d'
    })

    delete user.password

    return res.json({ user, token })
  }
}

export default new SessionController()
import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { hash } from 'bcryptjs'
import { UserRepository } from './../repositories/UserRepository';

class UserController {

  async create(req: Request, res: Response) {
    const userRepository = getCustomRepository(UserRepository)

    const { name, password, username } = req.body

    const existUser = await userRepository.findOne({ username })

    if (existUser) {
      return res.status(400).json({ message: 'User already exists' })
    }

    const passwordHash = password ? await hash(password, 8) : await hash('usuário não informou a senha', 8)

    const user = userRepository.create({
      name,
      password: passwordHash,
      username
    })

    try {
      await userRepository.save(user)
    } catch (error) {
      return res.status(400).json({ message: error.message })
    }

    delete user.password


    return res.status(201).json(user)

  }
}

export default new UserController
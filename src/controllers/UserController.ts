import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { hash } from 'bcryptjs'
import UserRepository from './../repositories/UserRepository';
import RoleRepository from './../repositories/RoleRepository';

class UserController {

  async create(req: Request, res: Response) {
    const userRepository = getCustomRepository(UserRepository)
    const roleRepository = getCustomRepository(RoleRepository)

    const { name, username, password, roles } = req.body

    const existUser = await userRepository.findOne({ username })

    if (existUser) {
      return res.status(400).json({ error: 'User already exists' })
    }

    const passwordHash = password ? await hash(password, 8) : await hash('usuário não informou a senha', 8)

    const existsRoles = await roleRepository.findByIds(roles)

    const user = userRepository.create({
      name,
      username,
      password: passwordHash,
      roles: existsRoles
    })

    try {
      await userRepository.save(user)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }

    delete user.password


    return res.status(201).json(user)

  }
}

export default new UserController()
import { compare } from 'bcryptjs';
import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm';
import { sign } from 'jsonwebtoken'
import UserRepository from '../repositories/UserRepository';
import crypto from 'crypto'


class SessionController {
  async create(req: Request, res: Response) {
    const { username, password } = req.body

    const userRepository = getCustomRepository(UserRepository)

    const user = await userRepository.findOne({ username }, { relations: ['roles', 'roles.permissions'] })

    if (!user) {
      return res.json({ error: 'Usuário ou senha inválidos' })
    }

    const matchPassword = await compare(password, user.password)

    if (!matchPassword) {
      return res.json({ error: 'Usuário ou senha inválidos' })
    }

    // Cria um hash combinando a versão do navegador e IP remoto do usuário    
    const hash = crypto.createHash('md5').update(req.headers['user-agent'] + req.ip + 'zionix').digest("hex")

    const token = sign({ hash }, process.env.SECRET_TOKEN, {
      subject: user.id,
      expiresIn: '1d'
    })

    delete user.password
    delete user.created_at    

    return res.json({ user, token })
  }
}

export default new SessionController()
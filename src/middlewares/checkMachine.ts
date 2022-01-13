import { Request, Response, NextFunction } from 'express'
import crypto from 'crypto'

export default function checkMachine(req: Request, res: Response, next: NextFunction) {
  // Cria um hash combinando a versão do navegador e IP remoto do usuário    
  const hash = crypto.createHash('md5').update(req.headers['user-agent'] + req.ip + 'zionix').digest("hex")

  try {
    if (req.userAuth.hash !== hash) {
      return res.status(400).json({ error: 'Acesso Negado' })
    }
  } catch {
    return res.status(400).json({ error: 'Acesso Negado' })
  }

  next()
}
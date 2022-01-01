import { Request, Response } from 'express'
import PermissionRepository from './../repositories/PermissionRepository';
import { getCustomRepository } from 'typeorm';

class PermissionController {
  async create(req: Request, res: Response) {

    const permissionRepository = getCustomRepository(PermissionRepository)

    const { name, description } = req.body

    const existsPermission = await permissionRepository.findOne({ name })

    if (existsPermission) {
      return res.status(400).json({ message: 'Permission already exists!' })
    }

    const permission = permissionRepository.create({
      name,
      description
    })

    await permissionRepository.save(permission)

    return res.json(permission)
  }
}

export default new PermissionController
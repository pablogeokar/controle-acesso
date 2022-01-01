import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm';
import PermissionRepository from '../repositories/PermissionRepository';
import RoleRepository from './../repositories/RoleRepository';

class RoleController {
  async create(req: Request, res: Response) {

    const roleRepository = getCustomRepository(RoleRepository)
    const permissionRepository = getCustomRepository(PermissionRepository)

    const { name, description, permissions } = req.body

    const existsRole = await roleRepository.findOne({ name })

    if (existsRole) {
      return res.status(400).json({ message: 'Role already exists!' })
    }

    const existsPermissions = await permissionRepository.findByIds(permissions)

    const role = roleRepository.create({
      name,
      description,
      permission: existsPermissions
    })

    await roleRepository.save(role)

    return res.json(role)
  }
}

export default new RoleController
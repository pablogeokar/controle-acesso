import { EntityRepository, Repository } from 'typeorm';
import Permission from '../models/Permision';

@EntityRepository(Permission)
class PermissionRepository extends Repository<Permission> { }

export default PermissionRepository

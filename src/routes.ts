import { Router } from 'express'
import UserController from './controllers/UserController'
import SessionController from './controllers/SessionController'
import PermissionController from './controllers/PermissionController'
import RoleController from './controllers/RoleController'

const router = Router()

router.post('/users', UserController.create)
router.post('/session', SessionController.create)
router.post('/permission', PermissionController.create)
router.post('/role', RoleController.create)

export default router
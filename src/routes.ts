import { Router } from 'express'
import UserController from './controllers/UserController'
import SessionController from './controllers/SessionController'
import PermissionController from './controllers/PermissionController'
import RoleController from './controllers/RoleController'
import is from './middlewares/permission'
import checkMachine from './middlewares/checkMachine'



const router = Router()

router.post('/users', UserController.create)
router.post('/session', SessionController.create)
router.post('/permission', PermissionController.create)
router.post('/role', RoleController.create)


router.get('/teste', is(['ROLE_ADMIN', 'ROLE_USER']), checkMachine, (req: any, res: any) => {
  res.send('acesso liberado')
})

export default router
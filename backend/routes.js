import {Router} from 'express'
import controller from './potion.controller.js'

const router = Router()

router.get('/potions', controller.findAllPotions)
router.post('/potions', controller.createPotion)
router.delete('/potions/:id', controller.deletePotion)

export default router
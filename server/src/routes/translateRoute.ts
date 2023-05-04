/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import { translationFromChatGPT } from '../controllers/translate'

const router: Router = Router()

router.post('/api/translate', translationFromChatGPT)

export default router

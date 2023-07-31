import express from 'express'
const router = express.Router()
import { downloadCSV } from '../controllers/csvController'

router.get('/v1/export-csv', downloadCSV)

export default router

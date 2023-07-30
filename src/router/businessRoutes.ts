import express from 'express';
const router = express.Router();
import { getAllBusiness, createBusiness } from '../controllers/businessController';
import handleError from '../middlewares/errorMiddleware';

// Routes for handling user data
router.get('/data/business', getAllBusiness);
router.post('/add/business', (req, res) => {createBusiness(req, res);});

router.use(handleError);

export default router;

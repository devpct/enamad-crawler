import express from 'express';
const router = express.Router();
import { getCountsByCity, getGroupedByStars } from '../controllers/businessController';
import handleError from '../middlewares/errorMiddleware';

// Routes for handling user data
router.get('/data/count-by-city', getCountsByCity);
router.get('/data/grouped-by-stars', getGroupedByStars);
router.use(handleError);

export default router;

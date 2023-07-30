import { Request, Response } from 'express';
import { IBusiness } from '../interfaces/IBusiness';
import Business from '../models/businessModel';

// Get all users
const getAllBusiness = (req: Request, res: Response) => {
  Business.find({})
    .then((business: IBusiness[]) => {
      res.json(business);
    })
    .catch((error: Error) => {
      handleErrorResponse(res, error);
    });
};

// Create a new user
const createBusiness = (req: Request, res: Response) => {
  Business.create(req.body)
    .then((business: IBusiness) => {
      res.json(business);
    })
    .catch((error: Error) => {
      handleErrorResponse(res, error);
    });
};

// Function to handle error responses
const handleErrorResponse = (res: Response, error: Error) => {
  res.status(500).json({ message: error.message });
};

export { getAllBusiness, createBusiness };

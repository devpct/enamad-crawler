import { Request, Response } from 'express';
import { IBusiness } from '../interfaces/IBusiness';
import Business from '../models/businessModel';

// Get counts of websites per city
const getCountsByCity = (req: Request, res: Response) => {
  Business.aggregate([
    { $group: { _id: "$city", count: { $sum: 1 } } },
    { $project: { city: "$_id", count: 1, _id: 0 } },
    { $sort: { count: -1 } },
  ])
    .then((cityCounts: IBusiness[]) => {
      res.json(cityCounts);
    })
    .catch((error: Error) => {
      handleErrorResponse(res, error);
    });
};


// Get websites grouped by their star ranking
const getGroupedByStars = (req: Request, res: Response) => {
  Business.aggregate([
    { $group: { _id: '$stars', websites: { $push: { domain: '$domainAddress', title: '$businessTitle' } } } },
    { $sort: { _id: -1 } },
    { $project: { _id: 0, starts: '$_id', websites: 1 } }
  ])
    .then((groupedWebsites) => {
      res.json(groupedWebsites);
    })
    .catch((error: Error) => {
      handleErrorResponse(res, error);
    });
};

// Function to handle error responses
const handleErrorResponse = (res: Response, error: Error) => {
  res.status(500).json({ message: error.message });
};

export { getCountsByCity, getGroupedByStars };

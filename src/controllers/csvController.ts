import { Request, Response } from 'express'
import { unparse } from 'papaparse'
import { IBusiness } from '../interfaces/IBusiness'
import Business from '../models/businessModel'

const downloadCSV = (req: Request, res: Response) => {
  const fields = req.query.fields as string
  if (!fields) {
    // If the 'fields' parameter is not provided, return all data from the table
    Business.find({})
      .lean()
      .then((businesses: Array<IBusiness & { _id: any }>) => {
        const csvString = unparse(businesses, {
          header: true,
        })
        res.setHeader('Content-Type', 'text/csv')
        res.setHeader('Content-Disposition', 'attachment filename=exported_data.csv')
        res.send(csvString)
      })
      .catch((error) => {
        console.error(error)
        res.status(500).json({ message: 'Internal Server Error' })
      })
  } else {
    // If the 'fields' parameter is provided, return only the selected fields
    const selectedFields = fields.split(',')
    Business.find({})
      .select(selectedFields.join(' '))
      .lean()
      .then((businesses: Array<IBusiness & { _id: any }>) => {
        const csvString = unparse(businesses, {
          header: true,
        })
        res.setHeader('Content-Type', 'text/csv')
        res.setHeader('Content-Disposition', 'attachment filename=exported_data.csv')
        res.send(csvString)
      })
      .catch((error) => {
        console.error(error)
        res.status(500).json({ message: 'Internal Server Error' })
      })
  }
}

export { downloadCSV }

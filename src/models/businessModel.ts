import mongoose, { Document, Model } from 'mongoose';
import { IBusiness } from '../interfaces/IBusiness';
const businessSchema = new mongoose.Schema<IBusiness>(
  {
    domainAddress: {
      type: String,
      required: true,
    },
    businessTitle: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    stars: {
      type: Number,
      required: true,
    },
    grantDate: {
      type: String,
      required: true,
    },
    expiryDate: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Business: Model<IBusiness> = mongoose.model<IBusiness>('businesses', businessSchema);

export default Business;
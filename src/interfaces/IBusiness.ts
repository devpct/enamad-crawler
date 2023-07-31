import { Document, Schema, model, Types } from 'mongoose';

export interface IBusiness extends Document {
  domainAddress: string;
  businessTitle: string;
  city: string;
  stars: number;
  grantDate: string;
  expiryDate: string;
  _id: Types.ObjectId;
}

const businessSchema = new Schema<IBusiness>({
  domainAddress: { type: String, required: true },
  businessTitle: { type: String, required: true },
  city: { type: String, required: true },
  stars: { type: Number, required: true },
  grantDate: { type: String, required: true },
  expiryDate: { type: String, required: true },
});

const Business = model<IBusiness>('Business', businessSchema);

export default Business;
